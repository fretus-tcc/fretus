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

router.get('/Privacidade', function (req, res) {
  res.render('pages/Privacidade')
})

//! ínicio Duvidas 

router.get('/duvida-1', function (req, res) {
  res.render('pages/duvidas/duvida-1')
})

router.get('/duvida-2', function (req, res) {
  res.render('pages/duvidas/duvida-2')
})

router.get('/duvida-3', function (req, res) {
  res.render('pages/duvidas/duvida-3')
})

router.get('/duvida-4', function (req, res) {
  res.render('pages/duvidas/duvida-4')
})

router.get('/duvida-5', function (req, res) {
  res.render('pages/duvidas/duvida-5')
})

router.get('/duvida-6', function (req, res) {
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

router.get('/cliente/cupons', function (req, res) {
  res.render('pages/cliente/cupons')
})

router.get('/cliente/perfil', function (req, res) {
  res.render('pages/cliente/perfil')
})

router.get('/cliente/escolher-entregador', function (req, res) {
  res.render('pages/cliente/escolher-entregador')
})

router.get('/cliente/configuracoes', function (req, res) {
  res.render('pages/cliente/configuracoes')
})

router.get('/cliente/configuracoes-pagamento', function (req, res) {
  res.render('pages/cliente/configuracoes-pagamento')
})

router.get('/cliente/configuracoes-notificacoes', function (req, res) {
  res.render('pages/cliente/configuracoes-notificacoes')
})

//! Início da rota do entregador
router.get('/entregador/chat', function (req, res) {
  res.render('pages/entregador/chat')

})
router.get('/entragador/configuracoes-notificacoes', function (req, res) {
  res.render('pages/entragador/configuracoes-notificacoes')
})

router.get('/entragador/configuracoes-pagamento', function (req, res) {
  res.render('pages/entragador/configuracoes-pagamento')
})

router.get('/entragador/configuracoes', function (req, res) {
  res.render('pages/entregador/configuracoes')
})

router.get('/entregador/entregas-solicitadas', function (req, res) {
  res.render('pages/entregador/entregas-solicitadas')
})

router.get('/entregador/historico', function (req, res) {
  res.render('pages/entregador/historico')
})

router.get('/entregador/perfil', function (req, res) {
  res.render('pages/entregador/perfil')
})

router.get('/entregador/ranking', function (req, res) {
  res.render('pages/entregador/ranking')
})
router.get('/entregador/resultados', function (req, res) {
  res.render('pages/entregador/resultados')
})

//! fim da rota do entregador
module.exports = router
