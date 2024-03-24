const tarefasModel = require('../models/quotesModel')

const { body, validationResult } = require('express-validator')
const slugify = require('slugify')
const marked = require('marked')
const sanitizeHTML = require('sanitize-html')

const tarefasController = {
    listQuotesTitle: async (req, res) => {
        try {
            const result = await tarefasModel.findTitle()
            res.render('pages/ajuda', { result })
        } catch (error) {
            res.json({ error })
        }
    },

    listQuotes: async (req, res) => {
        try {
            const result = await tarefasModel.findAll()
            res.render('pages/ajuda-admin/read', { result })
        } catch (error) {
            res.json({ error })
        }
    },
}

module.exports = tarefasController