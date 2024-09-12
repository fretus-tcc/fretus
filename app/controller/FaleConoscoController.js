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
    ListMensg: async (req, res) => {
        try {
            const mensagem = await FaleConoscoModel.findByMensg();

            
                /* const result = await admCadastroModel.findByType(type) */
    
                // paginação
    
              /*   let pagina = req.query.pagina == undefined ? 1 : req.query.pagina;
                let results = null
                let regPagina = 2
                let inicio = parseInt(pagina - 1) * regPagina
                let totReg = await admCadastroModel.totalReg(type);
                let totPaginas = Math.ceil(totReg[0].total / regPagina);
                results = await admCadastroModel.findPage(inicio, regPagina, type);
                let paginador = totReg[0].total <= regPagina
                    ? null
                    : { "pagina_atual": pagina, "total_reg": totReg[0].total, "total_paginas": totPaginas };
    
            
                
                console.log(results) */

                /* res.render('pages/adm/CadastroAdmGeral/clientesAdm', { type, results, paginador, msgs }) */


            res.render('pages/adm/FaleConosco/AdmFaleConosco',{ mensagem , autenticado: req.session.autenticado, results, paginador })


        } catch (error) {
            return error;
        }


    },


};


module.exports = FaleConoscoControl;

