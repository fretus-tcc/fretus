const denunciasModel = require('../models/denunciasModel')
const pedidosModel = require('../models/pedidosModel')
const { notifyMessages} = require('../util/Funcao')
const { body, param, validationResult } = require('express-validator')

const denunciasController = {
    validation: [
        param('id_denunciado')
            .isInt()
            .withMessage('Tente novamente')
            .custom(async (value, { req }) => {
                const result = await denunciasModel.findByIdDenunciado(value)
                if (result.length != 0) {
                    throw new Error('Tente novamente')
                }

                return true
            }),

        body('motivo_denuncia')
            .notEmpty()
            .withMessage('Motivo da denúncia não preenchido')
            .bail()
            .isIn(['Assédio ou Comportamento inadequado', 'Problemas de Qualidade do Serviço', 'Violar Regras do Site', 'Suspeita de Fraude', 'Outros'])
            .withMessage('Motivo da denúncia inválido'),

        body('outros_motivos')
            .optional()
            .notEmpty()
            .withMessage('Motivo não preenchido')
            .bail()
            .isLength({ max: 75 })
            .withMessage('Motivo deve conter até 75 caracteres')
            .bail()
            .custom((value, { req }) => {
                if (req.body.motivo_denuncia != 'Outros') {
                    throw new Error('Motivo inválido')
                }

                return true
            }),

        body('data_denuncia')
            .notEmpty()
            .withMessage('Data não preenchida')
            .bail()
            .custom((value, { req }) => {
                if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
                    throw new Error('Data inválida')
                }

                const todayDate = new Date();
                const todayString = todayDate.toISOString().split('T')[0];
                if (value > todayString) {
                    throw new Error('Data deve ser no passado')                   
                }

                return true
            }),

        body('descricao_denuncia')
            .notEmpty()
            .withMessage('Descrição não preenchida')
            .bail()
            .isLength({ max: 400 })
            .withMessage('Descrição deve conter até 400 caracteres'),
    ],

    createDenuncia: async (req, res) => {
        const { id_denunciado } = req.params
        const { motivo_denuncia, outros_motivos, data_denuncia, descricao_denuncia } = req.body

        const erros = validationResult(req)
        if (!erros.isEmpty()) {
            return res.json({ erros: erros.array(), success: false })
        }

        try {
            // const [pedido] = await pedidosModel.findById(id_pedido)

            const data = {
                // id_pedido,
                id_denunciador: req.session.autenticado.id,
                id_denunciado,
                motivo_denuncia,
                outros_motivos: motivo_denuncia != 'Outros' ? null : outros_motivos,
                data_denuncia,
                descricao_denuncia
            }
            await denunciasModel.insert(data)
            res.json({ erros: false, success: true })

        } catch (error) {
            console.log(error)
            return error
        }
        
    },

    // ADMIN

    listPaginate: async (req, res, estado_denuncia) => {
        // paginação

        let pagina = req.query.pagina == undefined ? 1 : Number(req.query.pagina);
        let result = null
        let regPagina = 2
        let inicio = parseInt(pagina - 1) * regPagina
        let totReg = await denunciasModel.totalReg(estado_denuncia);
        let totPaginas = Math.ceil(totReg[0].total / regPagina);
        
        // validacao parametro pagina
        if (pagina <= 0 || isNaN(pagina)) {
            return res.redirect(`admin/denuncias/${estado_denuncia}`)
        } else if (pagina > totPaginas && totPaginas > 0) {
            return res.redirect(`/admin/denuncias/${estado_denuncia}?pagina=${totPaginas}`)
        }

        result = await denunciasModel.findPaginate(inicio, regPagina, estado_denuncia);
        let paginador = totReg[0].total <= regPagina 
            ? null 
            : { "pagina_atual": pagina, "total_reg": totReg[0].total, "total_paginas": totPaginas };

        const msgs = notifyMessages(req, res)

        res.render('pages/adm/Denuncia/DenunciaPendente', { result, paginador, msgs, estado_denuncia })
    },

    showDenuncia: async (req, res) => {
        const { id_denuncia } = req.params
        try {
            const [denuncia] = await denunciasModel.findById(id_denuncia)
            // console.log(denuncia)

            const msgs = notifyMessages(req, res)

            res.render('pages/adm/Denuncia/detalhes-denuncia', { denuncia, msgs })
        } catch (error) {
            console.log(error)
            return error
        }
    },

    resolverDenuncia: async (req, res) => {
        const { id_denuncia } = req.params
        const { action } = req.body
        try {

            const [denuncia] = await denunciasModel.findById(id_denuncia)

            if (action != 'ignorar' && action != 'suspender') {
                req.flash('error', 'Algo deu errado ; Tente novamente')
                return res.redirect('back')
            }

            await denunciasModel.update({
                estado_denuncia: action == 'ignorar' ? 'resolvida' : 'suspensa'
            }, id_denuncia)
            
            if (action == 'suspender') {
                await denunciasModel.suspenderUsuario(denuncia.id_denunciado)
            }

            req.flash('success', 'Denúncia resolvida ; Denúncia resolvida com sucesso')

            res.redirect('back')
        } catch (error) {
            console.log(error)
            return error
        }
    },

}

module.exports = denunciasController