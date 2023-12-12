var express = require("express")
var router = express.Router()

var fabricaDeConexao = require("../../config/connection-factory")
var conexao = fabricaDeConexao()

router.get('/chat', function (req, res) {
    res.render('pages/entregador/chat')
})

router.get('/configuracoes-notificacoes', function (req, res) {
    res.render('pages/entregador/configuracoes-notificacoes')
})

router.get('/configuracoes-pagamento', function (req, res) {
    res.render('pages/entregador/configuracoes-pagamento')
})

router.get('/configuracoes', function (req, res) {
    res.render('pages/entregador/configuracoes')
})

router.get('/entregas-solicitadas', function (req, res) {
    res.render('pages/entregador/entregas-solicitadas')
})

router.get('/historico', function (req, res) {
    res.render('pages/entregador/historico')
})

router.get('/perfil', function (req, res) {
    res.render('pages/entregador/perfil')
})

router.get('/ranking', function (req, res) {
    res.render('pages/entregador/ranking')
})
router.get('/resultados', function (req, res) {
    res.render('pages/entregador/resultados')
})

module.exports = router