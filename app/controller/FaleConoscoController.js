const FaleConoscoModel = require("../models/FaleConoscoModel");
const { body, validationResult } = require("express-validator");
const { validaCPF } = require("../util/Funcao");

const FaleConoscoControl = {
    MensagemFaleConosco: async (req, res) => {

        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors);
                return res.render("pages/FaleConosco", {
                    dados: req.body,
                    listaErros: errors,
                    pagina: "FaleConosco",
                    autenticado: req.session.autenticado,
                    dadosNotificacao: null
                });
            }
            try {
                await FaleConoscoModel.createFaleconosco(req.body);

                req.session.dadosNotificacao = {
                    titulo: "Enviado",
                    mensagem: "Mensagem enviada com sucesso",
                    tipo: "success"
                };
                req.session.autenticado = req.session.autenticado;

                res.redirect("/");

            } catch (error) {
                return error;
            }
        } catch (error) {
            return error;
        }

    },
    regrasValidacao: [

        body("nome")
            .isLength({ min: 3, max: 45 })
            .withMessage("Nome invalido "),
        body("cpf")
            .isLength({ min: 14, max: 14 })
            .withMessage("Cpf inválido ")
            .bail()
            .custom(async (value) => {
                if (validaCPF(value)) {
                    return true;
                } else {
                    throw new Error('Cpf inválido');
                }
            }),
        body("email")
            .isEmail()
            .withMessage("Email invalido "),
        body("tipo")

        .isIn(["Cliente", "Entregador"])
        .withMessage('Por favor, selecione "Cliente" ou "Entregador".')
        .bail()    
           /*  .isLength({ min: 4, max: 10 })
            .withMessage("tipo invalido ")
            .bail()
            .custom((value) => {
                const validRoles = ["Entregador", "entregador", "Cliente", "cliente"];
                if (validRoles.includes(value)) {
                    return true;
                } else {
                    throw new Error('Por favor, preencha os campos com "Cliente" ou "Entregador".');
                }
            }) */,

        body("assunto")
            .isLength({ min: 4, max: 50 })
            .withMessage("assunto invalido")
        ,
        body("mensagem")
            .custom((value) => {
                const wordCount = value.split(/\s+/).length;
                if (wordCount >= 10) {
                    return true;
                } else {
                    throw new Error('Mensagem inválida, mínimo 10 palavras');
                }
            }),

    ],

    //Paginador 
    ListMensg: async (req, res) => {
        try {
            let pagina = req.query.pagina == undefined ? 1 : parseInt(req.query.pagina);
            let regPagina = 2;
            let inicio = (pagina - 1) * regPagina;

            let totReg = await FaleConoscoModel.totalReg();
            let totPaginas = Math.ceil(totReg[0].total / regPagina);

            let mensagem = await FaleConoscoModel.findPage(inicio, regPagina);

            let paginador = totReg[0].total <= regPagina ? null : { 
                "pagina_atual": pagina, 
                "total_reg": totReg[0].total, 
                "total_paginas": totPaginas 
            };

            res.render('pages/adm/FaleConosco/AdmFaleConosco', {
                mensagem,
                autenticado: req.session.autenticado,
                paginador: paginador
            });

        } catch (error) {
            console.log(error);
            res.json({ erro: "Falha ao acessar dados" });
        }
    },


};


module.exports = FaleConoscoControl;

