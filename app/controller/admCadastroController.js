const admCadastroModel = require('../models/admCadastroModel')
const { notifyMessages, validaCPF, sendEmail } = require('../util/Funcao')
const cadastroModel = require("../models/cadastroModel");

const { body, validationResult } = require("express-validator");

const admCadastroController = {
    regrasValidacao: [
        /* body("nasc")
            .isLength({ min: 10 })
            .withMessage('Data inválida ')
            .toDate()
            .withMessage('Data inválida '), */

        body("nome")
            .isLength({ min: 3, max: 45 })
            .withMessage("Nome invalido "),

        body("tel")
            .isLength({ min: 15 })
            .withMessage('Telefone incompleto ')
            .bail()
            .isMobilePhone()
            .withMessage('Telefone inválido ')
            .bail()
            .custom(async (value, { req }) => {
                const { id } = req.params
                const tel = await cadastroModel.findByTel(value, id)
                // console.log(tel)
                if (tel.length > 0) {
                    throw new Error('Telefone já utilizado.');
                }
                return true;
            }),

        body("cpf")
            .isLength({ min: 14, max: 14 })
            .withMessage("Cpf inválido ")
            .bail()
            .custom(async (value, { req } ) => {
                if(validaCPF(value)){
                    const { id } = req.params
                    const cpf = await cadastroModel.findByCpf(value, id)
                    if (cpf.length > 0) {
                        throw new Error('Cpf já utilizado');
                    }
                    return true;
                } else {
                    throw new Error('Cpf inválido');
                }

            }),

        body("email")
            .isEmail()
            .withMessage("Email invalido ")
            .custom(async (value, { req }) => {
                const { id } = req.params
                const email = await cadastroModel.findByEmail(value, id)
                if (email.length > 0) {
                    throw new Error('Email já utilizado.');
                }
                return true;

            }),

    ],
    
    listUsersPending: async (req, res) => {
        try {

            // paginação
            let pagina = req.query.pagina == undefined ? 1 : req.query.pagina;
            let results = null
            let regPagina = 2
            let inicio = parseInt(pagina - 1) * regPagina
            let totReg = await admCadastroModel.totalRegPending();
            let totPaginas = Math.ceil(totReg[0].total / regPagina);

            // validacao parametro pagina
            if (pagina <= 0 || isNaN(pagina)) {
                return res.redirect('/admin')
            } else if (pagina > totPaginas && totPaginas > 0) {
                return res.redirect(`/admin?pagina=${totPaginas}`)
            }

            results = await admCadastroModel.findPendingPaginate(inicio, regPagina);
            let paginador = totReg[0].total <= regPagina
                ? null
                : { "pagina_atual": pagina, "total_reg": totReg[0].total, "total_paginas": totPaginas };

            // formatando mensagens notificacao
            const msgs = notifyMessages(req, res)

            // verifica se nao existe nenhum entregador pendente
            if (results.length == 0) {
                return res.render('pages/adm/admin', { msgs, entregadores: [], paginador, total: totReg[0].total, erro: 'Por enquanto, todos entregadores foram aceitos' })
            }

            // console.log(results)
            res.render('pages/adm/admin', { msgs, entregadores: results, paginador, total: totReg[0].total, erro: null })

        } catch (error) {
            console.log(error)
            res.json({ error: "Falha ao acessar dados" })

        }
        

    },
    //Pegar dados da tabela 
    listUsers: async (req, res, type) => {
        try { 
            /* const result = await admCadastroModel.findByType(type) */

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
        const msgs = notifyMessages(req, res)
        try {
            const result = await admCadastroModel.findByUserIdD(id)
            
            if (result[0].tipo_usuario == 2) {
                const shipper = await admCadastroModel.findShipper(id)
                const merge = {...result[0], ...shipper[0]}
                const subscribe = await cadastroModel.findBySubscribe(id)
                const isSubscribed = subscribe.length > 0
                // console.log(isSubscribed);
                return res.render('pages/adm/CadastroAdmGeral/detealhesAdm', { result: merge, isSubscribed, msgs, id })
            }
            res.render('pages/adm/CadastroAdmGeral/detealhesAdm', { result: result[0], isSubscribed: null, msgs, id })
        } catch (error) {
            console.log(error)
            res.json({ error })
        }
    },
    // Editar - Mostrar Campos
    listUsersId: async (req, res) => {
        const { id } = req.params
        try {
            const result = await admCadastroModel.findByUserId(id)
            const msgs = notifyMessages(req, res)

            res.render('pages/adm/CadastroAdmGeral/editar', { result: result[0], id, msgs, dados: null, listaErros: null })

        } catch (error) {
            res.json({ error })
            
        }
    },
    updateStatus: async (req, res) => {
        const { id } = req.params
        try {
            await admCadastroModel.updateShipper(req.body, id)
            const shipper = await admCadastroModel.findEmailById(id)
            const email = shipper[0].email_usuario
            // console.log(email);
            if (req.body.status_aprovacao == 1) {
                await sendEmail(email, 'Atualizações sobre o seu cadastro', 'Negado')
                req.flash('success', 'Entregador Negado ; Entregador Negado com sucesso')
            } else {
                await sendEmail(email, 'Seu cadastro foi aprovado', 'Aprovado')
                req.flash('success', 'Entregador Aprovado ; Entregador Aprovado com sucesso')
            }
            res.redirect(`/admin/cadastroAdm/detalhesAdm/${id}`)
        } catch (error) {
            res.json({ error })
        }
    },
    updateUser: async (req, res) => {
        const { id } = req.params
        try {
            await admCadastroModel.updateUser(req.body, id)
            const action = req.body.status_usuario == '0' ? 'desativado' : 'ativado'
            req.flash('success', `Usuário ${action} ; Usuário ${action} com sucesso`)
            res.redirect('back')
        } catch (error) {
            console.log(error)
            res.json({ error })
        }
    },
    //Excluir usuário da tabela 
    deleteUse: async (req, res) => {
        const { id, type } = req.params
        try {
            await admCadastroModel.findByTypeDelete(id)
            req.flash('error', 'Usuário deletado ; Usuário deletado com sucesso')
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