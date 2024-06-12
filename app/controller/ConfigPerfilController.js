const ConfigPerfilModel = require('../models/ConfigPerfilModel')
const { body, validationResult } = require("express-validator");


const ConfigPerfilController = {

    // Editar - Mostrar Campos
    showClientData: async (req, res) => {
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
    showShipperData: async (req, res) => {
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
    updateUser: async (req, res) => {
        const { id, type } = req.params
        // console.log(type)
        // console.log(req.body)
        let fields = await ConfigPerfilModel.findByUserId(id)
        if (type == 2) {
            fields = await ConfigPerfilModel.findShipper(id)
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
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
            email_usuario: req.body.email,
            telefone_usuario: req.body.telefone,
            descricao_usuario: req.body.descricao,
        }

        const result = await ConfigPerfilModel.updateUser(data, id)
        if (type == 1) {
            res.redirect(`/cliente/perfil/${id}`)
        } else {
            res.redirect(`/entregador/perfil/${id}`)
        }

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
        body("descricao")
            .isLength({ min: 10, max: 120 })
            .withMessage("Deve conter de 10 até 120 caracteres")
    ],
}

module.exports = ConfigPerfilController;