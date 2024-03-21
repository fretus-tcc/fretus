var express = require("express")
var router = express.Router()

var pool = require("../../config/connection-factory");

const { body, validationResult } = require("express-validator");

router.get("/", function (req, res) {
  res.render("pages/index")
})

router.get('/login', function (req, res) {
  res.render('pages/login')
})

router.get('/cadastro', function (req, res) {
  res.render('pages/cadastro')
})

router.get('/cadastro-entregador', function (req, res) {
  res.render('pages/cadastro-entregador')
})

router.get('/FaleConosco', function (req, res) {
  res.render('pages/FaleConosco')
})

router.get('/Privacidade', function (req, res) {
  res.render('pages/Privacidade')
})
router.get('/Sobre', (req,res) =>{
  res.render('pages/Sobre')
})

/* Não mexer */

router.get('/admin', function (req, res) {
  res.render('pages/admin')
})

/* fim */

module.exports = router