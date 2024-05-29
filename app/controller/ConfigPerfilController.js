const ConfigPerfilModel = require('../models/ConfigPerfilModel')
const { body, validationResult } = require("express-validator");


const ConfigPerfilController = {

    // Editar - Mostrar Campos


    listUsersId: async (req, res) => {
        const { id } = req.params
        try {
            const result = await ConfigPerfilModel.findByUserId(id)
            const msgs = notifyMessages(req, res)
            res.render('pages/adm/CadastroAdmGeral/editar', { result: result[0], id, msgs, dados: null, listaErros: null })
        } catch (error) {
            res.json({ error })
        }
    },
    // Editar - Atualizar User
    updateUser: async (req, res) => {
        const { id } = req.params
        const errors = validationResult(req);
        const result = await ConfigPerfilModel.findByUserId(id);

        if (!errors.isEmpty()) {
            const dados = req.body;

            return res.render('pages/adm/CadastroAdmGeral/editar', {
                result: result[0],
                id,
                msgs: [],
                listaErros: errors,
                dados: dados
            })
        }

        try {

            const data = {
                nome_usuario: req.body.nome,
                email_usuario: req.body.email,
                
            }
            await ConfigPerfilModel.updateUser(data, id)
            req.flash('info', 'Usuário atualizado')
            res.redirect(`/admin/cadastroAdm/editar/${id}`)

        } catch (error) {
            res.json({ error })
        }

    },
    

}

module.exports = ConfigPerfilController;