// Criação de usúario no Back-end 
const tarefasModel = require("../models/cadastroModel");


const TarefasControl = {

    Criarussuario: async (req, res) => {
        try {

            const resultados = await tarefasModel.create(req.body)

        } catch (error) {
            return error;
        }
    },

}

module.exports = TarefasControl;

