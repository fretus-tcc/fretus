const pedidosModel = require('../models/pedidosModel')
const admCadastroModel = require('../models/admCadastroModel')
const { notifyMessages, calcularPrecoEntrega } = require('../util/Funcao')
const fetch = require('node-fetch')
const { body, validationResult } = require('express-validator')

const pedidosController = {
    validationPedido: [
        
        body('partida_coords')
            .notEmpty()
            .withMessage('Endereço Inválido')
            .isLatLong()
            .withMessage('Endereço Inválido'),

        body('destino_coords')
            .notEmpty()
            .withMessage('Endereço Inválido')
            .isLatLong()
            .withMessage('Endereço Inválido'),

        body('partida')
            .notEmpty()
            .withMessage('Endereço não preenchido'),

        body('destino')
            .notEmpty()
            .withMessage('Endereço não preenchido'),

        body('data_agendamento')
            .custom((value, { req }) => {
                if (req.body?.agendamento) {
                    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
                        throw new Error('Data inválida')
                    }
                    
                    const todayDate = new Date();
                    const todayString = todayDate.toISOString().split('T')[0];
                    if (value <= todayString) {
                        throw new Error('Data deve ser no futuro')                   
                    }
                }
                return true
            }),

        body('hora_agendamento')
            .custom((value, { req }) => {
                if (req.body?.agendamento) {
                    if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(value)) {
                        throw new Error('Horário inválido')
                    }
                }
                return true
            }),

        body('carga')
            .isIn(['P', 'M', 'G'])
            .withMessage('Carga inválida'),
        
        body('veiculo')
            .isIn(['moto', 'carro', 'van', 'caminhao'])
            .withMessage('Veículo inválido')
            .custom((value, { req }) => {
                if (value == 'moto' && req.body?.carga != 'P') {
                    throw new Error('Veículo não suporta esse tipo de carga')
                }
                
                if (value == 'carro' && req.body?.carga == 'G') {
                    throw new Error('Veículo não suporta esse tipo de carga')
                }

                return true
            })
    ],
    
    /* Solicitar Entrega */
    createPedido: async (req, res) => {
        // console.table(req.body);
        const erros = validationResult(req)
        if (!erros.isEmpty()) {
            console.log(erros.mapped());
            return res.render('pages/cliente/solicitar-entrega', { autenticado: req.session.autenticado, erros: erros.mapped(), msgs: [], dados: req.body, preco: null, loading: false })
        }

        try {
            const [latitude_partida, longitude_partida] = req.body.partida_coords.split(',').map(Number)
            const [latitude_destino, longitude_destino] = req.body.destino_coords.split(',').map(Number)
            
            // formatando preco, com base na distancia
            const resObj = await fetch(`https://mapbox-hidden-api.vercel.app/routes?startLng=${longitude_partida}&startLat=${latitude_partida}&endLng=${longitude_destino}&endLat=${latitude_destino}`)
            const dataRes = await resObj.json()
            const distancia = dataRes.routes[0].distance
            const preco_pedido = calcularPrecoEntrega(req.body.veiculo, distancia / 1000)

            // formatando data e hora agendamento
            const data_agendamento = `${req.body.data_agendamento} ${req.body.hora_agendamento}`

            // formatando campos para salvar no banco
            const data = {
                id_cliente: req.session.autenticado.id,
                latitude_partida,
                longitude_partida,
                latitude_destino,
                longitude_destino,
                preco_pedido,
                partida_pedido: req.body.partida,
                destino_pedido: req.body.destino,
                agendamento: req.body?.agendamento ? '1' : '0',
                data_agendamento: req.body.data_agendamento == '' ? null : data_agendamento,
                /* horario_agendamento: req.body.hora_agendamento == '' ? null : req.body.hora_agendamento, */
                cod_carga: req.body.carga,
                veiculo_pedido: req.body.veiculo,
            }
            await pedidosModel.insert(data)

            res.render('pages/cliente/solicitar-entrega', { autenticado: req.session.autenticado, erros: null, msgs: [], dados: req.body, preco: preco_pedido, loading: true })
        } catch (error) {
            console.log(error)
            res.json({ error })
        }
    },

    /* Escolher Entregador - GET */
    listShipperAccept: async (req, res) => {
        try {
            const { id } = req.params
            
            const [pedido] = await pedidosModel.findById(id)

            // verificando se o pedido existe
            if (pedido == null) {
                return res.render('pages/cliente/escolher-entregador', { autenticado: req.session.autenticado, entregadores: [], id_pedido: id, erro_pedido: true })
            }

            // verificando se o usuario solicitou o pedido, e logo tem permissão de acessar
            if (pedido.id_cliente != req.session.autenticado.id) {
                return res.render('pages/restrito', { autenticado: req.session.autenticado })
            }

            const entregadores = await pedidosModel.findByShipperAccept(id)

            res.render('pages/cliente/escolher-entregador', { autenticado: req.session.autenticado, entregadores, id_pedido: id, erro_pedido: false })
        } catch (error) {
            console.log(error)
            return res.json({ error })
        }
    },

    /* Escolher Entregador - POST */
    chooseShipper: async (req, res) => {
        try {
            // console.log(req.params);
            const { id_entregador, id_pedido } = req.params

            await pedidosModel.insertShipperAccepted(id_entregador, id_pedido)

            res.redirect('back')
        } catch (error) {
            console.log(error)
            return res.json({ error })
        }
    },

    /* Entregas Solicitadas - GET */
    listPedidos: async (req, res) => {
        try {
            const id = req.session.autenticado.id
            const msgs = notifyMessages(req, res)

            const [entregador] = await admCadastroModel.findShipper(id)

            // const pedidos = await pedidosModel.findPendingByShipper(id, entregador.tipo_veiculo)

            // paginação
            let pagina = req.query.pagina == undefined ? 1 : Number(req.query.pagina);
            let pedidos = null
            let regPagina = 4
            let inicio = parseInt(pagina - 1) * regPagina
            let totReg = await pedidosModel.totalReg(id, entregador.tipo_veiculo);
            let totPaginas = Math.ceil(totReg[0].total / regPagina);
            
            // validacao parametro pagina
            if (pagina <= 0 || isNaN(pagina)) {
                return res.redirect('/entregador/entregas-solicitadas')
            } else if (pagina > totPaginas && totPaginas > 0) {
                return res.redirect(`/entregador/entregas-solicitadas?pagina=${totPaginas}`)
            }

            pedidos = await pedidosModel.findPaginate(id, entregador.tipo_veiculo, inicio, regPagina);
            let paginador = totReg[0].total <= regPagina 
                ? null 
                : { "pagina_atual": pagina, "total_reg": totReg[0].total, "total_paginas": totPaginas };

            res.render('pages/entregador/entregas-solicitadas', { autenticado: req.session.autenticado, msgs, pedidos, paginador })
        } catch (error) {
            console.log(error)
            return res.json({ error })
        }
    },

    /* Entregas Solicitadas - POST */
    insertShipperReply: async (req, res) => {
        const { id } = req.params
        const { resposta } = req.body
        
        try {
            if (resposta.toUpperCase() != 'ACEITO' && resposta.toUpperCase() != 'NEGADO') {
                req.flash('error', 'Tente Novamente ; Erro ao inserir resposta do pedido')
                return res.redirect('/entregador/entregas-solicitadas')
            }
            
            const data = {
                id_pedido: id,
                id_entregador: req.session.autenticado.id,
                status_resposta: resposta
            }

            await pedidosModel.insertShipper(data)
            req.flash('success', `Pedido ${resposta.toLowerCase()} ; Pedido ${resposta.toLowerCase()} com sucesso`)
            res.redirect('/entregador/entregas-solicitadas')
        } catch (error) {
            console.log(error)
            res.json({ error })
        }
    },

    /* Histórico - Cliente */
    listPedidosByUser: async (req, res) => {
        try {
            const id = req.session.autenticado.id
            const pedidos = await pedidosModel.findByUser(id, 0, 4)

            res.render('pages/cliente/historico', { autenticado: req.session.autenticado, pedidos })
        } catch (error) {
            console.log(error)
            return res.json({ error })
        }
    },

    /* Histórico Completo - Cliente */
    listPedidosByUserPaginate: async (req, res) => {
        try {
            const id = req.session.autenticado.id

            // paginação
            let pagina = req.query.pagina == undefined ? 1 : Number(req.query.pagina);
            let pedidos = null
            let regPagina = 4
            let inicio = parseInt(pagina - 1) * regPagina
            let totReg = await pedidosModel.totalRegByUser(id); //
            let totPaginas = Math.ceil(totReg[0].total / regPagina);
            
            // validacao parametro pagina
            if (pagina <= 0 || isNaN(pagina)) {
                return res.redirect('/cliente/historico-completo') //
            } else if (pagina > totPaginas && totPaginas > 0) {
                return res.redirect(`/cliente/historico-completo?pagina=${totPaginas}`) //
            }

            pedidos = await pedidosModel.findByUser(id, inicio, regPagina); //
            let paginador = totReg[0].total <= regPagina 
                ? null 
                : { "pagina_atual": pagina, "total_reg": totReg[0].total, "total_paginas": totPaginas };

            res.render('pages/cliente-entregador/historico-completo', { autenticado: req.session.autenticado, isClient: true, pedidos, paginador })
        } catch (error) {
            console.log(error)
            return res.json({ error })
        }
    },

    /* updateQuote: async (req, res) => {
        const { id } = req.params
        const data = quotesController.formatData(req, res, 'update', { ...req.body, id_duvida: id })
        if (data) {
            try {
                await quotesModel.update(data, id)
                req.flash('info', 'Dúvida atualizada')
                res.redirect(`/ajuda/${data.slug_duvida}`)
            } catch (error) {
                return res.json({ error })
            }
        }
    },

    deleteQuote: async (req, res) => {
        const { id } = req.params
        try {
            await quotesModel.delete(id)
            req.flash('error', 'Dúvida deletada')
            res.redirect('/admin/ajuda')
        } catch (error) {
            res.json({ error })
        }
    }, */
}

module.exports = pedidosController