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
  res.render('pages/duvida-1')
})

router.get('/duvida-2', function (req,res){
  res.render('pages/duvida-2')
})

router.get('/duvida-3', function (req, res){
  res.render('pages/duvida-3')
})

router.get('/duvida-4', function (req, res){
  res.render('pages/duvida-4')
})

router.get('/duvida-5', function (req, res){
  res.render('pages/duvida-5')
})

router.get('/duvida-6', function (req, res){
  res.render('pages/duvida-6')
})

//! fim duvidas 


module.exports = router
