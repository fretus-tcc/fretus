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
                    autenticado: req.session.autenticado
                });
            }
            try {
                await FaleConoscoModel.createFaleconosco(req.body);
                
                res.redirect('/')

                /* req.flash('success', `mensagem enviada com sucesso`) */

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
            .isLength({ min: 4, max: 10 })
            .withMessage("tipo invalido ")
            .bail()
            .custom((value) => {
                const validRoles = ["Entregador", "entregador", "Cliente", "cliente"];
                if (validRoles.includes(value)) {
                    return true;
                } else {
                    throw new Error('Por favor, preencha os campos com "Cliente" ou "Entregador".');
                }
            }),

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

    // Detalhes
    /*  listUsersId: async (req, res) => {
         const { id } = req.params
         try {
             const result = await FaleConoscoModel.findByUserId(id)
             res.render('pages/adm/CadastroAdmGeral/detealhesAd', { result, id })
         } catch (error) {
             res.json({ error })
         }
     }, */


};


module.exports = FaleConoscoControl;

