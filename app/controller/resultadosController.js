const avaliacoesModel = require('../models/avaliacoesModel')

const resultadosController = {
    
    listResults: async (req, res) => {
        const { id } = req.session.autenticado
        try {
            const avaliacoes = await avaliacoesModel.findAllByEntregador(id)

            res.render('pages/entregador/resultados', { autenticado: req.session.autenticado, avaliacoes })
        } catch (error) {
            res.json({ error })
        }
    },

}

module.exports = resultadosController