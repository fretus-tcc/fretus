const pedidosModel = require('../models/pedidosModel')

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
                return res.render('pages/cliente/pagamento', { autenticado: req.session.autenticado, pedido: null, erro_pedido: 'Pedido não possui entregador escolhido'})
            }

            res.render('pages/cliente/pagamento', { autenticado: req.session.autenticado, pedido, erro_pedido: null })
        } catch (error) {
            console.log(error);
            return res.json({ error })
        }
    },
}

module.exports = pagamentoController