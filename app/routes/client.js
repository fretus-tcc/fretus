var express = require("express")
var router = express.Router()
const multer = require('multer')
var pool = require("../../config/connection-factory");
const { notifyMessages } = require('../util/Funcao')
const { verificarUsuAutorizado } = require('../models/autenticador_middleware')
const ConfigPerfilController = require('../controller/ConfigPerfilController')
const pedidosController = require('../controller/pedidosController')
const favoritadosController = require('../controller/favoritadosController')
const pagamentoController = require('../controller/pagamentoController')
const avaliacoesController = require('../controller/avaliacoesController')
const denunciasController = require('../controller/denunciasController')
const cuponsController = require('../controller/cuponsController')
const cuponsModel = require('../models/cuponsModel')

const upload = multer({ storage: multer.memoryStorage() }).single('foto_de_perfil')

router.get('/solicitar-entrega', verificarUsuAutorizado([1], 'pages/restrito'), async function (req, res) {
    // formatando mensagens notificacao
    const msgs = notifyMessages(req, res)
    const cupons = await cuponsModel.findAllPayment(req.session.autenticado.id)
    res.render('pages/cliente/solicitar-entrega', { autenticado: req.session.autenticado, erros: null, msgs, cupons, dados: null, preco: null, loading: false, id_pedido: null })
})

router.post('/solicitar-entrega', verificarUsuAutorizado([1], 'pages/restrito'), pedidosController.validationPedido, function (req, res) {
    pedidosController.createPedido(req, res)
})

router.get('/escolher-entregador/:id', verificarUsuAutorizado([1], 'pages/restrito'), function (req, res) {
    /* res.render('pages/cliente/escolher-entregador', { autenticado: req.session.autenticado }) */
    pedidosController.listShipperAccept(req, res)
})

router.put('/escolher-entregador/:id_pedido/:id_entregador', verificarUsuAutorizado([1], 'pages/restrito'), function (req, res) {
    pedidosController.chooseShipper(req, res)
})

router.post('/favoritar-desfavoritar/:id', verificarUsuAutorizado([1], 'pages/restrito'), function (req, res) {
    favoritadosController.toggleFavoritados(req, res)
})

router.post('/avaliacoes/:id_pedido', verificarUsuAutorizado([1], 'pages/restrito'), avaliacoesController.validation, function (req, res) {
    avaliacoesController.createAvaliacao(req, res)
})

router.post('/denuncias/:id_denunciado', verificarUsuAutorizado([1, 2], 'pages/restrito'), denunciasController.validation, function (req, res) {
    denunciasController.createDenuncia(req, res)
})

router.post('/desativar-cupom/:id_cupom/:id_pedido', verificarUsuAutorizado([1], 'pages/restrito'), function (req, res) {
    cuponsController.disableCupom(req, res)
})

router.get('/pagamento/:id', verificarUsuAutorizado([1], 'pages/restrito'), function (req, res) {
    pagamentoController.showPagamento(req, res)
})

router.post('/pagamento/:id', verificarUsuAutorizado([1], 'pages/restrito'), function (req, res) {
    pagamentoController.createPagamento(req, res)
})

router.get('/feedback-pagamento', verificarUsuAutorizado([1], 'pages/restrito'), function (req, res) {
    pagamentoController.showFeedback(req, res)
})

router.get('/historico', verificarUsuAutorizado([1], 'pages/restrito'), function (req, res) {
    pedidosController.listPedidosByUser(req, res)
})

router.get('/historico-completo', verificarUsuAutorizado([1], 'pages/restrito'), function (req, res) {
    pedidosController.listPedidosByUserPaginate(req, res)
})

router.get('/cupons', verificarUsuAutorizado([1], 'pages/restrito'), function (req, res) {
    cuponsController.showCupons(req, res)
})

router.post('/cupons', verificarUsuAutorizado([1], 'pages/restrito'), cuponsController.validation, function (req, res) {
    cuponsController.activeCupom(req, res)
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