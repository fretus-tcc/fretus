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
            const inativos = cupons.filter(cupom => cupom.estado_cupom == 'inativo')

            const msgs = notifyMessages(req, res)

            // Verifica se possui erros
            if (erro_validacao != null) {
                return res.render('pages/cliente/cupons', { autenticado: req.session.autenticado, compartilhamento, ativos, inativos, erro_validacao, valores: req.body, msgs })
            }

            res.render('pages/cliente/cupons', { autenticado: req.session.autenticado, compartilhamento, ativos, inativos, erro_validacao: null, valores: null, msgs })
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

    // ADMIN
    listPaginate: async (req, res) => {
        // paginação
        let pagina = req.query.pagina == undefined ? 1 : Number(req.query.pagina);
        let result = null
        let regPagina = 2
        let inicio = parseInt(pagina - 1) * regPagina
        let totReg = await cuponsModel.totalReg();
        let totPaginas = Math.ceil(totReg[0].total / regPagina);
        
        // validacao parametro pagina
        if (pagina <= 0 || isNaN(pagina)) {
            return res.redirect('/admin/cupons')
        } else if (pagina > totPaginas) {
            return res.redirect(`/admin/cupons?pagina=${totPaginas}`)
        }

        result = await cuponsModel.findPaginate(inicio, regPagina);
        let paginador = totReg[0].total <= regPagina 
            ? null 
            : { "pagina_atual": pagina, "total_reg": totReg[0].total, "total_paginas": totPaginas };

        const msgs = notifyMessages(req, res)

        res.render('pages/adm/cupons/cupons-adm', { result, paginador, msgs })
    },

    updateStatus: async (req, res) => {
        const { id_cupom } = req.params
        const { status_cupom } = req.body
        
        try {
            
            await cuponsModel.update({ status_cupom }, id_cupom)

            req.flash('success', 'Cupom alterado ; Cupom alterado com sucesso')
            
            res.redirect(req.get("Referrer") || '/')
        } catch (error) {
            console.log(error)
            res.json({ error })
        }
    },

    validationAdm: [
        body('codigo')
            .notEmpty()
            .withMessage('Campo código deve ser preenchido')
            .bail()
            .isLength({ max: 45 })
            .withMessage('Campo código deve possuir até 45 caracteres')
            .bail()
            .custom(async (value) => {
                const cupom = await cuponsModel.findByCodigo(value, false)
                if (cupom.length > 0) {
                    throw new Error('Código já utilizado')
                }

                return true
            }),

        body('porcentagem')
            .notEmpty()
            .withMessage('Campo porcentagem deve ser preenchido')
            .bail()
            .isInt({ max: 60 }) 
            .withMessage('Campo porcentagem deve conter um número menor que 60')
    ],

    generate: async (req, res) => {
        const { codigo, porcentagem } = req.body
        const erros = validationResult(req)
        if (!erros.isEmpty()) {
            // console.log(erros.mapped())
            return res.render('pages/adm/cupons/gerar-cupom', { erros: erros.mapped(), dados: req.body, msgs: [] })
        }
        
        await cuponsModel.insert({
            tipo_cupom: 1,
            codigo_cupom: codigo,
            porcentagem_cupom: porcentagem,
        })

        req.flash('success', 'Cupom gerado ; Cupom gerado com sucesso')
        res.redirect(req.get("Referrer") || '/')
    },
}

module.exports = cuponsController