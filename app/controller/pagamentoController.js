const pedidosModel = require('../models/pedidosModel')
const pagamentoModel = require('../models/pagamentoModel')

const pagamentoController = {

    showPagamento: async (req, res) => {
        const { id } = req.params
        try {
            const [pedido] = await pedidosModel.findShipperAccept(id)

            // Verifica se pedido existe
            if (pedido == null) {
                return res.render('pages/cliente/pagamento', { autenticado: req.session.autenticado, pedido: null, erro_pedido: 'Pedido não encontrado', url: null })
            }

            // Verifica se cliente solicitou pedido
            if (pedido.id_cliente != req.session.autenticado.id) {
                return res.render('pages/restrito', { autenticado: req.session.autenticado })
            }

            // Verfica se pedido nao possui entregador escolhido
            if (pedido.id_entregador == null) {
                return res.render('pages/cliente/pagamento', { autenticado: req.session.autenticado, pedido: null, erro_pedido: 'Pedido não possui entregador escolhido', url: null})
            }

            const { init_point } = await pagamentoModel.getPreferenceMP(pedido.id_preferencia_mp)
            // console.log(init_point)

            res.render('pages/cliente/pagamento', { autenticado: req.session.autenticado, pedido, erro_pedido: null, url: init_point })
        } catch (error) {
            console.log(error);
            return res.json({ error })
        }
    },

    notifyPagamento: async (req, res) => {
        const { id, topic } = req.params
        console.log(id, topic)
        
        const pagamento = await pagamentoModel.getPagamentoMP(id)
        console.log(pagamento)

        res.status(200)
    },

    showFeedback: async (req, res) => {
        const { status } = req.query

        if (status == 'approved') {
            return res.render('pages/cliente/feedback-pagamento', { autenticado: req.session.autenticado, approved: true })
        }
        
        res.render('pages/cliente/feedback-pagamento', { autenticado: req.session.autenticado, approved: false })
    },
}

module.exports = pagamentoController