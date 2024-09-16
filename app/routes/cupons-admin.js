var express = require("express")
var router = express.Router()

const cuponsController = require('../controller/cuponsController')
const { verificarUsuAutorizado } = require('../models/autenticador_middleware')
const { notifyMessages } = require("../util/Funcao")

router.get('/', verificarUsuAutorizado([3], 'pages/restrito'), function (req, res) {
    cuponsController.listPaginate(req, res)
})

router.get('/gerar', verificarUsuAutorizado([3], 'pages/restrito'), function (req, res) {
    const msgs = notifyMessages(req, res)
    res.render('pages/adm/cupons/gerar-cupom', { erros: null, dados: null, msgs })
})

router.post('/gerar', verificarUsuAutorizado([3], 'pages/restrito'), cuponsController.validationAdm, function (req, res) {
    cuponsController.generate(req, res)
})

router.put('/status/:id_cupom', verificarUsuAutorizado([3], 'pages/restrito'), function (req, res) {
    cuponsController.updateStatus(req, res)
})

module.exports = router