const admCadastroModel = require('../models/admCadastroModel')

const admCadastroController = {    
    //Pegar dados da tabela 
    listUsers: async (req, res, type) => {
        try {
            const result = await admCadastroModel.findByType(type)
            res.render('pages/adm/CadastroAdmGeral/clientesAdm', { result, type })
        } catch (error) {
            res.json({ error })
        }
    }, 
    listUsersId: async (req, res, userId ) => {
        try {
            const result = await admCadastroModel.findByUserId(userId)
            res.render('pages/adm/CadastroAdmGeral/detealhesAdm', { result, userId })
        } catch (error) {
            res.json({ error })
        }
    }, 
    //Excluir usuário da tabela 
        deleteUse: async (req, res) => {
        const { id, type  } = req.params
        try {
            await admCadastroModel.findByTypeDelete(id)
            if (type == '1') {
                res.redirect('/admin/cadastroAdm/clientes')
            } else {
                res.redirect('/admin/cadastroAdm/entregador')
            }
        } catch (error) {
            res.json({ error })
        }
    },
    



}

module.exports = admCadastroController