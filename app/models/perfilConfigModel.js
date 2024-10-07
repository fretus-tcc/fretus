const pool = require('../../config/connection-factory');

const PerfilModel = {

    findUserByType: async (id) => {
        try {
            const [result] = await pool.query(
                'SELECT *, u.id_usuario AS usuario_id FROM usuario AS u ' + 
                'LEFT JOIN detalhamento_entregador AS e ' +
                'ON u.id_usuario = e.id_usuario ' +
                'LEFT JOIN veiculos AS v ' +
                'ON v.id_entregador = e.id_entregador ' +
                'WHERE u.id_usuario = ?', [id]);
            return result;
        } catch (error) {
            console.log(error)
            return error;
        }
    },
    
    countPedidosById: async (id) => {
        try {
            const [result] = await pool.query('SELECT count(*) AS total FROM pedidos WHERE id_cliente = ?', [id]);
            return result[0].total;
        } catch (error) {
            console.log(error)
            return error;
        }
    },

    countClientesById: async (id) => {
        try {
            const [result] = await pool.query('SELECT count(*) AS total FROM favoritados WHERE id_favoritado = ?', [id]);
            return result[0].total;
        } catch (error) {
            console.log(error)
            return error;
        }
    },

    countEntregasById: async (id) => {
        try {
            const [result] = await pool.query('SELECT count(*) AS total FROM pedidos WHERE id_entregador = ? AND status_finalizacao = "finalizado"', [id]);
            return result[0].total;
        } catch (error) {
            console.log(error)
            return error;
        }
    },

    // atualizando usuário da tabela 
    updateUser: async (data, id) => {
        try {
            await pool.query('UPDATE usuario SET ? WHERE id_usuario = ?', [data, id])
        } catch (error) {
            console.log(error)
            return error
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

    updateVehicle: async (data, id) => {
        try {
            await pool.query('UPDATE veiculos SET ? WHERE id_entregador = ?', [data, id])
        } catch (error) {
            console.log(error)
            return error
        }
    },

    updateViewsPerfil: async (id) => {
        try {
            await pool.query('UPDATE detalhamento_entregador SET qtn_visualizacoes_perfil = qtn_visualizacoes_perfil + 1 WHERE id_usuario = ?', [id])
        } catch (error) {
            console.log(error)
            return error
        }
    },

}

// module.exports = ConfigModel
module.exports = PerfilModel