const express = require('express');
const router = express.Router();
const ChatController = require('../controller/chatController');
const { verificarUsuAutorizado } = require('../models/autenticador_middleware');


router.get('/cliente/chat', verificarUsuAutorizado([1], 'pages/restrito'), function (req, res) {
    ChatController.listUsersId(req, res)
})

router.get('/entregador/chat', verificarUsuAutorizado([2], 'pages/restrito'), function (req, res) {
    ChatController.listUsersId(req, res )
})





module.exports = router;
