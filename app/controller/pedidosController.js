const pedidosModel = require('../models/pedidosModel')
const { notifyMessages, calcularPrecoEntrega } = require('../util/Funcao')
const fetch = require('node-fetch')
const { body, validationResult } = require('express-validator')

const pedidosController = {
    validation: [
        body('titulo')
            .notEmpty().withMessage('Campo não preenchido')
            .isLength({ max: 125 }).withMessage('Campo deve ter no máximo 125 caracteres')
            .custom(async (value, { req }) => {
                const existingTitle = await quotesModel.repeatedTitle(value, req.params.id)
                if (existingTitle) {
                    throw new Error('Título já utilizado!')
                }
            }),
        body('conteudo').notEmpty().withMessage('Campo não preenchido')
    ],
    
    createPedido: async (req, res) => {
        try {
            // console.log(req.body);
            // formatando locais de partida e destino
            const resObjPartida = await fetch(`https://mapbox-hidden-api.vercel.app/geocoding/${req.body.partida}`)
            const dataResPartida = await resObjPartida.json()
            const [longitude_partida, latitude_partida] = dataResPartida.features[0].center
            
            const resObjDestino = await fetch(`https://mapbox-hidden-api.vercel.app/geocoding/${req.body.destino}`)
            const dataResDestino = await resObjDestino.json()
            const [longitude_destino, latitude_destino] = dataResDestino.features[0].center
            
            // formatando preco
            console.log('url', `https://mapbox-hidden-api.vercel.app/routes?startLng=${longitude_partida}&startLat=${latitude_partida}&endLng=${longitude_destino}&endLat=${latitude_destino}`)
            const resObjDistancia = await fetch(`https://mapbox-hidden-api.vercel.app/routes?startLng=${longitude_partida}&startLat=${latitude_partida}&endLng=${longitude_destino}&endLat=${latitude_destino}`)
            const dataResDistancia = await resObjDistancia.json()
            const distancia = dataResDistancia.routes[0].distance
            const preco_pedido = calcularPrecoEntrega(req.body.veiculo, distancia / 1000)

            // formatando campos para salvar no banco
            const data = {
                id_cliente: req.session.autenticado.id,
                latitude_partida,
                longitude_partida,
                latitude_destino,
                longitude_destino,
                preco_pedido,
                agendamento: req.body?.agendamento ? '1' : '0',
                data_agendamento: req.body.data_agendamento == '' ? null : req.body.data_agendamento,
                horario_agendamento: req.body.hora_agendamento == '' ? null : req.body.hora_agendamento,
                cod_carga: req.body.carga,
                veiculo_pedido: req.body.veiculo,
            }
            // console.log(data);
            await pedidosModel.insert(data)
            res.render('pages/cliente/solicitar-entrega', { autenticado: req.session.autenticado, msgs: [], loading: true })
        } catch (error) {
            console.log(error)
            res.json({ error })
        }
    },

    /* showQuote: async (req, res) => {
        const { slug } = req.params
        try {
            const results = await quotesModel.findBySlug(slug)
            if (!results.length) {
                return res.redirect('/ajuda')
            }

            // formatando mensagens notificacao
            const msgs = notifyMessages(req, res)

            res.render('pages/duvida', { autenticado: req.session.autenticado, results: results[0], content: sanitizeHTML(marked.parse(results[0].conteudo_duvida)), msgs })
        } catch (error) {
            return res.json({ error })
        }
    },

    updateQuote: async (req, res) => {
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