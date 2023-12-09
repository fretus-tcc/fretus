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

router.get('/FaleConosco', function (req, res) {
  res.render('pages/FaleConosco')
})

router.get('/Privacidade' , function (req, res) {
  res.render('pages/Privacidade')
})

//! ínicio Duvidas 

router.get('/duvida-1', function(req, res){
  res.render('pages/duvidas/duvida-1')
})

router.get('/duvida-2', function (req,res){
  res.render('pages/duvidas/duvida-2')
})

router.get('/duvida-3', function (req, res){
  res.render('pages/duvidas/duvida-3')
})

router.get('/duvida-4', function (req, res){
  res.render('pages/duvidas/duvida-4')
})

router.get('/duvida-5', function (req, res){
  res.render('pages/duvidas/duvida-5')
})

router.get('/duvida-6', function (req, res){
  res.render('pages/duvidas/duvida-6')
})

//! fim duvidas 

router.get('/cliente/solicitar-entrega', function (req, res) {
  res.render('pages/cliente/solicitar-entrega')
})

router.get('/cliente/chat', function (req, res) {
  res.render('pages/cliente/chat')
})

router.get('/cliente/historico', function (req, res) {
  res.render('pages/cliente/historico')
})

module.exports = router
