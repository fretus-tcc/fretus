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
    // Detalhes
    listUsersId: async (req, res) => {
        const { id } = req.params
        try {
            const result = await admCadastroModel.findByUserId(id)
            res.render('pages/adm/CadastroAdmGeral/detealhesAdm', { result, id })
        } catch (error) {
            res.json({ error })
        }
    },
    // Editar - Mostrar Campos
    listUsersId: async (req, res) => {
        const { id } = req.params
        try {
            const result = await admCadastroModel.findByUserId(id)
            res.render('pages/adm/CadastroAdmGeral/editar', { result, id })
        } catch (error) {
            res.json({ error })
        }
    },
    // Editar - Atualizar User
    updateUser: async (req, res) => {
        const { id } = req.params
        try {
            const result = await admCadastroModel.findByUserId(id)
            console.log(req.body);
            await admCadastroModel.updateUser(req.body, id)
            res.render('pages/adm/CadastroAdmGeral/editar', { result, id })
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