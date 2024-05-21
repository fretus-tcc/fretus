var express = require("express")
var router = express.Router()
const quotesController = require('../controller/quotesController')

router.get('/', verificarUsuAutorizado([3], 'pages/restrito'), function (req, res) {
    quotesController.listQuotes(req, res)
})

router.get('/create', verificarUsuAutorizado([3], 'pages/restrito'), function (req, res) {
    res.render('pages/adm/create', { errors: null, quotes: null })
})

router.post('/create', verificarUsuAutorizado([3], 'pages/restrito'), quotesController.validation, function (req, res) {
    quotesController.createQuote(req, res)
})

router.get('/update/:id', verificarUsuAutorizado([3], 'pages/restrito'), function (req, res) {
    quotesController.getQuoteContent(req, res)
})

router.put('/update/:id', verificarUsuAutorizado([3], 'pages/restrito'), quotesController.validation, function (req, res) {
    quotesController.updateQuote(req, res)
})

router.delete('/delete/:id', verificarUsuAutorizado([3], 'pages/restrito'), function (req, res) {
    quotesController.deleteQuote(req, res)
})

module.exports = router