const pedidosModel = require('../models/pedidosModel')
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

    listPedidos: async (req, res) => {
        try {
            const msgs = notifyMessages(req, res)

            const pedidos = await pedidosModel.findPendingByShipper(req.session.autenticado.id, 'moto')

            res.render('pages/entregador/entregas-solicitadas', { autenticado: req.session.autenticado, msgs, pedidos })
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