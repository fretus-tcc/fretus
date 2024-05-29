const pool = require('../../config/connection-factory')

const PerfilModel = {
    
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


}

const ConfigModel = {

    //excluindo usuário da tabela 
    findByTypeDelete: async (id) => {
        try {
            await pool.query('DELETE FROM usuario WHERE id_usuario = ?', [id])
        } catch (error) {
            return error
        }
    }, 



}

module.exports = ConfigModel
module.exports = PerfilModel