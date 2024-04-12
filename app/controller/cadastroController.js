// Criação de usúario no Back-end 
const tarefasModel = require("../models/cadastroModel");
const { body, validationResult } = require("express-validator");

const TarefasControl = {
    CriarUsuario: async (req, res) => {
        console.log(req.body)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          console.log(errors);
          return res.render('pages/cadastro', {
            dados: req.body,
            listaErros: errors,
            logado: null

          });
        }
        
        try {
            if (req.body.type == '1') {
                await tarefasModel.create(req.body, 1);
                res.redirect('/cliente/solicitar-entrega')
            } else if (req.body.type == '2') {
                console.log('foi')
                await tarefasModel.create(req.body, 2);
                res.redirect('/cadastro-entregador')
            }
            
        } catch (error) {
            return error;
        }
        
    },
    regrasValidacao: [
        body("nome")
            .isLength({ min: 3, max: 45 })
            .withMessage("Nome invalido "),

        body("email")
            .isEmail()
            .withMessage("Email invalido "),

        body("senha")
            .isLength({ min: 8, max: 30 })
            .withMessage("senha invalido, deve conter pelo menos 8 digitos "),

    ],
};


module.exports = TarefasControl;

