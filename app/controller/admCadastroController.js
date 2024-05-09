const admCadastroModel = require('../models/admCadastroModel')

const admCadastroController = {    
    //Pegar dados da tabela 
    listUsers: async (req, res, type) => {
        try {
            const result = await admCadastroModel.findByType(type)
        
            let pagina = req.query.pagina == undefined ? 1 : req.query.pagina;
            let results = null
            let regPagina = 2
            let inicio = parseInt(pagina - 1) * regPagina
            let totReg = await admCadastroModel.totalReg();
            let totPaginas = Math.ceil(totReg[0].total / regPagina);
            results = await admCadastroModel.findPage(inicio, regPagina);
            let paginador = totReg[0].total <= regPagina
              ? null
              : { "pagina_atual": pagina, "total_reg": totReg[0].total, "total_paginas": totPaginas };

            res.render('pages/adm/CadastroAdmGeral/clientesAdm', { result, type,  listaTipoQuartos: results, pagina: "clientesAdm", logado: null, paginador: paginador })
            
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
            const data = {
                nome_usuario: req.body.name,
                email_usuario: req.body.email,
                cpf_usuario: req.body.cpf,
                senha_usuario: req.body.senha,
            }
            await admCadastroModel.updateUser(data, id)
            res.redirect(`/admin/cadastroAdm/editar/${id}`)
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