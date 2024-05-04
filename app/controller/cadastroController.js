// Criação de usúario no Back-end 
const tarefasModel = require("../models/cadastroModel");
const { validaCPF } = require("../util/Funcao");
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
            .withMessage("Cpf inválido ")
            .custom(async (value) => {

                if(validaCPF(value)){
                    const cpf = await tarefasModel.findByCpf(value)
                    if (cpf.length > 0) {
                        throw new Error('Cpf já utilizado');
                    }
                    return true;
                } else{
                    throw new Error('Cpf inválido');
                }

            }),

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
            .withMessage("Senha inválida, deve conter pelo menos 8 caracteres")
            .bail()
            .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/)
            .withMessage("Senha inválida, deve conter pelo menos 1 letra, 1 número e 1 caractere especial"),
    ],
};


module.exports = TarefasControl;

