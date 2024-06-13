const FaleConoscoModel = require("../models/FaleConoscoModel");
const { body, validationResult } = require("express-validator");

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

                });
            }

            try {
                await FaleConoscoModel.createFaleconosco(req.body);
                res.redirect('/')

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

