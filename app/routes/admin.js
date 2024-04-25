var express = require("express")
var router = express.Router()

var pool = require("../../config/connection-factory");
const admCadastroController = require('../controller/admCadastroController')

router.get('/', function (req, res) {
    res.render('pages/adm/admin')
})

router.get('/cadastroAdm', function (req, res) {
    res.render('pages/adm/cadastroAdm')
})

router.get('/cadastroAdm/clientes', function (req, res) {
    admCadastroController.listUsers(req, res, '1')
})
router.get('/cadastroAdm/entregador', function (req, res) {
    admCadastroController.listUsers(req, res, '2')
})

router.get('/cadastroAdm/CreateCadastroAdm', function (req, res) {
    res.render('pages/adm/CreateCadastroAdm')
})

module.exports = router