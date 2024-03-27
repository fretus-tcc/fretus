var express = require("express")
var router = express.Router()
const quotesController = require('../controller/quotesController')

var pool = require("../../config/connection-factory");

const { body, validationResult } = require('express-validator')
const slugify = require('slugify')
const marked = require('marked')
const sanitizeHTML = require('sanitize-html')

router.get('/', (req, res) => {
    quotesController.listQuotesTitle(req, res)
})

router.get('/admin', (req, res) => {
    quotesController.listQuotes(req, res)
})

router.get('/admin/create', function (req, res) {
    res.render('pages/ajuda-admin/create', { errors: null, quotes: null })
})

router.post('/admin/create', quotesController.validation, async function (req, res) {
    const data = saveData(req, res, 'create', req.body)
    if (data) {
        try {
            await pool.query('INSERT INTO duvidas SET ?', [data])
            res.redirect(`/ajuda/${data.slug_duvida}`)
        } catch (error) {
            return res.json({ error })
        }
    }
})

router.get('/:slug', async function (req, res) {
    quotesController.showQuote(req, res)
})

router.get('/admin/update/:id', async function (req, res) {
    quotesController.getQuoteContent(req, res)
})

router.put('/admin/update/:id', quotesController.validation, async function (req, res) {
    const { id } = req.params
    const data = saveData(req, res, 'update', { ...req.body, id_duvida: id })
    if (data) {
        try {
            await pool.query('UPDATE duvidas SET ? WHERE id_duvida = ?', [data, id])
            res.redirect(`/ajuda/${data.slug_duvida}`)
        } catch (error) {
            return res.json({ error })
        }
    }
})

router.delete('/admin/delete/:id', function (req, res) {
    quotesController.deleteQuote(req, res)
})

const saveData = (req, res, type, quotes) => {
    if (!validationResult(req).isEmpty()) {
        res.render(`pages/ajuda-admin/${type}`, { errors: validationResult(req).mapped(), quotes })
        return
    }
    const { title, content } = req.body

    return {
        titulo_duvida: title,
        conteudo_duvida: sanitizeHTML(content),
        slug_duvida: slugify(title, { lower: true, strict: true })
    }
}

module.exports = router