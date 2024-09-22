const perfilConfigModel = require('../models/perfilConfigModel')
const cadastroModel = require('../models/cadastroModel')
const favoritadosModel = require('../models/favoritadosModel')
const avaliacoesModel = require('../models/avaliacoesModel')
const { validaCPF, notifyMessages } = require('../util/Funcao')
const { body, validationResult } = require("express-validator")

const ConfigPerfilController = {

    // Editar - Mostrar Campos
    showProfile: async (req, res) => {
        const { id } = req.params
        const { id: id_autenticado } = req.session.autenticado
        
        try {
            const [result] = await perfilConfigModel.findUserByType(id)
            const isClient = result.tipo_usuario == '1' ? true : false
            
            const data = await ConfigPerfilController.fetchData(isClient, id)
            
            const hasPermission = id == id_autenticado

            const msgs = notifyMessages(req, res)
            
            res.render('pages/cliente-entregador/perfil', {
                autenticado: req.session.autenticado, result, hasPermission, isClient, dados: null, erros: null, msgs, data
            })
        } catch (error) {
            res.json({ error })
            console.log(error)
        }
    },

    showConfig: async (req, res, view, isClient) => {
        const { id } = req.session.autenticado
        try {
            const result = await perfilConfigModel.findUserByType(id)

            const msgs = notifyMessages(req, res)

            res.render(view, { result: result[0], dados: null, erros: null, isClient, autenticado: req.session.autenticado, msgs })
        } catch (error) {
            res.json({ error })
            console.log(error)
        }
    },

    fetchData: async (isClient, id) => {
        const data = {}
        if (isClient) {
            data.favoritados = await favoritadosModel.findAllById(id)
            data.solicitadas = await perfilConfigModel.countPedidosById(id)
        } else {
            data.avaliacoes = await avaliacoesModel.findAllByEntregador(id)
            data.clientes = await perfilConfigModel.countClientesById(id)
            data.entregas = 0
        }
        
        return data
    },

    // Editar - Atualizar User
    updateUser: async (req, res, view, redirect) => {
        const { id } = req.params

        // formatando data nascimento
        const { data_usuario } = req.body
        if (data_usuario) {
            const date = new Date(data_usuario)
            req.body.data_usuario = date.toISOString().split('T')[0]
        }

        // verificando autorizao alterar perfil
        const hasPermission = id == req.session.autenticado.id
        if (!hasPermission) {
            return res.render('pages/restrito', { autenticado: req.session.autenticado })
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const [fields] = await perfilConfigModel.findUserByType(id)
            const isClient = fields.tipo_usuario == '1' ? true : false
            const data = await ConfigPerfilController.fetchData(isClient, id)

            return res.render(view, {
                autenticado: req.session.autenticado,
                result: fields,
                hasPermission,
                isClient,
                dados: req.body,
                erros: errors.mapped(),
                msgs: [],
                data
            })
        }

        // verifica se o formulario é de alterar foto de perfil, ou nao
        if (req.file) {
            await perfilConfigModel.updateUser({ foto_de_perfil: req.file.buffer }, id)
        } else {
            await perfilConfigModel.updateUser(req.body, id)
        }
        
        req.flash('success', `Alteração feita ; Usuário alterado com sucesso`)
        res.redirect(redirect)

    },

    updateShipper: async (req, res, view, redirect) => {
        const { id } = req.params
        
        // verificando autorizao alterar perfil
        const hasPermission = id == req.session.autenticado.id
        if (!hasPermission) {
            return res.render('pages/restrito', { autenticado: req.session.autenticado })
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const fields = await perfilConfigModel.findUserByType(id, 2)
            const data = await ConfigPerfilController.fetchData(false, id)

            return res.render(view, {
                result: fields[0],
                dados: req.body,
                erros: errors.mapped(),
                autenticado: req.session.autenticado,
                hasPermission,
                isClient: false,
                msgs: [],
                data
            })
        }
        
        await perfilConfigModel.updateShipper(req.body, id)
        req.flash('success', `Alteração feita ; Usuário alterado com sucesso`)
        res.redirect(redirect)

    },

    updateVehicle: async (req, res, view, redirect) => {
        const { id } = req.params
        
        // verificando autorizao alterar perfil
        const hasPermission = id == req.session.autenticado.id
        if (!hasPermission) {
            return res.render('pages/restrito', { autenticado: req.session.autenticado })
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const fields = await perfilConfigModel.findUserByType(id, 2)
            const data = await ConfigPerfilController.fetchData(false, id)

            return res.render(view, {
                result: fields[0],
                dados: req.body,
                erros: errors.mapped(),
                autenticado: req.session.autenticado,
                hasPermission,
                isClient: false,
                msgs: [],
                data
            })
        }
        
        await perfilConfigModel.updateVehicle(req.body, req.body.id_entregador)
        req.flash('success', `Alteração feita ; Usuário alterado com sucesso`)
        res.redirect(redirect)

    },

    regrasValidacaoPerfil: [
        body("nome_usuario")
            .optional()
            .isLength({ min: 3, max: 45 })
            .withMessage("Nome inválido, deve conter de 3 até 45 caracteres"),

        body("email_usuario")
            .optional()
            .isEmail()
            .withMessage("Email inválido")
            .custom(async (value, { req }) => {
                const { id } = req.params
                const email = await cadastroModel.findByEmail(value, id)
                if (email.length > 0) {
                    throw new Error('Email já utilizado');
                }
                return true;

            }),
        
        body("telefone_usuario")
            .optional()
            .isLength({ min: 15 })
            .withMessage('Telefone incompleto')
            .bail()
            .isMobilePhone()
            .withMessage('Telefone inválido')
            .bail()
            .custom(async (value, { req }) => {
                const { id } = req.params
                const tel = await cadastroModel.findByTel(value, id)
                // console.log(tel)
                if (tel.length > 0) {
                    throw new Error('Telefone já utilizado');
                }
                return true;
            }),

        body("descricao_usuario")
            .optional()
            .isLength({ min: 10, max: 120 })
            .withMessage("Descrição deve conter de 10 até 120 caracteres"),

        body("cpf_usuario")
            .optional()
            .isLength({ min: 14, max: 14 })
            .withMessage("Cpf inválido")
            .bail()
            .custom(async (value, { req }) => {
                if (validaCPF(value)) {
                    const { id } = req.params
                    const cpf = await cadastroModel.findByCpf(value, id)
                    if (cpf.length > 0) {
                        throw new Error('Cpf já utilizado');
                    }
                    return true;
                } else {
                    throw new Error('Cpf inválido');
                }
            }),

        body("tipo_veiculo")
            .optional()
            .notEmpty()
            .withMessage("Tipo de Veículo inválido"),

        body("modelo_veiculo")
            .optional()
            .isLength({ min: 2, max: 45 })
            .withMessage("Modelo de Veículo inválido, deve conter de 2 até 45 caracteres"),
        
        body("placa")
            .optional()
            .isLength({ min: 8, max: 8 })
            .withMessage("Placa inválida")
            .custom(async (value, { req }) => {
                const { id_entregador } = req.body
                const placa = await cadastroModel.findByPlaca(value, id_entregador)
                if (placa.length > 0) {
                    throw new Error('Placa já utilizada');
                }
                return true;
            }),

        body("data_usuario")
            .optional()
            .isLength({ min: 10 })
            .withMessage('Data inválida')
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
            }),

        body("raio_de_atuacao")
            .optional()
            .isFloat({ min: 1 })
            .withMessage("Raio de Atuação deve conter apenas números, que sejam maiores que 0"),
    ],

}

module.exports = ConfigPerfilController;