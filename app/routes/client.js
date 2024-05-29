var express = require("express")
var router = express.Router()

var pool = require("../../config/connection-factory");
const { notifyMessages } = require('../util/Funcao')
const { verificarUsuAutorizado } = require('../models/autenticador_middleware')

router.get('/solicitar-entrega', verificarUsuAutorizado([1], 'pages/restrito'), function (req, res) {
    // formatando mensagens notificacao
    const msgs = notifyMessages(req, res)
    
    res.render('pages/cliente/solicitar-entrega', { autenticado: req.session.autenticado, msgs })
})

router.get('/chat', verificarUsuAutorizado([1], 'pages/restrito'), function (req, res) {
    res.render('pages/cliente/chat')
})

router.get('/historico', verificarUsuAutorizado([1], 'pages/restrito'), function (req, res) {
    res.render('pages/cliente/historico')
})

router.get('/cupons', verificarUsuAutorizado([1], 'pages/restrito'), function (req, res) {
    res.render('pages/cliente/cupons')
})



router.get('/perfil', verificarUsuAutorizado([1], 'pages/restrito'), function (req, res) {
    res.render('pages/cliente/perfil')
})



router.get('/escolher-entregador', verificarUsuAutorizado([1], 'pages/restrito'), function (req, res) {
    res.render('pages/cliente/escolher-entregador')
})

router.get('/configuracoes', verificarUsuAutorizado([1], 'pages/restrito'), function (req, res) {
    res.render('pages/cliente-entregador/configuracoes', { isClient: true })
})

router.get('/configuracoes-pagamento', verificarUsuAutorizado([1], 'pages/restrito'), function (req, res) {
    res.render('pages/cliente-entregador/configuracoes-pagamento', { isClient: true })
})

router.get('/configuracoes-notificacoes', verificarUsuAutorizado([1], 'pages/restrito'), function (req, res) {
    res.render('pages/cliente-entregador/configuracoes-notificacoes', { isClient: true })
})

module.exports = router