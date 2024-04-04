// Criação de usúario no Back-end 
const tarefasModel = require("../models/cadastroModel");
const { body, validationResult } = require("express-validator");

const TarefasControl = {
    CriarUsuario: async (req, res, tipoUsuario) => {
        try {
            let resultados;
            if (tipoUsuario === 'cliente') {
                resultados = await tarefasModel.create(req.body, 1); 
                res.render('pages/cliente/solicitar-entrega')
            } else if (tipoUsuario === 'entregador') {
                resultados = await tarefasModel.create(req.body, 2); 
                res.render('pages/cadastro-entregador')
            }
            
        } catch (error) {
            return error;
        }
    },
};


module.exports = TarefasControl;

