const pedidosModel = require('../models/pedidosModel')
const pagamentoModel = require('../models/pagamentoModel')

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

        if (status == 'approved') {
            await pagamentoModel.updateByUUID({ estado_pagamento: 'aprovado' }, external_reference)
            return res.render('pages/cliente/feedback-pagamento', { autenticado: req.session.autenticado, approved: true })
        }
        
        res.render('pages/cliente/feedback-pagamento', { autenticado: req.session.autenticado, approved: false })
    },
}

module.exports = pagamentoController