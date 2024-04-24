var express = require("express")
var router = express.Router()

var pool = require("../../config/connection-factory");

const { body, validationResult } = require("express-validator");

router.get('/', function (req, res) {
    res.render('pages/adm/admin')
})

router.get('/cadastroAdm', function (req, res) {
    res.render('pages/adm/cadastroAdm')
})

router.get('/clientes', function (req, res) {
    res.render('pages/adm/clentesAdm')
})

module.exports = router