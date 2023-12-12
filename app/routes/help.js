var express = require("express")
var router = express.Router()

var fabricaDeConexao = require("../../config/connection-factory")
var conexao = fabricaDeConexao()

router.get('/', function (req, res) {
    res.render('pages/ajuda')
})

router.get('/duvida-1', function (req, res) {
    res.render('pages/duvidas/duvida-1')
})

router.get('/duvida-2', function (req, res) {
    res.render('pages/duvidas/duvida-2')
})

router.get('/duvida-3', function (req, res) {
    res.render('pages/duvidas/duvida-3')
})

router.get('/duvida-4', function (req, res) {
    res.render('pages/duvidas/duvida-4')
})

router.get('/duvida-5', function (req, res) {
    res.render('pages/duvidas/duvida-5')
})

router.get('/duvida-6', function (req, res) {
    res.render('pages/duvidas/duvida-6')
})

module.exports = router