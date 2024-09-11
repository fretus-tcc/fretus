const denunciasModel = require('../models/denunciasModel')
const pedidosModel = require('../models/pedidosModel')
const { body, validationResult } = require('express-validator')

const denunciasController = {
    validation: [
        body('motivo_denuncia')
            .notEmpty()
            .withMessage('Motivo da denúncia não preenchido')
            .bail()
            .isIn(['Assédio ou Comportamento inadequado', 'Problemas de Qualidade do Serviço', 'Violar Regras do Site', 'Suspeita de Fraude', 'Outros'])
            .withMessage('Motivo da denúncia inválido'),

        body('outros_motivos')
            .optional()
            .notEmpty()
            .withMessage('Motivo não preenchido')
            .bail()
            .isLength({ max: 75 })
            .withMessage('Motivo deve conter até 75 caracteres')
            .bail()
            .custom((value, { req }) => {
                if (req.body.motivo_denuncia != 'Outros') {
                    throw new Error('Motivo inválido')
                }

                return true
            }),

        body('data_denuncia')
            .notEmpty()
            .withMessage('Data não preenchida')
            .bail()
            .custom((value, { req }) => {
                if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
                    throw new Error('Data inválida')
                }

                const todayDate = new Date();
                const todayString = todayDate.toISOString().split('T')[0];
                if (value > todayString) {
                    throw new Error('Data deve ser no passado')                   
                }

                return true
            }),

        body('descricao_denuncia')
            .notEmpty()
            .withMessage('Descrição não preenchida')
            .bail()
            .isLength({ max: 400 })
            .withMessage('Descrição deve conter até 400 caracteres'),
    ],

    createDenuncia: async (req, res) => {
        const { id_denunciado } = req.params
        const { motivo_denuncia, outros_motivos, data_denuncia, descricao_denuncia } = req.body

        const erros = validationResult(req)
        if (!erros.isEmpty()) {
            return res.json({ erros: erros.array(), success: false })
        }

        try {
            // const [pedido] = await pedidosModel.findById(id_pedido)

            const data = {
                // id_pedido,
                id_denunciador: req.session.autenticado.id,
                id_denunciado,
                motivo_denuncia,
                outros_motivos: motivo_denuncia != 'Outros' ? null : outros_motivos,
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