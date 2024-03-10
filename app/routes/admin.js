var express = require("express")
var router = express.Router()

var fabricaDeConexao = require("../../config/connection-factory")
var conexao = fabricaDeConexao()

 router.get('/admin', function (req, res) {
    res.render('pages/admin')
}) 


module.exports = router