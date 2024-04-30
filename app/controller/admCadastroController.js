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
     //Pegar dados da tabela e jogando na tabela Detalhes
    /*  listUsersDetalhes: async (req, res, detalhes) => {
        try {
            const detalhe = await admCadastroModel.findByDetalhe(detalhes)
            res.render('pages/adm/CadastroAdmGeral/detealhesAdm', { detalhe, detalhes })
        } catch (error) {
            res.json({ error })
        }
    },  */



}

module.exports = admCadastroController