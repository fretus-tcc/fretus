const denunciasModel = require('../models/denunciasModel')
const pedidosModel = require('../models/pedidosModel')
const { body, validationResult } = require('express-validator')

const denunciasController = {
    // validation: [
    //     body('avaliacao')
    //         .notEmpty()
    //         .withMessage('Campo não preenchido')
    //         .bail()
    //         .isLength({ min: 3, max: 200 })
    //         .withMessage('Campo deve ter no entre 3 e 200 caracteres')
    //         .bail()
    //         .custom(async (value, { req }) => {
    //             const { id_pedido } = req.params
    //             const avaliacao = await avaliacoesModel.findByIdPedido(id_pedido)
                
    //             if (avaliacao.length != 0) {
    //                 throw new Error('Pedido já possui avaliação enviada')
    //             }

    //             return true
    //         }),
    // ],

    createDenuncia: async (req, res) => {
        const { id_denunciado } = req.params
        const { motivo_denuncia, outros_motivos, data_denuncia, descricao_denuncia } = req.body
        try {
            // const [pedido] = await pedidosModel.findById(id_pedido)

            const data = {
                // id_pedido,
                id_denunciador: req.session.autenticado.id,
                id_denunciado,
                motivo_denuncia,
                outros_motivos,
                data_denuncia,
                descricao_denuncia
            }
            await denunciasModel.insert(data)
            res.json({ erros: false, success: true })

        } catch (error) {
            console.log(error)
            return error
        }
        
    },

}

module.exports = denunciasController