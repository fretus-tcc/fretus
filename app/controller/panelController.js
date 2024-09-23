const panelModel = require('../models/panelModel')

const panelController = {
    
    listEntregas: async (req, res) => {
        const { id } = req.session.autenticado
        try {
            const entregas = await panelModel.findEntregas(id)
            // console.log(entregas)

            res.render('pages/entregador/panel', { autenticado: req.session.autenticado, entregas })
        } catch (error) {
            console.log(error)
            res.json({ error })
        }
    },

}

module.exports = panelController