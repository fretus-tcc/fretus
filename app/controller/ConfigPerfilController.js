const ConfigPerfilModel = require('../models/ConfigPerfilModel')
const { body, validationResult } = require("express-validator");
const cadastroModel = require('../models/cadastroModel')
const { validaCPF, notifyMessages } = require('../util/Funcao')

const ConfigPerfilController = {

    // Editar - Mostrar Campos
    showProfile: async (req, res, isClient) => {
        const { id } = req.params
        
        try {
            /* const result = await ConfigPerfilModel.findByUserId(id) */
            const type = isClient ? 1 : 2
            const result = await ConfigPerfilModel.findUserByType(id, type)

            const hasPermission = id == req.session.autenticado.id

            const msgs = notifyMessages(req, res)
            
            res.render('pages/cliente-entregador/perfil', { result: result[0], dados: null, erros: null, autenticado: req.session.autenticado, hasPermission, isClient, msgs })
        } catch (error) {
            res.json({ error })
            console.log(error)
        }
    },

    showConfig: async (req, res, view, isClient) => {
        const { id } = req.session.autenticado
        try {
            const type = isClient ? 1 : 2
            const result = await ConfigPerfilModel.findUserByType(id, type)

            const msgs = notifyMessages(req, res)

            res.render(view, { result: result[0], dados: null, erros: null, isClient, autenticado: req.session.autenticado, msgs })
        } catch (error) {
            res.json({ error })
            console.log(error)
        }
    },

    // Editar - Atualizar User
    updateUser: async (req, res, view, redirect, isClient) => {
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
            const type = isClient ? 1 : 2
            const fields = await ConfigPerfilModel.findUserByType(id, type)

            return res.render(view, {
                result: fields[0],
                dados: req.body,
                erros: errors.mapped(),
                autenticado: req.session.autenticado,
                hasPermission,
                isClient,
                msgs: []
            })
        }

        // verifica se o formulario é de alterar foto de perfil, ou nao
        if (req.file) {
            await ConfigPerfilModel.updateUser({ foto_de_perfil: req.file.buffer }, id)
        } else {
            await ConfigPerfilModel.updateUser(req.body, id)
        }
        
        req.flash('success', `Alteração feita ; Usuário alterado com sucesso`)
        res.redirect(redirect)

        /* try {

            const data = {
                nome_usuario: req.body.nome,
                email_usuario: req.body.email,
                
            }
            await ConfigPerfilModel.updateUser(data, id)
            req.flash('info', 'Usuário atualizado')
            res.redirect(`/admin/cadastroAdm/editar/${id}`)

        } catch (error) {
            res.json({ error })
        } */

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
            const fields = await ConfigPerfilModel.findUserByType(id, 2)

            return res.render(view, {
                result: fields[0],
                dados: req.body,
                erros: errors.mapped(),
                autenticado: req.session.autenticado,
                hasPermission,
                isClient: false,
                msgs: []
            })
        }
        
        await ConfigPerfilModel.updateShipper(req.body, id)
        req.flash('success', `Alteração feita ; Usuário alterado com sucesso`)
        res.redirect(redirect)

        /* try {

            const data = {
                nome_usuario: req.body.nome,
                email_usuario: req.body.email,
                
            }
            await ConfigPerfilModel.updateUser(data, id)
            req.flash('info', 'Usuário atualizado')
            res.redirect(`/admin/cadastroAdm/editar/${id}`)

        } catch (error) {
            res.json({ error })
        } */

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
            const fields = await ConfigPerfilModel.findUserByType(id, 2)

            return res.render(view, {
                result: fields[0],
                dados: req.body,
                erros: errors.mapped(),
                autenticado: req.session.autenticado,
                hasPermission,
                isClient: false,
                msgs: []
            })
        }
        
        await ConfigPerfilModel.updateVehicle(req.body, req.body.id_entregador)
        req.flash('success', `Alteração feita ; Usuário alterado com sucesso`)
        res.redirect(redirect)

        /* try {

            const data = {
                nome_usuario: req.body.nome,
                email_usuario: req.body.email,
                
            }
            await ConfigPerfilModel.updateUser(data, id)
            req.flash('info', 'Usuário atualizado')
            res.redirect(`/admin/cadastroAdm/editar/${id}`)

        } catch (error) {
            res.json({ error })
        } */

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