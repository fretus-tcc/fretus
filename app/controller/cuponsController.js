const cuponsModel = require('../models/cuponsModel')
const { notifyMessages } = require('../util/Funcao')

const { body, validationResult } = require('express-validator')

const cuponsController = {
    validation: [
        body('codigo')
            .notEmpty()
            .withMessage('Código do cupom não preenchido')
            .bail()
            .custom(async value => {
                const [cupom] = await cuponsModel.findByCodigo(value)
                
                if (cupom == undefined){
                    throw new Error('Cupom não encontrado')
                }

                return true
            }),
    ],
    
    showCupons: async (req, res, erro_validacao = null) => {
        const { id } = req.session.autenticado
        
        try {
            
            const [compartilhamento] = await cuponsModel.findCompartilhamento(id)
            const cupons = await cuponsModel.findActiveByUser(id)
            const ativos = cupons.filter(cupom => cupom.estado_cupom == 'ativo')
            console.log(cupons)

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
        const erros = validationResult(req)
        
        if (!erros.isEmpty()) {
            return cuponsController.showCupons(req, res, erros.mapped())
        }

        try {

            const [cupom] = await cuponsModel.findByCodigo(codigo)
            
            await cuponsModel.insertActive({ id_usuario: req.session.autenticado.id, id_cupom: cupom.id_cupom })
            req.flash('success', 'Cupom ativado ; Cupom ativado com sucesso')
            
            res.redirect('back')
        } catch (error) {
            console.log(error)
            res.json({ error })
        }
    },

}

module.exports = cuponsController