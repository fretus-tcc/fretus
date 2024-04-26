// Criação de usúario no Back-end 
const tarefasModel = require("../models/cadastroModel");
const validaCPF = require("../ult/Funcao");
const { body, validationResult } = require("express-validator");

const TarefasControl = {
    CriarUsuario: async (req, res) => {
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
            await tarefasModel.create(req.body);
            if (req.body.type == '1') {
                res.redirect('/cliente/solicitar-entrega')
            } else {
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
        body("cpf")
            .isLength({ min: 14, max: 14 })
            .withMessage("cpf invalido ")
            .custom(async (value) => {
                console.log(value)
                if(validaCPF.validarCpf(value)){
                    const cpf = await tarefasModel.findByCpf(value)
                    if (cpf.length > 0) {
                        throw new Error('Cpf já utilizado.');
                    }
                    return true;
                } else{
                    return false 
                }
               


            }).withMessage("cpf invalido "), 

        body("email")
            .isEmail()
            .withMessage("Email invalido ")
            .custom(async (value) => {
                const email = await tarefasModel.findByEmail(value)
                if (email.length > 0) {
                    throw new Error('Email já utilizado.');
                }
                return true;

            }),

        body("senha")
            .isLength({ min: 8, max: 30 })
            .withMessage("senha invalido, deve conter pelo menos 8 digitos "),

    ],
};


module.exports = TarefasControl;

