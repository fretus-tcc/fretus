var express = require("express")
var router = express.Router()

var pool = require("../../config/connection-factory");
const { notifyMessages } = require('../util/Funcao')
const { verificarUsuAutorizado } = require('../models/autenticador_middleware')

const ConfigPerfilController = require('../controller/ConfigPerfilController')

router.get('/solicitar-entrega', verificarUsuAutorizado([1], 'pages/restrito'), function (req, res) {
    // formatando mensagens notificacao
    const msgs = notifyMessages(req, res)
    res.render('pages/cliente/solicitar-entrega', { autenticado: req.session.autenticado, msgs })
})

router.get('/chat', verificarUsuAutorizado([1], 'pages/restrito'), function (req, res) {
    res.render('pages/cliente/chat', { autenticado: req.session.autenticado })
})

router.get('/historico', verificarUsuAutorizado([1], 'pages/restrito'), function (req, res) {
    res.render('pages/cliente/historico', { autenticado: req.session.autenticado })
})

router.get('/cupons', verificarUsuAutorizado([1], 'pages/restrito'), function (req, res) {
    res.render('pages/cliente/cupons', { autenticado: req.session.autenticado })
})

/* router.get('/perfil', verificarUsuAutorizado([1], 'pages/restrito'), function (req, res) {
    res.render('pages/cliente/perfil')
}) */

router.get('/perfil/:id', verificarUsuAutorizado([1], 'pages/restrito'), function (req, res) {
    ConfigPerfilController.showClientData(req, res);
});

router.put('/perfil/:id', verificarUsuAutorizado([1], 'pages/restrito'), ConfigPerfilController.regrasValidacaoPerfil, function (req, res) {
    ConfigPerfilController.updateClient(req, res);
});

router.get('/escolher-entregador', verificarUsuAutorizado([1], 'pages/restrito'), function (req, res) {
    res.render('pages/cliente/escolher-entregador', { autenticado: req.session.autenticado })
})

router.get('/configuracoes', verificarUsuAutorizado([1], 'pages/restrito'), function (req, res) {
    res.render('pages/cliente-entregador/configuracoes', { isClient: true, autenticado: req.session.autenticado })
})

router.get('/configuracoes-pagamento', verificarUsuAutorizado([1], 'pages/restrito'), function (req, res) {
    res.render('pages/cliente-entregador/configuracoes-pagamento', { isClient: true, autenticado: req.session.autenticado })
})

router.get('/configuracoes-notificacoes', verificarUsuAutorizado([1], 'pages/restrito'), function (req, res) {
    res.render('pages/cliente-entregador/configuracoes-notificacoes', { isClient: true, autenticado: req.session.autenticado })
})

module.exports = router