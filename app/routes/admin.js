var express = require("express")
var router = express.Router()

var pool = require("../../config/connection-factory");

 router.get('/admin', function (req, res) {
    res.render('pages/admin')
}) 


module.exports = router