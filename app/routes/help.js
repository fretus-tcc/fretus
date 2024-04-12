var express = require("express")
var router = express.Router()
const quotesController = require('../controller/quotesController')

router.get('/', function (req, res) {
    quotesController.listQuotes(req, res)
})

router.get('/create', function (req, res) {
    res.render('pages/adm/create', { errors: null, quotes: null })
})

router.post('/create', quotesController.validation, function (req, res) {
    quotesController.createQuote(req, res)
})

router.get('/update/:id', function (req, res) {
    quotesController.getQuoteContent(req, res)
})

router.put('/update/:id', quotesController.validation, function (req, res) {
    quotesController.updateQuote(req, res)
})

router.delete('/delete/:id', function (req, res) {
    quotesController.deleteQuote(req, res)
})

module.exports = router