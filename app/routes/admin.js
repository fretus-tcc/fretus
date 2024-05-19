//Sugestão de risco da parte do cliente ->   tipo se ele não gostaria de passar em tal rua
var express = require("express")
var router = express.Router()

var pool = require("../../config/connection-factory");
const admCadastroController = require('../controller/admCadastroController')
const FaleConoscoController = require('../controller/FaleConoscoController')
const { notifyMessages } = require('../util/Funcao')

const { body, validationResult } = require("express-validator")

router.get('/', function (req, res) {
    const msgs = notifyMessages(req, res)
    res.render('pages/adm/admin', { msgs })
})

router.get('/cadastroAdm', function (req, res) {
    res.render('pages/adm/CadastroAdmGeral/cadastroAdm')
})
// 2 - Página de administração de cadastro

router.get('/cadastroAdm/clientes', function (req, res) {
    admCadastroController.listUsers(req, res, '1')
})
router.get('/cadastroAdm/entregador', function (req, res) {
    admCadastroController.listUsers(req, res, '2')
})

//Excluir Usuário 
router.delete('/cadastroAdm/delete/:id/:type', function (req, res) {
    admCadastroController.deleteUse(req, res)
})

// Detalhes Usuário
router.get('/cadastroAdm/detalhesAdm/:id', function (req, res) {
    admCadastroController.listUsersIdD(req, res);
});


// Novo usuário 
router.get('/CadastroNovoUser', (req, res) => {
    res.render('pages/adm/CadastroAdmGeral/CadastroNovoUser')
})

// Editar user - Campos
router.get('/cadastroAdm/editar/:id', function (req, res) {
    admCadastroController.listUsersId(req, res);
});

// Editar user - Banco de dados
router.put('/cadastroAdm/editar/:id', admCadastroController.regrasValidacao ,  function (req, res) {
    admCadastroController.updateUser(req, res);
});
//Fale Conosco 
router.get('/AdmFaleConosco', function (req, res) {
    res.render('pages/adm/FaleConosco/AdmFaleConosco')
})
router.get('/AdmFaleConosco', function (req, res) {
    res.render('pages/adm/FaleConosco/AdmFaleConosco')
})



module.exports = router