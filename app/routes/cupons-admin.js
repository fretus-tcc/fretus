var express = require("express")
var router = express.Router()

const cuponsController = require('../controller/cuponsController')
const { verificarUsuAutorizado } = require('../models/autenticador_middleware')

router.get('/', verificarUsuAutorizado([3], 'pages/restrito'), function (req, res) {
    cuponsController.listPaginate(req, res)
})

router.get('/cadastroAdm', verificarUsuAutorizado([3], 'pages/restrito'), function (req, res) {
    res.render('pages/adm/CadastroAdmGeral/cadastroAdm')
})

router.put('/status/:id_cupom', verificarUsuAutorizado([3], 'pages/restrito'), function (req, res) {
    cuponsController.updateStatus(req, res)
})

module.exports = router