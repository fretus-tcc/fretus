const admCadastroModel = require('../models/admCadastroModel')

const admCadastroController = {    

    listUsers: async (req, res, type) => {
        try {
            const result = await admCadastroModel.findByType(type)
            res.render('pages/adm/CadastroAdmGeral/clientesAdm', { result })
        } catch (error) {
            res.json({ error })
        }
    }, 
   /*  deleteQuote: async (req, res) => {
        const { id } = req.params
        try {
            await quotesModel.findByTypeDelete(id)
            res.redirect('pages/adm/CadastroAdmGeral/clientesAdm')
        } catch (error) {
            res.json({ error })
        }
    }, */



}

module.exports = admCadastroController