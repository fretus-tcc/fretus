const FaleConoscoModel = require("../models/FaleConoscoModel");

const FaleConoscoControl = {
    MensagemFaleConosco: async (req, res) => {
        
        try {
            await FaleConoscoModel.createFaleconosco(req.body);

            
            if (!errors.isEmpty()) {
                // console.log(errors);
                return res.render('pages/FaleConosco', {
                    dados: req.body,
                    listaErros: errors,
                    logado: null
                });
            }
            
            
            
            res.redirect('/')
            
        } catch (error) {
            return error;
        }

    },
    regrasValidacao: [
        body("nome")
            .isLength({ min: 3, max: 45 })
            .withMessage("Nome invalido "),

        body("nasc")
            .isLength({ min: 10 })
            .withMessage('Data inválida ')
            .toDate()
            .withMessage('Data inválida ')
            .custom(value => {
                const birthDate = new Date(value);
                if (isNaN(birthDate.getTime())) {
                    throw new Error('Data de nascimento inválida');
                }
                
                const today = new Date();
                let age = today.getFullYear() - birthDate.getFullYear();
                const monthDiff = today.getMonth() - birthDate.getMonth();
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                if (age < 18) {
                    throw new Error('Você deve ter pelo menos 18 anos');
                }

                return true;
            })
        ,
        body("tel")
            .isLength({ min: 15 })
            .withMessage('Telefone incompleto ')
            .bail()
            .isMobilePhone()
            .withMessage('Telefone inválido ')
            .bail()
            .custom(async (value) => {
                const tel = await cadastroModel.findByTel(value)
                if (tel.length > 0) {
                    throw new Error('Telefone já utilizado.');
                }
                return true;
            }),

        body("cpf")
            .isLength({ min: 14, max: 14 })
            .withMessage("Cpf inválido ")
            .bail()
            .custom(async (value) => {

                if (validaCPF(value)) {
                    const cpf = await cadastroModel.findByCpf(value)
                    if (cpf.length > 0) {
                        throw new Error('Cpf já utilizado');
                    }
                    return true;
                } else {
                    throw new Error('Cpf inválido');
                }

            }),

        body("email")
            .isEmail()
            .withMessage("Email invalido ")
            .custom(async (value) => {
                const email = await cadastroModel.findByEmail(value)
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
    
     // Detalhes
     listUsersId: async (req, res) => {
        const { id } = req.params
        try {
            const result = await FaleConoscoModel.findByUserId(id)
            res.render('pages/adm/CadastroAdmGeral/detealhesAd', { result, id })
        } catch (error) {
            res.json({ error })
        }
    },


};


module.exports = FaleConoscoControl;

