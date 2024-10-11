const panelModel = require('../models/panelModel')
const { notifyMessages } = require('../util/Funcao')
const { param, body, validationResult } = require('express-validator')

const panelController = {
    
    listEntregas: async (req, res) => {
        const { id } = req.session.autenticado
        const { id_pedido } = req.query

        try {
            const entregas = await panelModel.findEntregas(id)
            const status = await panelModel.findStatus(id)

            entregas.forEach((entrega, i) => {  
                entrega.status_entrega = status[i].status_entrega
            })

            const msgs = notifyMessages(req, res)

            // console.log(entregas)

            res.render('pages/entregador/panel', { autenticado: req.session.autenticado, entregas, id_pedido, msgs })
        } catch (error) {
            console.log(error)
            res.json({ error })
        }
    },

    updateStatus: async (req, res) => {
        const { id_pedido, status } = req.params
        
        try {
            const [status] = await panelModel.findStatusById(id_pedido)
            const status_entrega = status.status_entrega + 1

            // console.log(status_entrega)
            if (status_entrega <= 4) {
                await panelModel.insert({ id_pedido, status_entrega })
            }

            if (status_entrega == 4) {
                // console.log('finalizada')
                await panelModel.finishPedido(id_pedido)
            }

            req.flash('success', 'Etapa finalizada ; Etapa finalizada com sucesso')

            res.redirect(`/entregador/panel?id_pedido=${id_pedido}`)
        } catch (error) {
            console.log(error)
            res.json({ error })
        }
    },

    // Histórico - Cliente
    listStatus: async (req, res) => {
        const { id_pedido } = req.params

        try {
            const status = await panelModel.findAllStatusById(id_pedido)
            // console.log(status)

            res.json({ sucess: true, error: null, status })
        } catch (error) {
            console.log(error)
            res.json({ sucess: false, error, status: null })
        }
    },

    validation: [
        param('id_pedido')
            .isInt()
            .withMessage('Tente novamente'),

        body('motivo_impeditivo')
            .notEmpty()
            .withMessage('Motivo do impeditivo não preenchido')
            .bail()
            .isIn(['Problemas com Veículo', 'Acidente de Trânsito', 'Furto', 'Outros'])
            .withMessage('Motivo do impeditivo inválido'),

        body('descricao_impeditivo')
            .notEmpty()
            .withMessage('Descrição não preenchida')
            .bail()
            .isLength({ max: 255 })
            .withMessage('Descrição deve conter até 255 caracteres'),
    ],

    createImpeditivo: async (req, res) => {
        const { id_pedido } = req.params
        const { motivo_impeditivo, descricao_impeditivo } = req.body

        const erros = validationResult(req)
        if (!erros.isEmpty()) {
            return res.json({ erros: erros.array(), success: false })
        }

        try {

            const data = {
                id_pedido,
                motivo_impeditivo,
                descricao_impeditivo
            }
            await panelModel.insertImpeditivo(data)
            res.json({ erros: false, success: true })

        } catch (error) {
            console.log(error)
            return error
        }
        
    },

}

module.exports = panelController