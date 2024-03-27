var express = require("express")
var router = express.Router()
const quotesController = require('../controller/quotesController')

router.get('/', function (req, res) {
    quotesController.listQuotesTitle(req, res)
})

router.get('/admin', function (req, res) {
    quotesController.listQuotes(req, res)
})

router.get('/admin/create', function (req, res) {
    res.render('pages/ajuda-admin/create', { errors: null, quotes: null })
})

router.post('/admin/create', quotesController.validation, function (req, res) {
    quotesController.createQuote(req, res)
})

router.get('/:slug', function (req, res) {
    quotesController.showQuote(req, res)
})

router.get('/admin/update/:id', function (req, res) {
    quotesController.getQuoteContent(req, res)
})

router.put('/admin/update/:id', quotesController.validation, function (req, res) {
    quotesController.updateQuote(req, res)
})

router.delete('/admin/delete/:id', function (req, res) {
    quotesController.deleteQuote(req, res)
})

module.exports = router