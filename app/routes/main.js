var express = require("express")
var router = express.Router()
const TarefasControl = require("../controller/cadastroController");
const quotesController = require('../controller/quotesController')
const { body, validationResult } = require("express-validator")

var pool = require("../../config/connection-factory");

router.get("/", function (req, res) {
  res.render("pages/index")
})

router.get('/login', function (req, res) {
  res.render('pages/login')
})

/* ============================CADASTRO======================================== */

router.get('/cadastro', function (req, res) {
  res.render('pages/cadastro', { logado:null , retorno: null, listaErros: null, dados: null})
});

router.post("/cadastro", TarefasControl.regrasValidacao, async function (req, res) {
  await TarefasControl.CriarUsuario(req, res);
});

/* ==================================================================== */

router.get('/ajuda', function (req, res) {
  quotesController.listQuotesTitle(req, res)
})

router.get('/ajuda/:slug', function (req, res) {
  quotesController.showQuote(req, res)
})

router.get('/cadastro-entregador', function (req, res) {
  res.render('pages/cadastro-entregador')
})

router.get('/FaleConosco', function (req, res) {
  res.render('pages/FaleConosco')
})

router.get('/Privacidade', function (req, res) {
  res.render('pages/Privacidade')
})
router.get('/Sobre', (req,res) =>{
  res.render('pages/Sobre')
})


module.exports = router