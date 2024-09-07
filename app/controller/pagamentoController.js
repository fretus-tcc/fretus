const pedidosModel = require('../models/pedidosModel')
const pagamentoModel = require('../models/pagamentoModel')
const chatModel = require('../models/chatModel')

const pagamentoController = {

    showPagamento: async (req, res) => {
        const { id } = req.params
        try {
            const [pedido] = await pedidosModel.findShipperAccept(id)

            // Verifica se pedido existe
            if (pedido == null) {
                return res.render('pages/cliente/pagamento', { autenticado: req.session.autenticado, pedido: null, erro_pedido: 'Pedido não encontrado' })
            }

            // Verifica se cliente solicitou pedido
            if (pedido.id_cliente != req.session.autenticado.id) {
                return res.render('pages/restrito', { autenticado: req.session.autenticado })
            }

            // Verfica se pedido nao possui entregador escolhido
            if (pedido.id_entregador == null) {
                return res.render('pages/cliente/pagamento', { autenticado: req.session.autenticado, pedido: null, erro_pedido: 'Pedido não possui entregador escolhido' })
            }

            // Verifica se pedido ja passou da data de agendamento
            const date = new Date()
            if (pedido.data_agendamento != null && pedido.data_agendamento < date) {
                return res.render('pages/cliente/pagamento', { autenticado: req.session.autenticado, pedido: null, erro_pedido: 'Pedido passou do prazo de pagamento' })
            }

            // Verifica se pedido ja foi pago
            if (pedido.estado_pagamento == 'aprovado') {
                return res.redirect(`/cliente/feedback-pagamento?status=approved&external_reference=${pedido.id_preferencia_mp}`)
            }

            res.render('pages/cliente/pagamento', { autenticado: req.session.autenticado, pedido, erro_pedido: null })
        } catch (error) {
            console.log(error);
            return res.json({ error })
        }
    },

    createPagamento: async (req, res) => {
        const { id } = req.params
        
        const [pedido] = await pedidosModel.findShipperAccept(id)

        const response = await pagamentoModel.createPreferenceMP(id, pedido.id_preferencia_mp)
        // console.log(response)
        
        res.redirect(response.init_point)
    },

    showFeedback: async (req, res) => {
        const { status, external_reference } = req.query
        const [pedido] = await pagamentoModel.findByUUID(external_reference)

        // Verificando se pedido foi encontrado
        if (pedido == null) {
            return res.render('pages/cliente/feedback-pagamento', { autenticado: req.session.autenticado, error: 'Pedido não encontrado', approved: null, pedido: null })
        }

        if (status == 'approved') {
            await pagamentoModel.updateByUUID({ estado_pagamento: 'aprovado' }, external_reference)
            await chatModel.insertConversa({ id_cliente: pedido.id_cliente, id_entregador: pedido.id_entregador })
            return res.render('pages/cliente/feedback-pagamento', { autenticado: req.session.autenticado, error: null, approved: true, pedido })
        }
        
        res.render('pages/cliente/feedback-pagamento', { autenticado: req.session.autenticado, error: null, approved: false, pedido })
    },
}

module.exports = pagamentoController