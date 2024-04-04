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
  res.render('pages/cadastro', {pagina:"cadastro", logado:null})
});
router.post("/cadastroCliente", async function (req, res) {
  TarefasControl.CriarUsuario(req, res, 'cliente');
});

router.post("/cadastroEntregador", async function (req, res) {
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