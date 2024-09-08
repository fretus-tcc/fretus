const avaliacoesModel = require('../models/avaliacoesModel')
const pedidosModel = require('../models/pedidosModel')
const { notifyMessages } = require('../util/Funcao')
const { body, validationResult } = require('express-validator')

const avaliacoesController = {
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

    createAvaliacao: async (req, res) => {
        const { id_pedido } = req.params
        const { avaliacao } = req.body

        try {

            const [pedido] = await pedidosModel.findById(id_pedido)

            const data = {
                id_pedido,
                id_entregador: pedido.id_entregador,
                id_avaliador: req.session.autenticado.id,
                feedback_avaliacao: avaliacao
            }
            await avaliacoesModel.insert(data)
            req.flash('success', 'Avaliação enviada ; Avaliação enviada com sucesso')
            res.redirect('back')

        } catch (error) {
            console.log(error)
            return error
        }
        
    },

}

module.exports = avaliacoesController