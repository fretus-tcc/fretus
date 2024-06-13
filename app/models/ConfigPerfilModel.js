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

    findShipper: async (id) => {
        try {
            /* const [linhas] = await pool.query(
                'SELECT u.id_usuario, u.nome_usuario, u.email_usuario, u.telefone_usuario, u.descricao_usuario, e.raio_de_atuacao, e.disponivel_inicio, e.disponivel_final, v.tipo_veiculo, v.modelo_veiculo , v.placa ' +
                'FROM usuario AS u ' +
                'INNER JOIN detalhamento_entregador AS e ' +
                'ON u.id_usuario = e.id_usuario ' +
                'INNER JOIN veiculos AS v ' +
                'ON e.id_entregador = v.id_entregador ' +
                'WHERE u.id_usuario = ?', [id]) */
            const [linhas] = await pool.query(
                'SELECT * ' +
                'FROM usuario AS u ' +
                'INNER JOIN detalhamento_entregador AS e ' +
                'ON u.id_usuario = e.id_usuario ' +
                'INNER JOIN veiculos AS v ' +
                'ON e.id_entregador = v.id_entregador ' +
                'WHERE u.id_usuario = ?', [id])
            return linhas;
        } catch (error) {
            return error;
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