var express = require("express")
var router = express.Router()
const cadastroController = require("../controller/cadastroController");
const FaleConoscoControl = require("../controller/FaleConoscoController");
const quotesController = require('../controller/quotesController')
const { gravarUsuAutenticado, gravarUsuAutenticadoCadastro, limparSessao } = require('../models/autenticador_middleware')
// const { notifyMessages } = require('../util/Funcao')
// const { body, validationResult } = require("express-validator")

var pool = require("../../config/connection-factory");

router.get("/", function (req, res) {
  res.render("pages/index", { autenticado: req.session.autenticado })
})

/* ============================CADASTRO======================================== */

router.get('/cadastro', function (req, res) {
  res.render('pages/cadastro', { listaErros: null, dados: null })
});

router.post("/cadastro", cadastroController.regrasValidacao, gravarUsuAutenticadoCadastro, async function (req, res) {
  await cadastroController.CriarUsuario(req, res);
});

/* ==================================================================== */

router.get('/login', function (req, res) {
  res.render('pages/login', { listaErros: null, dados: null })
})

router.post('/login', cadastroController.regrasValidacaoFormLogin, gravarUsuAutenticado, function (req, res) {
  cadastroController.logar(req, res);
})

router.post('/sair', limparSessao, function (req, res) {
  res.redirect('/')
})

router.get('/verificar-autenticacao', verificarUsuAutorizado([1, 2, 3], 'pages/restrito'), function (req, res) {
  cadastroController.redirectByType(req, res)
})

router.get('/ajuda', function (req, res) {
  quotesController.listQuotesTitle(req, res)
})

router.get('/ajuda/:slug', function (req, res) {
  quotesController.showQuote(req, res)
})

router.get('/cadastro-entregador', verificarUsuAutorizado([2], 'pages/restrito'), function (req, res) {
  cadastroController.showByStatus(req, res)
})

router.post('/cadastro-entregador', function (req, res) {
  cadastroController.createShipper(req, res)
})


/* ===========================FaleConsoco======================================== */
router.get('/FaleConosco', function (req, res) {
  res.render('pages/FaleConosco', { autenticado: req.session.autenticado, listaErros: null, dados: null })
})
router.post("/FaleConosco", async function (req, res) {
  FaleConoscoControl.MensagemFaleConosco(req, res);
});

/* ===========================FaleConsoco======================================== */

router.get('/Privacidade', function (req, res) {
  res.render('pages/Privacidade', { autenticado: req.session.autenticado })
})

router.get('/Sobre', (req,res) =>{
  res.render('pages/Sobre', { autenticado: req.session.autenticado })
})

module.exports = router