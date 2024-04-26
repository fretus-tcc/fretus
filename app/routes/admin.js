var express = require("express")
var router = express.Router()


var pool = require("../../config/connection-factory");
const admCadastroController = require('../controller/admCadastroController')

router.get('/', function (req, res) {
    res.render('pages/adm/admin')
})

router.get('/cadastroAdm', function (req, res) {
    res.render('pages/adm/CadastroAdmGeral/cadastroAdm')
})

router.get('/cadastroAdm/clientes', function (req, res) {
    admCadastroController.listUsers(req, res, '1')
})
router.get('/cadastroAdm/entregador', function (req, res) {
    admCadastroController.listUsers(req, res, '2')
})

router.get('/CadastroAdmGeral/CreateCadastroAdm', function (req, res) {
    res.render('pages/adm/CadastroAdmGeral/CreateCadastroAdm')
})
//Excluir Usuário 

router.delete('/cadastroAdm/delete/:id/:type', function (req, res) {
    admCadastroController.deleteUse(req, res)
})

// Detalhes Usuário 
router.get('/cadastroAdm', function (req, res) {
    res.render('pages/adm/CadastroAdmGeral/c')
})
module.exports = router