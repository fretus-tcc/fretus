var express = require("express")
var router = express.Router()
const TarefasControl = require("../controller/cadastroController");
const FaleConoscoControl = require("../controller/FaleConoscoController");
const quotesController = require('../controller/quotesController')
const { body, validationResult } = require("express-validator")

var pool = require("../../config/connection-factory");

router.get("/", function (req, res) {
  res.render("pages/index")
})

router.get('/login',  function (req, res) {
  res.render('pages/login', {listaErros: null, dados: null})
  
})
router.post('/login', TarefasControl.regrasValidacaoFormLogin, function (req, res) {
  TarefasControl.logar(req, res);
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

router.post('/cadastro-entregador', function (req, res) {
  console.log(req.body)
  res.redirect('/entregador/entregas-solicitadas')
})


/* ===========================FaleConsoco======================================== */
router.get('/FaleConosco', function (req, res) {
  res.render('pages/FaleConosco',{pagina:"FaleConosco", logado:null , retorno: null, listaErros: null, dados: null})
})
router.post("/FaleConosco", async function (req, res) {
  FaleConoscoControl.MensagemFaleConosco(req, res);
});

/* ===========================FaleConsoco======================================== */


router.get('/Privacidade', function (req, res) {
  res.render('pages/Privacidade')
})
router.get('/Sobre', (req,res) =>{
  res.render('pages/Sobre')
})

module.exports = router