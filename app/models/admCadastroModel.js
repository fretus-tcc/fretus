const pool = require('../../config/connection-factory')

const admCadastroModel = {
    //Pegando usuario da tabela 
    findByType: async (type) => {
        try {
            const [result] = await pool.query('SELECT `id_usuario`, `nome_usuario`, `email_usuario`, `cpf_usuario`,`tipo_usuario` FROM usuario WHERE `tipo_usuario` = ?', [type])
            return result
        } catch (error) {
            return error
        }
    },
    findByUserId: async (userId) => {
        try {
            const [result] = await pool.query('SELECT * FROM usuario WHERE `id_usuario` = ? ', [userId]);
            return result;
        } catch (error) {
            return error;
        }
    },
    //atualizando usuário da tabela 
    updateUser: async (data, id) => {
        try {
            await pool.query('UPDATE usuario SET ? WHERE id_usuario = ?', [data, id])
        } catch (error) {
            return error
        }
    },
    //excluindo usuário da tabela 
    findByTypeDelete: async (id) => {
        try {
            await pool.query('DELETE FROM usuario WHERE id_usuario = ?', [id])
        } catch (error) {
            return error
        }
    },

    // Paginação 

    findPage: async (pagina, total) => {
        try {
            const [linhas] = await pool.query('SELECT * FROM tipo_usuario WHERE status_usuario = 1 limit ?, ?', [pagina, total])
            return linhas;
        } catch (error) {
            return error;
        }
    },

    totalReg: async () => {
        try {
            const [linhas] = await pool.query('SELECT count(*) total FROM tipo_usuario  WHERE status_usuario = 1')
            return linhas;
        } catch (error) {
            return error;
        }
    },


}

module.exports = admCadastroModel