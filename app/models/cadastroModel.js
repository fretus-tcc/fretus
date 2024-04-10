// Criação de usúario no Banco de Dados 
var pool = require("../../config/connection-factory");

const tarefasModel = {
    create: async (data, tipoUsuario) => {
        try {
            await pool.query(
                'INSERT INTO usuario ( `nome_usuario` ,`cpf_usuario`,`email_usuario`, `senha_usuario`, `tipo_usuario` ) VALUES ( ? , ? , ?, ?, ? ) ',
                [data.nome, data.cpf, data.email, data.senha, tipoUsuario]
            );
            
        } catch (error) {
            throw error; 
        }
    },
};


module.exports = tarefasModel;