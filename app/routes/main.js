var express = require("express")
var router = express.Router()
const TarefasControl = require("../controller/cadastroController");
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
  res.render('pages/cadastro', {pagina:"cadastroCliente , cadastroEntregador ", logado:null , retorno: null, listaErros: null, dados: null})
});

router.post("/cadastroCliente",TarefasControl.regrasValidacao, async function (req, res) {
  TarefasControl.CriarUsuario(req, res, 'cliente');
});

router.post("/cadastroEntregador",TarefasControl.regrasValidacao, async function (req, res) {
  TarefasControl.CriarUsuario(req, res, 'entregador'); 
});



/* ==================================================================== */

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