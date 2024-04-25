const admCadastroModel = require('../models/admCadastroModel')

const admCadastroController = {    

    listUsers: async (req, res, type) => {
        try {
            const result = await admCadastroModel.findByType(type)
            res.render('pages/adm/CadastroAdmGeral/clientesAdm', { result })
        } catch (error) {
            res.json({ error })
        }
    }



}

module.exports = admCadastroController