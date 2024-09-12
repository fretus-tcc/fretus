// Criação de usúario no Back-end 
const cadastroModel = require("../models/cadastroModel");
const cuponsModel = require("../models/cuponsModel");
const { validaCPF } = require("../util/Funcao");
const { body, validationResult } = require("express-validator");
const bycrypt = require('bcryptjs')
const salt = bycrypt.genSaltSync(10)
const crypto = require('crypto')

const TarefasControl = {

    CriarUsuario: async (req, res) => {
        // formatando data nascimento
        const { nasc } = req.body
        if (nasc) {
            const date = new Date(nasc)
            req.body.nasc = date.toISOString().split('T')[0]
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // console.log(errors);
            return res.render('pages/cadastro', {
                dados: req.body,
                listaErros: errors,
                logado: null
            });
        }

        try {
            const result = await cadastroModel.create({ ...req.body, senha: bycrypt.hashSync(req.body.senha) });
            // definindo id_usuario autenticacao cadastro
            req.session.autenticado.id = result[0].insertId

            // inserindo cupom compartilhamento
            if (req.session.autenticado.tipo == '1') {
                await cuponsModel.insert({
                    tipo_cupom: 2,
                    codigo_cupom: crypto.randomUUID(),
                    porcentagem_cupom: 15,
                    id_criador: req.session.autenticado.id
                })
            }

            req.flash('success', `Bem-vindo, ${req.body.nome} ; Cadastro realizado com sucesso`)

            res.redirect('/verificar-autenticacao')
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

    logar: (req, res) => {
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            return res.render("pages/login", { listaErros: erros, dados: req.body })
        }

        if (req.session.autenticado == null) {
            return res.render("pages/login", { listaErros: erros, dados: null })
        }

        req.flash('success', `Olá, ${req.session.autenticado.autenticado} ; Bem-vindo de volta`)

        res.redirect('/verificar-autenticacao')
    },


    regrasValidacaoFormLogin: [
        body("email")
            .isEmail()
            .withMessage("Email invalido "),

        body("senha")
            .isLength({ min: 8, max: 30 })
            .withMessage("Senha inválida, deve conter pelo menos 8 caracteres")
            .bail()
            .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/)
            .withMessage("Senha inválida, deve conter pelo menos 1 letra, 1 número e 1 caractere especial"),

    ],

    showByStatus: async (req, res) => {
        const autenticado = req.session.autenticado
        const result = await cadastroModel.findBySubscribe(autenticado.id)
        const isSubscribed = result.length > 0
        if (isSubscribed) {
            // console.log(result)
            const status = result[0].status_aprovacao
            return res.render('pages/cadastro-entregador', { erros: null, dados: null, autenticado, status })
        }

        res.render('pages/cadastro-entregador', { erros: null, dados: null, autenticado, status: null })
    },

    createShipper: async (req, res) => {
        const { cnh, foto_veiculo, foto_perfil } = req.files
        // console.log(cnh[0].buffer/* .toString('base64') */, foto_veiculo, foto_perfil)

        const autenticado = req.session.autenticado
        const erros = validationResult(req)
        if (!erros.isEmpty()) {
            return res.render('pages/cadastro-entregador', { erros: erros.mapped(), dados: req.body, autenticado, status: null })
        }

        const { id_usuario, descricao, raio_de_atuacao, tipo_veiculo, modelo_veiculo, placa } = req.body
        
        /* Atulizando tabela usuario */
        await cadastroModel.updateUser({ descricao_usuario: descricao, foto_de_perfil: foto_perfil[0].buffer }, id_usuario)
        
        /* Inserindo dados tabela detalhamento_entregador */
        const shipper = await cadastroModel.insertShipper({ id_usuario, raio_de_atuacao, cnh_entregador: cnh[0].buffer })

        /* Inserindo dados tabela veiculos */
        await cadastroModel.insertVehicle({ id_entregador: shipper.insertId, tipo_veiculo, modelo_veiculo, placa, foto_veiculo: foto_veiculo[0].buffer })

        res.redirect('/verificar-autenticacao')
    },

    regrasValidacaoCadastroEntregador: [
        body("tipo_veiculo")
            .notEmpty()
            .withMessage("Tipo de Veículo inválido"),

        body("modelo_veiculo")
            .isLength({ min: 2, max: 45 })
            .withMessage("Modelo de Veículo inválido"),

        body("placa")
            .isLength({ min: 8, max: 8 })
            .withMessage("Placa inválida")
            .custom(async (value) => {
                const placa = await cadastroModel.findByPlaca(value)
                if (placa.length > 0) {
                    throw new Error('Placa já utilizada');
                }
                return true;
            }),
        
        body("raio_de_atuacao")
            .isFloat({ min: 1 })
            .withMessage("Deve conter apenas números, que sejam maiores que 0"),

        body("descricao")
            .isLength({ min: 10, max: 120 })
            .withMessage("Deve conter de 10 até 120 caracteres")
    ],

    redirectByType: async (req, res) => {
        const autenticado = req.session.autenticado

        if (autenticado.tipo == 1) {
            res.redirect("/cliente/solicitar-entrega");
        } else if (autenticado.tipo == 2) {
            const result = await cadastroModel.findByApproved(autenticado.id)
            const isApproved = result.length > 0

            if (isApproved) {
                res.redirect("/entregador/entregas-solicitadas");
            } else {
                res.redirect("/cadastro-entregador");
            }

        } else if (autenticado.tipo == 3) {
            res.redirect("/admin");
        }
    }
};


module.exports = TarefasControl;

