const { validationResult } = require("express-validator");
const usuario = require("../models/cadastroModel");
const bcrypt = require("bcryptjs");

verificarUsuAutenticado = (req, res, next) => {
    if (req.session.autenticado) {
        var autenticado = req.session.autenticado;
    } else {
        var autenticado = { autenticado: null, id: null, tipo: null };
    }
    req.session.autenticado = autenticado;
    next();
}

limparSessao = (req, res, next) => {
    req.session.destroy();
    next()
}

gravarUsuAutenticado = async (req, res, next) => {
    erros = validationResult(req)
    if (erros.isEmpty()) {
        /* var dadosForm = {
            email_usuario: req.body.email,
            senha_usuario: req.body.senha,
        }; 
        var results = await usuario.findByEmail(dadosForm); */

        const errorLogin = {
            errors: [
                { msg: 'Email ou Senha incorreta', path: 'email' },
            ]
        }

        var results = await usuario.findByEmail(req.body.email); 
        var total = Object.keys(results).length;
        if (total == 1) {
            if (bcrypt.compareSync(req.body.senha, results[0].senha_usuario)) {
                var autenticado = {
                    autenticado: results[0].nome_usuario,
                    id: results[0].id_usuario,
                    tipo: results[0].tipo_usuario
                };
            } else {
                // erro senha incorreta
                return res.render("pages/login", { listaErros: errorLogin, dados: req.body })
            }
        } else {
            // var autenticado =  { autenticado: null, id: null, tipo: null };
            // erro email nao encontrado
            return res.render("pages/login", { listaErros: errorLogin, dados: req.body })
        }
    } /* else {
        // var autenticado =  { autenticado: null, id: null, tipo: null };
    } */
    req.session.autenticado = autenticado;
    next();
}

verificarUsuAutorizado = (tipoPermitido, destinoFalha) => {
    return (req, res, next) => {
        if (req.session.autenticado.autenticado != null &&
            tipoPermitido.find(function (element) { return element == req.session.autenticado.tipo }) != undefined) {
            next();
        } else {
            res.render(destinoFalha, req.session.autenticado);
        }
    };
}

module.exports = {
    verificarUsuAutenticado,
    limparSessao,
    gravarUsuAutenticado,
    verificarUsuAutorizado
}
