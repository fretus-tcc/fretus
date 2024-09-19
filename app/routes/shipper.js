var express = require("express")
var router = express.Router()
const multer = require('multer')
const { notifyMessages } = require('../util/Funcao')
const { verificarUsuAutorizado, verificarCadastroCompleto } = require('../models/autenticador_middleware')
var pool = require("../../config/connection-factory");
const ConfigPerfilController = require('../controller/perfilConfigController')
const pedidosController = require('../controller/pedidosController')
const resultadosController = require('../controller/resultadosController')

const upload = multer({ storage: multer.memoryStorage() }).single('foto_de_perfil')

/* router.get('/configuracoes-notificacoes', verificarUsuAutorizado([2], 'pages/restrito'), verificarCadastroCompleto, function (req, res) {
    res.render('pages/cliente-entregador/configuracoes-notificacoes', { isClient: false, autenticado: req.session.autenticado })
}) */

router.get('/configuracoes-veiculos', verificarUsuAutorizado([2], 'pages/restrito'), verificarCadastroCompleto, function (req, res) {
    ConfigPerfilController.showConfig(req, res, 'pages/entregador/configuracoes-veiculos', false);
})

router.put('/configuracoes-veiculos/:id', verificarUsuAutorizado([2], 'pages/restrito'), ConfigPerfilController.regrasValidacaoPerfil, function (req, res) {
    ConfigPerfilController.updateVehicle(req, res, 'pages/entregador/configuracoes-veiculos', `/entregador/configuracoes-veiculos`);
});

router.get('/configuracoes-pagamento', verificarUsuAutorizado([2], 'pages/restrito'), verificarCadastroCompleto, function (req, res) {
    res.render('pages/cliente-entregador/configuracoes-pagamento', { isClient: false, autenticado: req.session.autenticado })
})

router.get('/configuracoes', verificarUsuAutorizado([2], 'pages/restrito'), verificarCadastroCompleto, function (req, res) {
    /* res.render('pages/cliente-entregador/configuracoes', { isClient: false, autenticado: req.session.autenticado }) */
    /* ConfigPerfilController.showShipperConfig(req, res) */
    ConfigPerfilController.showConfig(req, res, 'pages/cliente-entregador/configuracoes', false);
})

router.put('/configuracoes/:id', verificarUsuAutorizado([2], 'pages/restrito'), ConfigPerfilController.regrasValidacaoPerfil, function (req, res) {
    ConfigPerfilController.updateUser(req, res, 'pages/cliente-entregador/configuracoes', `/entregador/configuracoes`);
});

router.put('/configuracoes-entregador/:id', verificarUsuAutorizado([2], 'pages/restrito'), ConfigPerfilController.regrasValidacaoPerfil, function (req, res) {
    ConfigPerfilController.updateShipper(req, res, 'pages/cliente-entregador/configuracoes', `/entregador/configuracoes`, false);
});

router.get('/entregas-solicitadas', verificarUsuAutorizado([2], 'pages/restrito'), verificarCadastroCompleto, function (req, res) {
    pedidosController.listPedidos(req, res)
})

router.post('/entregas-solicitadas/:id/:resposta', verificarUsuAutorizado([2], 'pages/restrito'), verificarCadastroCompleto, function (req, res) {
    pedidosController.insertShipperReply(req, res)
})

router.get('/perfil/:id', verificarUsuAutorizado([2], 'pages/restrito'), verificarCadastroCompleto, function (req, res) {
    /* ConfigPerfilController.showShipperProfile(req, res) */
    ConfigPerfilController.showProfile(req, res)
    // res.render('pages/entregador/perfil', { autenticado: req.session.autenticado })
})

router.put(
    '/perfil/:id',
    verificarUsuAutorizado([2], 'pages/restrito'),
    upload,
    ConfigPerfilController.regrasValidacaoPerfil,
    function (req, res) {
        ConfigPerfilController.updateUser(req, res, 'pages/cliente-entregador/perfil', `/entregador/perfil/${req.params.id}`);
    }
);

router.put('/perfil-status/:id', verificarUsuAutorizado([2], 'pages/restrito'), ConfigPerfilController.regrasValidacaoPerfil, function (req, res) {
    ConfigPerfilController.updateShipper(req, res, 'pages/cliente-entregador/perfil', `/entregador/perfil/${req.params.id}`, false);
});

router.put('/veiculo/:id', verificarUsuAutorizado([2], 'pages/restrito'), ConfigPerfilController.regrasValidacaoPerfil, function (req, res) {
    ConfigPerfilController.updateVehicle(req, res, 'pages/cliente-entregador/perfil', `/entregador/perfil/${req.params.id}`);
});

/* router.get('/ranking', verificarUsuAutorizado([2], 'pages/restrito'), verificarCadastroCompleto, function (req, res) {
    res.render('pages/entregador/ranking', { autenticado: req.session.autenticado })
}) */

router.get('/resultados', verificarUsuAutorizado([2], 'pages/restrito'), verificarCadastroCompleto, function (req, res) {
    resultadosController.listResults(req, res)
})

router.get('/historico', verificarUsuAutorizado([2], 'pages/restrito'), verificarCadastroCompleto, function (req, res) {
    resultadosController.showHistorico(req, res)
})

router.get('/panel', verificarUsuAutorizado([2], 'pages/restrito'), verificarCadastroCompleto, function (req, res) {
    res.render('pages/entregador/panel', { autenticado: req.session.autenticado })
})

module.exports = router