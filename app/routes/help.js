var express = require("express")
var router = express.Router()
var pool = require("../../config/connection-factory");
const quotesController = require('../controller/quotesController')

router.get('/', (req, res) => {
    quotesController.listQuotesTitle(req, res)
})

router.get('/admin', (req, res) => {
    quotesController.listQuotes(req, res)
})

router.get('/admin/create', function (req, res) {
    res.render('pages/ajuda-admin/create', { errors: null, quotes: null })
})

router.post('/admin/create', quotesController.validation, function (req, res) {
    quotesController.createQuote(req, res)
})

router.get('/:slug', async function (req, res) {
    quotesController.showQuote(req, res)
})

router.get('/admin/update/:id', async function (req, res) {
    quotesController.getQuoteContent(req, res)
})

router.put('/admin/update/:id', quotesController.validation, async function (req, res) {
    const { id } = req.params
    const data = quotesController.formatData(req, res, 'update', { ...req.body, id_duvida: id })
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

module.exports = router