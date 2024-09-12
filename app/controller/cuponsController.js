const cuponsModel = require('../models/cuponsModel')
const { notifyMessages } = require('../util/Funcao')

const { body, validationResult } = require('express-validator')

const quotesController = {
    // validation: [
    //     body('titulo')
    //         .notEmpty().withMessage('Campo não preenchido')
    //         .isLength({ max: 125 }).withMessage('Campo deve ter no máximo 125 caracteres')
    //         .custom(async (value, { req }) => {
    //             const existingTitle = await quotesModel.repeatedTitle(value, req.params.id)
    //             if (existingTitle) {
    //                 throw new Error('Título já utilizado!')
    //             }
    //         }),
    //     body('conteudo').notEmpty().withMessage('Campo não preenchido')
    // ],
    
    showCupons: async (req, res) => {
        const { id } = req.session.autenticado
        try {
            
            const [compartilhamento] = await cuponsModel.findCompartilhamento(id)

            res.render('pages/cliente/cupons', { autenticado: req.session.autenticado, compartilhamento })
        } catch (error) {
            res.json({ error })
        }
    },

}

module.exports = quotesController