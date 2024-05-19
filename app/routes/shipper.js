var express = require("express")
var router = express.Router()
const { notifyMessages } = require('../util/Funcao')

var pool = require("../../config/connection-factory");

router.get('/chat', verificarUsuAutorizado([2], 'pages/restrito'), function (req, res) {
    res.render('pages/entregador/chat')
})

router.get('/configuracoes-notificacoes', verificarUsuAutorizado([2], 'pages/restrito'), function (req, res) {
    res.render('pages/cliente-entregador/configuracoes-notificacoes', { isClient: false })
})

router.get('/configuracoes-pagamento', verificarUsuAutorizado([2], 'pages/restrito'), function (req, res) {
    res.render('pages/cliente-entregador/configuracoes-pagamento', { isClient: false })
})

router.get('/configuracoes', verificarUsuAutorizado([2], 'pages/restrito'), function (req, res) {
    res.render('pages/cliente-entregador/configuracoes', { isClient: false })
})

router.get('/entregas-solicitadas', verificarUsuAutorizado([2], 'pages/restrito'), function (req, res) {
    const msgs = notifyMessages(req, res)
    res.render('pages/entregador/entregas-solicitadas', { autenticado: req.session.autenticado, msgs })
})

router.get('/historico', verificarUsuAutorizado([2], 'pages/restrito'), function (req, res) {
    res.render('pages/entregador/historico')
})

router.get('/perfil', verificarUsuAutorizado([2], 'pages/restrito'), function (req, res) {
    res.render('pages/entregador/perfil')
})

router.get('/ranking', verificarUsuAutorizado([2], 'pages/restrito'), function (req, res) {
    res.render('pages/entregador/ranking')
})

router.get('/resultados', verificarUsuAutorizado([2], 'pages/restrito'), function (req, res) {
    res.render('pages/entregador/resultados')
})

router.get('/panel', verificarUsuAutorizado([2], 'pages/restrito'), function (req, res) {
    res.render('pages/entregador/panel')
})

module.exports = router