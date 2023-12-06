var express = require("express")
var router = express.Router()

var fabricaDeConexao = require("../../config/connection-factory")
var conexao = fabricaDeConexao()

router.get("/", function (req, res) {
  res.render("pages/index")
})

router.get('/login', function (req, res) {
  res.render('pages/login')
})

router.get('/cadastro', function (req, res) {
  res.render('pages/cadastro')
})

router.get('/ajuda', function (req, res) {
  res.render('pages/ajuda')
})

router.get('/cadastro-entregador', function (req, res) {
  res.render('pages/cadastro-entregador')
})

module.exports = router
