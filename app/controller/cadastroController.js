// Criação de usúario no Back-end 
const tarefasModel = require("../models/cadastroModel");
const { body, validationResult } = require("express-validator");

const TarefasControl = {

    Criarussuario: async (req, res) => {
        if (Criarussuario === "cadastroCleiente") {
            if (!errors.isEmpty()) {
                console.log(errors);
                return res.render("pages/index", {
                    dados: req.body,
                    listaErros: errors,
                    pagina: "cadastroCliente",
                    logado: null

                });
            } else if (Criarussuario === "cadastroEntregador") {
                if (!errors.isEmpty()) {
                    console.log(errors)
                    return res.render("pages/index", {
                        dados: req.body,
                        listaErros: errors,
                        pagina: "cadastroEntregador",
                        logado: null
                    });
                }
            } else {
                console.log(error)
            }

            try {
                if (Criarussuario === "cadastroCleiente" ) {
                    const resultados = await tarefasModel.create(req.body)
                    res.render("pages/login", { pagina: "home", logado: null, });
                } else if (Criarussuario === "cadastroEntregador"){
                    const resultados = await tarefasModel.create(req.body)
                    res.render("pages/login", { pagina: "home", logado: null, });
                } else(error)

            } catch (error) {
                return error;
            }


        }

    } , 
    regrasValidacao: [
        body("nome")
            .isLength({ min: 3, max: 45 })
            .withMessage("Nome invalido "),

/*         body("email")
            .isEmail()
            .withMessage("Email invalido "),

        body("senha")
            .isLength({ min: 8, max: 30 })
            .withMessage("senha invalido, deve conter pelo menos 8 digitos "),

        body("c-senha")
            .notEmpty()
            .withMessage('Campo vazio.')
            .custom((value, { req }) => {
                const senha = req.body.senha
                if (value != senha) {
                    throw new Error('Senha diferentes.')
                }
                return true;
            }) */
    ],
}
module.exports = TarefasControl;

