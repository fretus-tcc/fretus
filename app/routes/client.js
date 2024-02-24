var express = require("express")
var router = express.Router()

/* var fabricaDeConexao = require("../../config/connection-factory")
var conexao = fabricaDeConexao() */

router.get('/solicitar-entrega', function (req, res) {
    res.render('pages/cliente/solicitar-entrega')
})

router.get('/chat', function (req, res) {
    res.render('pages/cliente/chat')
})

router.get('/historico', function (req, res) {
    res.render('pages/cliente/historico')
})

router.get('/cupons', function (req, res) {
    res.render('pages/cliente/cupons')
})

router.get('/perfil', function (req, res) {
    res.render('pages/cliente/perfil')
})

router.get('/escolher-entregador', function (req, res) {
    res.render('pages/cliente/escolher-entregador')
})

router.get('/configuracoes', function (req, res) {
    res.render('pages/cliente/configuracoes')
})

router.get('/configuracoes-pagamento', function (req, res) {
    res.render('pages/cliente/configuracoes-pagamento')
})

router.get('/configuracoes-notificacoes', function (req, res) {
    res.render('pages/cliente/configuracoes-notificacoes')
})

module.exports = router