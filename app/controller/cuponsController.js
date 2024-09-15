const cuponsModel = require('../models/cuponsModel')
const pedidosModel = require('../models/pedidosModel')
const { notifyMessages } = require('../util/Funcao')

const { body, validationResult } = require('express-validator')

const cuponsController = {
    validation: [
        body('codigo')
            .notEmpty()
            .withMessage('Código do cupom não preenchido')
            .bail()
            .custom(async (value, { req }) => {
                const [cupom] = await cuponsModel.findByCodigo(value)
                const { id } = req.session.autenticado
                if (cupom == undefined) {
                    throw new Error('Cupom não encontrado')
                }

                const isActive = await cuponsModel.findActiveById(id, cupom.id_cupom)
                if (isActive.length > 0) {
                    throw new Error('Cupom já ativado')
                }
                
                if (cupom.id_criador == id || cupom.id_compartilhado != null) {
                    throw new Error('Cupom não pode ser ativado')
                }

                return true
            }),
    ],
    
    showCupons: async (req, res, erro_validacao = null) => {
        const { id } = req.session.autenticado
        
        try {
            
            const [compartilhamento] = await cuponsModel.findCompartilhamento(id)
            const cupons = await cuponsModel.findAllActive(id)
            const ativos = cupons.filter(cupom => cupom.estado_cupom == 'ativo')
            // console.log(cupons)

            const msgs = notifyMessages(req, res)

            // Verifica se possui erros
            if (erro_validacao != null) {
                return res.render('pages/cliente/cupons', { autenticado: req.session.autenticado, compartilhamento, ativos, erro_validacao, valores: req.body, msgs })
            }

            res.render('pages/cliente/cupons', { autenticado: req.session.autenticado, compartilhamento, ativos, erro_validacao: null, valores: null, msgs })
        } catch (error) {
            res.json({ error })
        }
    },

    activeCupom: async (req, res) => {
        const { codigo } = req.body
        const { id } = req.session.autenticado
        const erros = validationResult(req)
        
        if (!erros.isEmpty()) {
            return cuponsController.showCupons(req, res, erros.mapped())
        }

        try {

            const [cupom] = await cuponsModel.findByCodigo(codigo)
            const [compartilhamento] = await cuponsModel.findCompartilhamento(id)
            
            await cuponsModel.insertActive({ id_usuario: id, id_cupom: cupom.id_cupom })
            if (cupom.tipo_cupom == 2) {
                // ativar cupom para usuario compartilhador
                await cuponsModel.insertActive({ id_usuario: cupom.id_criador, id_cupom: cupom.id_cupom })

                // inserindo id usuario entrou
                await cuponsModel.update({ id_compartilhado: id }, cupom.id_cupom)

                // desativando cupom compartilhamento usuario que entrou
                await cuponsModel.update({ status_cupom: 0 }, compartilhamento.id_cupom)
            }

            req.flash('success', 'Cupom ativado ; Cupom ativado com sucesso')
            
            res.redirect('back')
        } catch (error) {
            console.log(error)
            res.json({ error })
        }
    },

    disableCupom: async (req, res) => {
        const { id_cupom, id_pedido } = req.params
        const { id } = req.session.autenticado
        
        try {
            
            await cuponsModel.updateActive({ estado_cupom: 'ativo' }, id, id_cupom)
            await pedidosModel.update({ id_cupom: null }, id_pedido)

            req.flash('success', 'Cupom retirado ; Cupom retirado com sucesso')
            
            res.redirect(req.get("Referrer") || '/')
        } catch (error) {
            console.log(error)
            res.json({ error })
        }
    },

}

module.exports = cuponsController