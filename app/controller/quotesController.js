const quotesModel = require('../models/quotesModel')

const { body, validationResult } = require('express-validator')
const slugify = require('slugify')
const marked = require('marked')
const sanitizeHTML = require('sanitize-html')

const quotesController = {
    validation: [
        body('title')
            .notEmpty().withMessage('Campo não preenchido')
            .isLength({ max: 125 }).withMessage('Campo deve ter no máximo 125 caracteres')
            .custom(async (value, { req }) => {
                const existingTitle = await quotesModel.repeatedTitle(value, req.params.id)
                if (existingTitle) {
                    throw new Error('Título já utilizado!')
                }
            }),
        body('content').notEmpty().withMessage('Campo não preenchido')
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
            const result = await quotesModel.findAll()
            res.render('pages/ajuda-admin/read', { result })
        } catch (error) {
            res.json({ error })
        }
    },

    getQuoteContent: async (req, res) => {
        const { id } = req.params
        try {
            const result = await quotesModel.findById(id)
            res.render('pages/ajuda-admin/update', { errors: null, quotes: result[0] })
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
            res.render('pages/duvida', { results: results[0], content: sanitizeHTML(marked.parse(results[0].conteudo_duvida)) })
        } catch (error) {
            return res.json({ error })
        }
    },

    deleteQuote: async (req, res) => {
        const { id } = req.params
        try {
            await quotesModel.delete(id)
            res.redirect('/ajuda/admin')
        } catch (error) {
            res.json({ error })
        }
    },
}

module.exports = quotesController