var express = require("express")
var router = express.Router()

var pool = require("../../config/connection-factory");
const { notifyMessages } = require('../util/Funcao')

router.get('/solicitar-entrega', function (req, res) {
    // formatando mensagens notificacao
    const msgs = notifyMessages(req, res)
    
    res.render('pages/cliente/solicitar-entrega', { autenticado: req.session.autenticado, msgs })
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
    res.render('pages/cliente-entregador/configuracoes', { isClient: true })
})

router.get('/configuracoes-pagamento', function (req, res) {
    res.render('pages/cliente-entregador/configuracoes-pagamento', { isClient: true })
})

router.get('/configuracoes-notificacoes', function (req, res) {
    res.render('pages/cliente-entregador/configuracoes-notificacoes', { isClient: true })
})

module.exports = router