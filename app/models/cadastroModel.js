// Criação de usúario no Banco de Dados 
var pool = require("../../config/connection-factory");

const tarefasModel = {
    create: async (data) => {
        try {
            await pool.query(
                'INSERT INTO usuario ( `nome_usuario` ,`cpf_usuario`,`email_usuario`, `senha_usuario`, `tipo_usuario` ) VALUES ( ? , ? , ?, ?, ? ) ',
                [data.nome, data.cpf, data.email, data.senha, data.type]
            );
            
        } catch (error) {
            throw error; 
        }
    },
    findByEmail: async (data) => {
        try {
            const [linhas] = await pool.query('SELECT * FROM usuario WHERE email_usuario  = ? ',  [ data ])
            
            return linhas;
        } catch (error) {
            return error;
        }
    },
    findByCpf: async (data) => {
        try {
            const [linhas] = await pool.query('SELECT * FROM usuario WHERE cpf_usuario  = ? ',  [ data ])
            
            return linhas;
        } catch (error) {
            return error;
        }
    }
};


module.exports = tarefasModel;