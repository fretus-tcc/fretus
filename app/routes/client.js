var express = require("express")
var router = express.Router()
const multer = require('multer')
var pool = require("../../config/connection-factory");
const { notifyMessages } = require('../util/Funcao')
const { verificarUsuAutorizado } = require('../models/autenticador_middleware')
const ConfigPerfilController = require('../controller/ConfigPerfilController')
const pedidosController = require('../controller/pedidosController')

const upload = multer({ storage: multer.memoryStorage() }).single('foto_de_perfil')

router.get('/solicitar-entrega', verificarUsuAutorizado([1], 'pages/restrito'), function (req, res) {
    // formatando mensagens notificacao
    const msgs = notifyMessages(req, res)
    res.render('pages/cliente/solicitar-entrega', { autenticado: req.session.autenticado, erros: null, msgs, dados: null, preco: null, loading: false })
})

router.post('/solicitar-entrega', verificarUsuAutorizado([1], 'pages/restrito'), pedidosController.validationPedido, function (req, res) {
    pedidosController.createPedido(req, res)
})

router.get('/chat', verificarUsuAutorizado([1], 'pages/restrito'), function (req, res) {
    res.render('pages/cliente/chat', { autenticado: req.session.autenticado })
})

router.get('/historico', verificarUsuAutorizado([1], 'pages/restrito'), function (req, res) {
    pedidosController.listPedidosByUser(req, res)
})

router.get('/cupons', verificarUsuAutorizado([1], 'pages/restrito'), function (req, res) {
    res.render('pages/cliente/cupons', { autenticado: req.session.autenticado })
})

/* router.get('/perfil', verificarUsuAutorizado([1], 'pages/restrito'), function (req, res) {
    res.render('pages/cliente/perfil')
}) */

router.get('/perfil/:id', verificarUsuAutorizado([1], 'pages/restrito'), function (req, res) {
    /* ConfigPerfilController.showClientProfile(req, res); */
    ConfigPerfilController.showProfile(req, res, true);
});

router.put(
    '/perfil/:id',
    verificarUsuAutorizado([1], 'pages/restrito'),
    upload,
    ConfigPerfilController.regrasValidacaoPerfil,
    function (req, res) {
        ConfigPerfilController.updateUser(req, res, 'pages/cliente-entregador/perfil', `/cliente/perfil/${req.params.id}`, true);
    }
);

router.get('/escolher-entregador', verificarUsuAutorizado([1], 'pages/restrito'), function (req, res) {
    res.render('pages/cliente/escolher-entregador', { autenticado: req.session.autenticado })
})

router.get('/configuracoes', verificarUsuAutorizado([1], 'pages/restrito'), function (req, res) {
    /* res.render('pages/cliente-entregador/configuracoes', { isClient: true, autenticado: req.session.autenticado }) */
    /* ConfigPerfilController.showClientConfig(req, res); */
    ConfigPerfilController.showConfig(req, res, 'pages/cliente-entregador/configuracoes', true);
})

router.put('/configuracoes/:id', verificarUsuAutorizado([1], 'pages/restrito'), ConfigPerfilController.regrasValidacaoPerfil, function (req, res) {
    ConfigPerfilController.updateUser(req, res, 'pages/cliente-entregador/configuracoes', `/cliente/configuracoes`, true);
});

router.get('/configuracoes-pagamento', verificarUsuAutorizado([1], 'pages/restrito'), function (req, res) {
    res.render('pages/cliente-entregador/configuracoes-pagamento', { isClient: true, autenticado: req.session.autenticado })
})

/* router.get('/configuracoes-notificacoes', verificarUsuAutorizado([1], 'pages/restrito'), function (req, res) {
    res.render('pages/cliente-entregador/configuracoes-notificacoes', { isClient: true, autenticado: req.session.autenticado })
}) */

module.exports = router