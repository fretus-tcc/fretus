const quotesModel = require('../models/quotesModel')
const { notifyMessages } = require('../util/Funcao')

const { body, validationResult } = require('express-validator')
const slugify = require('slugify')
const marked = require('marked')
const sanitizeHTML = require('sanitize-html')

const quotesController = {
    validation: [
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
    ],
    
    listQuotesTitle: async (req, res) => {
        try {
            const result = await quotesModel.findTitle()
            res.render('pages/ajuda', { result })
        } catch (error) {
            res.json({ error })
        }
    },

    listQuotes: async (req, res) => {
        try {
            // paginação
            let pagina = req.query.pagina == undefined ? 1 : Number(req.query.pagina);
            let result = null
            let regPagina = 2
            let inicio = parseInt(pagina - 1) * regPagina
            let totReg = await quotesModel.totalReg();
            let totPaginas = Math.ceil(totReg[0].total / regPagina);
            
            // validacao parametro pagina
            if (pagina <= 0 || isNaN(pagina)) {
                return res.redirect('/admin/ajuda')
            } else if (pagina > totPaginas) {
                return res.redirect(`/admin/ajuda?pagina=${totPaginas}`)
            }

            result = await quotesModel.findPaginate(inicio, regPagina);
            let paginador = totReg[0].total <= regPagina 
                ? null 
                : { "pagina_atual": pagina, "total_reg": totReg[0].total, "total_paginas": totPaginas };

            // formatando mensagens notificacao
            const msgs = notifyMessages(req, res)

            // formatando conteudo dúvida
            result.forEach(item => {
                item.conteudo_duvida = marked.parse(item.conteudo_duvida).replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, '').slice(0, 300).concat('...')
            })

            res.render('pages/adm/read', { result, paginador, msgs })
        } catch (error) {
            res.json({ error })
            console.log(error);
        }
    },

    getQuoteContent: async (req, res) => {
        const { id } = req.params
        try {
            const result = await quotesModel.findById(id)
            res.render('pages/adm/update', { errors: null, quotes: result[0] })
        } catch (error) {
            res.json({ error })
        }
    },

    showQuote: async (req, res) => {
        const { slug } = req.params
        try {
            const results = await quotesModel.findBySlug(slug)
            if (!results.length) {
                return res.redirect('/ajuda')
            }

            // formatando mensagens notificacao
            const msgs = notifyMessages(req, res)

            res.render('pages/duvida', { results: results[0], content: sanitizeHTML(marked.parse(results[0].conteudo_duvida)), msgs })
        } catch (error) {
            return res.json({ error })
        }
    },

    formatData: (req, res, type, quotes) => {
        if (!validationResult(req).isEmpty()) {
            res.render(`pages/adm/${type}`, { errors: validationResult(req).mapped(), quotes })
            return
        }
        const { titulo, conteudo } = req.body
    
        return {
            titulo_duvida: titulo,
            conteudo_duvida: sanitizeHTML(conteudo),
            slug_duvida: slugify(titulo, { lower: true, strict: true })
        }
    },

    createQuote: async (req, res) => {
        const data = quotesController.formatData(req, res, 'create', req.body) /*  */
        if (data) {
            try {
                await quotesModel.create(data)
                req.flash('success', 'Dúvida criada')
                res.redirect(`/ajuda/${data.slug_duvida}`)
            } catch (error) {
                return res.json({ error })
            }
        }
    },

    updateQuote: async (req, res) => {
        const { id } = req.params
        const data = quotesController.formatData(req, res, 'update', { ...req.body, id_duvida: id })
        if (data) {
            try {
                await quotesModel.update(data, id)
                req.flash('info', 'Dúvida atualizada')
                res.redirect(`/ajuda/${data.slug_duvida}`)
            } catch (error) {
                return res.json({ error })
            }
        }
    },

    deleteQuote: async (req, res) => {
        const { id } = req.params
        try {
            await quotesModel.delete(id)
            req.flash('error', 'Dúvida deletada')
            res.redirect('/admin/ajuda')
        } catch (error) {
            res.json({ error })
        }
    },
}

module.exports = quotesController