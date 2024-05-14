const admCadastroModel = require('../models/admCadastroModel')
const { notifyMessages } = require('../util/Funcao')

const { body, validationResult } = require("express-validator");

const admCadastroController = {
    //Pegar dados da tabela 
    listUsers: async (req, res, type) => {
        try {/* 
            const result = await admCadastroModel.findByType(type) */

            // paginação

            let pagina = req.query.pagina == undefined ? 1 : req.query.pagina;
            let results = null
            let regPagina = 2
            let inicio = parseInt(pagina - 1) * regPagina
            let totReg = await admCadastroModel.totalReg(type);
            let totPaginas = Math.ceil(totReg[0].total / regPagina);
            results = await admCadastroModel.findPage(inicio, regPagina, type);
            let paginador = totReg[0].total <= regPagina
                ? null
                : { "pagina_atual": pagina, "total_reg": totReg[0].total, "total_paginas": totPaginas };

            // formatando mensagens notificacao
            const msgs = notifyMessages(req, res)

            // console.log(results)
            res.render('pages/adm/CadastroAdmGeral/clientesAdm', { type, results, paginador, msgs })


        } catch (error) {
            console.log(error)
            res.json({ error: "Falha ao acessar dados" })

        }
    },
    // Detalhes
    listUsersIdD: async (req, res) => {
        const { id } = req.params
        try {
            const result = await admCadastroModel.findByUserIdD(id)
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
            const msgs = notifyMessages(req, res)
            res.render('pages/adm/CadastroAdmGeral/editar', { result, id, msgs })
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
            req.flash('info', 'Usuário atualizado')
            res.redirect(`/admin/cadastroAdm/editar/${id}`)
        } catch (error) {
            res.json({ error })
        }
    },
    //Excluir usuário da tabela 
    deleteUse: async (req, res) => {
        const { id, type } = req.params
        try {
            await admCadastroModel.findByTypeDelete(id)
            req.flash('error', 'Usuário deletado')
            if (type == '1') {
                res.redirect('/admin/cadastroAdm/clientes')
            } else {
                res.redirect('/admin/cadastroAdm/entregador')
            }
        } catch (error) {
            res.json({ error })
        }
    },
    regrasValidacao: [
        body("nome")
            .isLength({ min: 3, max: 45 })
            .withMessage("Nome invalido "),
        
    ],




}

module.exports = admCadastroController