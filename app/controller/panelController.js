const panelModel = require('../models/panelModel')

const panelController = {
    
    listEntregas: async (req, res) => {
        const { id } = req.session.autenticado
        try {
            const entregas = await panelModel.findEntregas(id)
            const status = await panelModel.findStatus(id)

            entregas.forEach((entrega, i) => {
                if (status[i] == null) {
                    entrega.status_entrega = null
                } else {
                    entrega.status_entrega = status[i].status_entrega
                }
            })

            // console.log(entregas)

            res.render('pages/entregador/panel', { autenticado: req.session.autenticado, entregas })
        } catch (error) {
            console.log(error)
            res.json({ error })
        }
    },

    updateStatus: async (req, res) => {
        const { id } = req.session.autenticado
        const { id_pedido, status } = req.params
        try {
            console.log(id_pedido, status)
            await panelModel.insert({ id_pedido, status_entrega: status })

            res.redirect(req.get("Referrer") || "/")
        } catch (error) {
            console.log(error)
            res.json({ error })
        }
    },

}

module.exports = panelController