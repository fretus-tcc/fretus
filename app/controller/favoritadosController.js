const favoritadosModel = require('../models/favoritadosModel')
const { notifyMessages } = require('../util/Funcao')
const { body, validationResult } = require('express-validator')

const favoritadosController = {
    /* validation: [
        body('titulo')
            .notEmpty().withMessage('Campo não preenchido')
            .isLength({ max: 125 }).withMessage('Campo deve ter no máximo 125 caracteres')
            .custom(async (value, { req }) => {
                const existingTitle = await quotesModel.repeatedTitle(value, req.params.id)
                if (existingTitle) {
                    throw new Error('Título já utilizado!')
                }
            }),
        body('conteudo').notEmpty().withMessage('Campo não preenchido')
    ], */

    toggleFavoritados: async (req, res) => {
        const { id: id_favoritado } = req.params
        const { id: id_favoritou } = req.session.autenticado

        try {
            const isFavoritado = await favoritadosModel.findById(id_favoritou, id_favoritado)

            // Verifica se o usuario ja e favoritado, e realiza o toggle
            if (isFavoritado.length > 0) {
                await favoritadosModel.delete(id_favoritou, id_favoritado)
                req.flash('success', 'Entregador desfavoritado ; Entregador desfavoritado com sucesso')
            } else {
                await favoritadosModel.create({ id_favoritou, id_favoritado })
                req.flash('success', 'Entregador favoritado ; Entregador favoritado com sucesso')
            }

            res.redirect(`back`)
        } catch (error) {
            return res.json({ error })
        }
    },

    showFavoritados: async (req, res) => {
        /* const { slug } = req.params
        try {
            const results = await quotesModel.findBySlug(slug)
            if (!results.length) {
                return res.redirect('/ajuda')
            }

            // formatando mensagens notificacao
            const msgs = notifyMessages(req, res)

            res.render('pages/duvida', { autenticado: req.session.autenticado })
        } catch (error) {
            return res.json({ error })
        } */
    },
}

module.exports = favoritadosController