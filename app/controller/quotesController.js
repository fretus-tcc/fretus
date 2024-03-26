const quotesModel = require('../models/quotesModel')

const { body, validationResult } = require('express-validator')
const slugify = require('slugify')
const marked = require('marked')
const sanitizeHTML = require('sanitize-html')

const quotesController = {
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