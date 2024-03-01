var express = require("express")
var router = express.Router()

/* var fabricaDeConexao = require("../../config/connection-factory")
var conexao = fabricaDeConexao() */

router.get("/", function (req, res) {
  res.render("pages/index")
})

router.get('/login', function (req, res) {
  res.render('pages/login')
})

router.get('/cadastro', function (req, res) {
  res.render('pages/cadastro')
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
router.get('/Sobre', (res,req) =>{
  res.render('pages/Sobre')
})
module.exports = router