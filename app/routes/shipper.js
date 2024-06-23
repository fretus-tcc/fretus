var express = require("express")
var router = express.Router()
const { notifyMessages } = require('../util/Funcao')

var pool = require("../../config/connection-factory");
const ConfigPerfilController = require('../controller/ConfigPerfilController')

router.get('/chat', verificarUsuAutorizado([2], 'pages/restrito'), verificarCadastroCompleto, function (req, res) {
    res.render('pages/entregador/chat', { autenticado: req.session.autenticado })
})

/* router.get('/configuracoes-notificacoes', verificarUsuAutorizado([2], 'pages/restrito'), verificarCadastroCompleto, function (req, res) {
    res.render('pages/cliente-entregador/configuracoes-notificacoes', { isClient: false, autenticado: req.session.autenticado })
}) */

router.get('/configuracoes-veiculos', verificarUsuAutorizado([2], 'pages/restrito'), verificarCadastroCompleto, function (req, res) {
    /* res.render('pages/entregador/configuracoes-veiculos', { autenticado: req.session.autenticado }) */
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
    ConfigPerfilController.updateUser(req, res, 'pages/cliente-entregador/configuracoes', `/entregador/configuracoes`, false);
});

router.put('/configuracoes-entregador/:id', verificarUsuAutorizado([2], 'pages/restrito'), ConfigPerfilController.regrasValidacaoPerfil, function (req, res) {
    ConfigPerfilController.updateShipper(req, res, 'pages/cliente-entregador/configuracoes', `/entregador/configuracoes`, false);
});

router.get('/entregas-solicitadas', verificarUsuAutorizado([2], 'pages/restrito'), verificarCadastroCompleto, function (req, res) {
    const msgs = notifyMessages(req, res)
    res.render('pages/entregador/entregas-solicitadas', { autenticado: req.session.autenticado, msgs })
})

router.get('/historico', verificarUsuAutorizado([2], 'pages/restrito'), verificarCadastroCompleto, function (req, res) {
    res.render('pages/entregador/historico', { autenticado: req.session.autenticado })
})

router.get('/perfil/:id', verificarUsuAutorizado([2], 'pages/restrito'), verificarCadastroCompleto, function (req, res) {
    /* ConfigPerfilController.showShipperProfile(req, res) */
    ConfigPerfilController.showProfile(req, res, false)
    // res.render('pages/entregador/perfil', { autenticado: req.session.autenticado })
})

router.put('/perfil/:id', verificarUsuAutorizado([2], 'pages/restrito'), ConfigPerfilController.regrasValidacaoPerfil, function (req, res) {
    ConfigPerfilController.updateUser(req, res, 'pages/cliente-entregador/perfil', `/entregador/perfil/${req.params.id}`);
});

router.put('/perfil-status/:id', verificarUsuAutorizado([2], 'pages/restrito'), ConfigPerfilController.regrasValidacaoPerfil, function (req, res) {
    ConfigPerfilController.updateShipper(req, res, 'pages/cliente-entregador/perfil', `/entregador/perfil/${req.params.id}`, false);
});

router.put('/veiculo/:id', verificarUsuAutorizado([2], 'pages/restrito'), ConfigPerfilController.regrasValidacaoPerfil, function (req, res) {
    ConfigPerfilController.updateVehicle(req, res, 'pages/cliente-entregador/perfil', `/entregador/perfil/${req.params.id}`);
});

router.get('/ranking', verificarUsuAutorizado([2], 'pages/restrito'), verificarCadastroCompleto, function (req, res) {
    res.render('pages/entregador/ranking', { autenticado: req.session.autenticado })
})

router.get('/resultados', verificarUsuAutorizado([2], 'pages/restrito'), verificarCadastroCompleto, function (req, res) {
    res.render('pages/entregador/resultados', { autenticado: req.session.autenticado })
})

router.get('/panel', verificarUsuAutorizado([2], 'pages/restrito'), verificarCadastroCompleto, function (req, res) {
    res.render('pages/entregador/panel', { autenticado: req.session.autenticado })
})

module.exports = router