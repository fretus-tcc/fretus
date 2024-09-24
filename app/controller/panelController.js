const panelModel = require('../models/panelModel')

const panelController = {
    
    listEntregas: async (req, res) => {
        const { id } = req.session.autenticado
        try {
            const entregas = await panelModel.findEntregas(id)
            const status = await panelModel.findStatus(id)
            
            // console.log('entregas', entregas)
            // console.log('status', status)

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

}

module.exports = panelController