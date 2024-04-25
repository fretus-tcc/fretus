const admCadastroModel = require('../models/admCadastroModel')

const admCadastroController = {    
    /* listQuotesTitle: async (req, res) => {
        try {
            const result = await quotesModel.findTitle()
            res.render('pages/ajuda', { result })
        } catch (error) {
            res.json({ error })
        }
    }, */

    listUsers: async (req, res, type) => {
        try {
            const result = await admCadastroModel.findByType(type)
            res.render('pages/adm/clientesAdm', { result })
        } catch (error) {
            res.json({ error })
        }
    }


}

module.exports = admCadastroController