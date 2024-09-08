const avaliacoesModel = require('../models/avaliacoesModel')
const pedidosModel = require('../models/pedidosModel')
const { notifyMessages } = require('../util/Funcao')
const { body, validationResult } = require('express-validator')

const avaliacoesController = {
    validation: [
        body('avaliacao')
            .notEmpty()
            .withMessage('Campo não preenchido')
            .bail()
            .isLength({ min: 3, max: 200 })
            .withMessage('Campo deve ter no entre 3 e 200 caracteres')
            .bail()
            .custom(async (value, { req }) => {
                const { id_pedido } = req.params
                const avaliacao = await avaliacoesModel.findByIdPedido(id_pedido)
                
                if (avaliacao.length != 0) {
                    throw new Error('Pedido já possui avaliação enviada')
                }

                return true
            }),
    ],

    createAvaliacao: async (req, res) => {
        const { id_pedido } = req.params
        const { avaliacao } = req.body

        const erros = validationResult(req)
        if (!erros.isEmpty()) {
            return res.json({ erros: erros.mapped(), success: false })
        }

        try {

            const [pedido] = await pedidosModel.findById(id_pedido)

            const data = {
                id_pedido,
                id_entregador: pedido.id_entregador,
                id_avaliador: req.session.autenticado.id,
                feedback_avaliacao: avaliacao
            }
            await avaliacoesModel.insert(data)
            res.json({ erros: false, success: true })

        } catch (error) {
            console.log(error)
            return error
        }
        
    },

}

module.exports = avaliacoesController