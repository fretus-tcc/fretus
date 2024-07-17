const pool = require('../../config/connection-factory')

const pedidosModel = {
    
    /* findById: async (id) => {
        try {
            const [result] = await pool.query('SELECT * FROM duvidas WHERE id_duvida = ?', [id])
            return result
        } catch (error) {
            return error
        }
    }, */

    findPendingByShipper: async (id, vehicle) => {
        try {
            const [result] = await pool.query(
                'SELECT * FROM pedidos as p ' +
                'LEFT JOIN entregadores_pedidos AS ep ' +
                'ON p.id_pedido = ep.id_pedido AND ep.id_entregador = ? ' +
                'WHERE ep.status_resposta IS NULL AND p.veiculo_pedido = ? ' +
                'ORDER BY p.data_solicitacao DESC', [id, vehicle])
            return result
        } catch (error) {
            return error
        }
    },

    insert: async (data) => {
        try {
            await pool.query('INSERT INTO pedidos SET ?', [data])
        } catch (error) {
            console.log(error)
            return error
        }
    },

    /* update: async (data, id) => {
        try {
            await pool.query('UPDATE duvidas SET ? WHERE id_duvida = ?', [data, id])
        } catch (error) {
            return error
        }
    },

    delete: async (id) => {
        try {
            await pool.query('DELETE FROM duvidas WHERE id_duvida = ?', [id])
        } catch (error) {
            return error
        }
    }, */

}

module.exports = pedidosModel