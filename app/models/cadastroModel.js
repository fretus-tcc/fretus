// Criação de usúario no Banco de Dados 
var pool = require("../../config/connection-factory");

const tarefasModel = {
    create: async (data) => {
        try {
            const [linhas] = await pool.query('INSERT INTO usuario ( `nome_usuario` ,`email_usuario`, `senha_usuario` ) VALUES ( ? , ? , ? ) ',
             [ data.nome, data.email, data.senha ])  
            return linhas;

        } catch (error) {
            return error;
        }
    },
  
};

module.exports = tarefasModel;