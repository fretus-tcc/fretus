const ConfigPerfilModel = require('../models/ConfigPerfilModel')
const { body, validationResult } = require("express-validator");
const cadastroModel = require('../models/cadastroModel')


const ConfigPerfilController = {

    // Editar - Mostrar Campos
    showClientProfile: async (req, res) => {
        const { id } = req.params
        try {
            const result = await ConfigPerfilModel.findByUserId(id)
            /* const msgs = notifyMessages(req, res) */
            res.render('pages/cliente-entregador/perfil', { result: result[0], dados: null, erros: null, autenticado: req.session.autenticado, isClient: true })
        } catch (error) {
            res.json({ error })
            console.log(error)
        }
    },
    showShipperProfile: async (req, res) => {
        const { id } = req.params
        try {
            const result = await ConfigPerfilModel.findShipper(id)
            // console.log(result);
            /* const msgs = notifyMessages(req, res) */
            res.render('pages/cliente-entregador/perfil', { result: result[0], dados: null, erros: null, autenticado: req.session.autenticado, isClient: false })
        } catch (error) {
            res.json({ error })
            console.log(error)
        }
    },
    // Editar - Atualizar User
    updateClient: async (req, res) => {
        const { id } = req.params
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let fields = await ConfigPerfilModel.findByUserId(id)

            return res.render('pages/cliente-entregador/perfil', {
                result: fields[0],
                dados: req.body,
                erros: errors.mapped(),
                autenticado: req.session.autenticado,
                isClient: true
            })
        }
        
        const data = {
            nome_usuario: req.body.nome,
            email_usuario: req.body.email,
            /* email_usuario: req.body.email, */
            telefone_usuario: req.body.telefone,
            descricao_usuario: req.body.descricao,
        }

        await ConfigPerfilModel.updateUser(data, id)
        
        res.redirect(`/cliente/perfil/${id}`)

        /* try {

            const data = {
                nome_usuario: req.body.nome,
                email_usuario: req.body.email,
                
            }
            await ConfigPerfilModel.updateUser(data, id)
            req.flash('info', 'Usuário atualizado')
            res.redirect(`/admin/cadastroAdm/editar/${id}`)

        } catch (error) {
            res.json({ error })
        } */

    },

    updateShipper: async (req, res) => {
        const { id } = req.params
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let fields = await ConfigPerfilModel.findShipper(id)

            return res.render('pages/cliente-entregador/perfil', {
                result: fields[0],
                dados: req.body,
                erros: errors.mapped(),
                autenticado: req.session.autenticado,
                isClient: false
            })
        }
        
        const data = {
            nome_usuario: req.body.nome,
            email_usuario: req.body.email,
            /* email_usuario: req.body.email, */
            telefone_usuario: req.body.telefone,
            descricao_usuario: req.body.descricao,
        }

        await ConfigPerfilModel.updateUser(data, id)
        res.redirect(`/entregador/perfil/${id}`)

        /* try {

            const data = {
                nome_usuario: req.body.nome,
                email_usuario: req.body.email,
                
            }
            await ConfigPerfilModel.updateUser(data, id)
            req.flash('info', 'Usuário atualizado')
            res.redirect(`/admin/cadastroAdm/editar/${id}`)

        } catch (error) {
            res.json({ error })
        } */

    },
    
    regrasValidacaoPerfil: [
        body("nome")
            .isLength({ min: 3, max: 45 })
            .withMessage("Nome invalido "),

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
        
        body("telefone")
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

        body("descricao")
            .isLength({ min: 10, max: 120 })
            .withMessage("Deve conter de 10 até 120 caracteres")
    ],

    showClientConfig: async (req, res) => {
        const { id } = req.session.autenticado
        try {
            // console.log(id)
            const result = await ConfigPerfilModel.findByUserId(id)
            res.render('pages/cliente-entregador/configuracoes', { result: result[0], dados: null, isClient: true, autenticado: req.session.autenticado })
        } catch (error) {
            res.json({ error })
            console.log(error)
        }
    },

    showShipperConfig: async (req, res) => {
        const { id } = req.session.autenticado
        try {
            // console.log(id)
            const result = await ConfigPerfilModel.findShipper(id)
            res.render('pages/cliente-entregador/configuracoes', { result: result[0], dados: null, isClient: false, autenticado: req.session.autenticado })
        } catch (error) {
            res.json({ error })
            console.log(error)
        }
    },
}

module.exports = ConfigPerfilController;