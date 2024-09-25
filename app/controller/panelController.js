const panelModel = require('../models/panelModel')
const { notifyMessages } = require('../util/Funcao')

const panelController = {
    
    listEntregas: async (req, res) => {
        const { id } = req.session.autenticado
        const { id_pedido } = req.query

        try {
            const entregas = await panelModel.findEntregas(id)
            const status = await panelModel.findStatus(id)

            entregas.forEach((entrega, i) => {  
                entrega.status_entrega = status[i].status_entrega
            })

            const msgs = notifyMessages(req, res)

            // console.log(entregas)

            res.render('pages/entregador/panel', { autenticado: req.session.autenticado, entregas, id_pedido, msgs })
        } catch (error) {
            console.log(error)
            res.json({ error })
        }
    },

    updateStatus: async (req, res) => {
        const { id_pedido, status } = req.params
        
        try {
            const [status] = await panelModel.findStatusById(id_pedido)
            const status_entrega = status.status_entrega + 1

            // console.log(status_entrega)
            if (status_entrega <= 4) {
                await panelModel.insert({ id_pedido, status_entrega })
            }

            req.flash('success', 'Etapa finalizada ; Etapa finalizada com sucesso')

            res.redirect(`/entregador/panel?id_pedido=${id_pedido}`)
        } catch (error) {
            console.log(error)
            res.json({ error })
        }
    },

}

module.exports = panelController