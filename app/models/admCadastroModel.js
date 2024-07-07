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
    findByUserIdD: async (userIdd) => {
        try {
            const [result] = await pool.query('SELECT * FROM usuario WHERE `id_usuario` = ? ', [userIdd]);
            return result;
        } catch (error) {
            return error;
        }
    },
    findShipper: async (id) => {
        try {
            const [result] = await pool.query(
                'SELECT e.id_usuario, e.raio_de_atuacao, e.status_aprovacao, e.cnh_entregador, v.tipo_veiculo, v.placa, v.modelo_veiculo, v.foto_veiculo ' +
                'FROM detalhamento_entregador AS e ' +
                'INNER JOIN veiculos AS v ' +
                'ON e.id_entregador = v.id_entregador ' +
                'WHERE e.id_usuario = ?', [id]);
            return result;
        } catch (error) {
            return error;
        }
    },
    updateShipper: async (data, id) => {
        try {
            await pool.query('UPDATE detalhamento_entregador SET ? WHERE id_usuario = ?', [data, id])
        } catch (error) {
            console.log(error)
            return error
        }
    },
    findEmailById: async (id) => {
        try {
            const [linhas] = await pool.query('SELECT email_usuario FROM usuario WHERE id_usuario = ?', [id])
            return linhas
        } catch (error) {
            console.log(error)
            return error
        }
    },
    //atualizando usuário da tabela 
    updateUser: async (data, id) => {
        try {
            await pool.query('UPDATE usuario SET ? WHERE id_usuario = ?', [data, id])
        } catch (error) {
            console.log(error)
            return error
        }
    },
    //excluindo usuário da tabela 
    findByTypeDelete: async (id) => {
        try {
            await pool.query('DELETE FROM usuario WHERE id_usuario = ?', [id])
        } catch (error) {
            console.log(error)
            return error
        }
    },

    // Paginação 

    findPage: async (pagina, total, type) => {
        try {
            /* const [linhas] = await pool.query('SELECT * FROM usuario WHERE status_usuario = 1 AND tipo_usuario = ? limit ?, ?', [type, pagina, total]) */
            const [linhas] = await pool.query('SELECT * FROM usuario WHERE tipo_usuario = ? limit ?, ?', [type, pagina, total])
            return linhas;
        } catch (error) {
            return error;
        }
    },

    totalReg: async (type) => {
        try {
            /* const [linhas] = await pool.query('SELECT count(*) total FROM usuario WHERE status_usuario = 1 AND tipo_usuario = ?', [type]) */
            const [linhas] = await pool.query('SELECT count(*) total FROM usuario WHERE tipo_usuario = ?', [type])
            return linhas;
        } catch (error) {
            return error;
        }
    },



}

module.exports = admCadastroModel