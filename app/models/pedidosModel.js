const pool = require('../../config/connection-factory')

const pedidosModel = {
    
    /* findPendingByShipper: async (id, vehicle) => {
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
    }, */

    findById: async (id) => {
        try {
            const [result] = await pool.query('SELECT * FROM pedidos WHERE id_pedido = ?', [id])
            return result
        } catch (error) {
            return error
        }
    },

    findShipperAccept: async (id) => {
        try {
            const [result] = await pool.query(
                'SELECT * FROM pedidos as p ' +
                'LEFT JOIN usuario as u ' +
                'ON p.id_entregador = u.id_usuario ' +
                'LEFT JOIN pagamentos as pg ' +
                'ON p.id_pedido = pg.id_pedido ' +
                'WHERE p.id_pedido = ?', [id])
            return result
        } catch (error) {
            console.log(error)
            return error
        }
    },

    findPaginate: async (id, vehicle, pagina, total) => {
        try {
            const [result] = await pool.query(
                'SELECT p.* FROM pedidos as p ' +
                'LEFT JOIN entregadores_pedidos AS ep ' +
                'ON p.id_pedido = ep.id_pedido AND ep.id_entregador = ? ' +
                'WHERE ep.status_resposta IS NULL AND p.veiculo_pedido = ? ' +
                'ORDER BY p.data_solicitacao DESC ' +
                'LIMIT ?, ?', [id, vehicle, pagina, total])
            return result
        } catch (error) {
            console.log(error)
            return error
        }
    },

    totalReg: async (id, vehicle) => {
        try {
            const [result] = await pool.query(
                'SELECT count(*) total FROM pedidos as p ' +
                'LEFT JOIN entregadores_pedidos AS ep ' +
                'ON p.id_pedido = ep.id_pedido AND ep.id_entregador = ? ' +
                'WHERE ep.status_resposta IS NULL AND p.veiculo_pedido = ? ' +
                'ORDER BY p.data_solicitacao DESC', [id, vehicle])
            return result
        } catch (error) {
            return error
        }
    },

    findByUser: async (id, pagina, total) => {
        try {
            const [result] = await pool.query(
                'SELECT p.*, pg.estado_pagamento FROM usuario AS u ' +
                'INNER JOIN pedidos AS p ' +
                'ON u.id_usuario = p.id_cliente ' +
                'LEFT JOIN pagamentos AS pg ' +
                'ON p.id_pedido = pg.id_pedido ' +
                'WHERE id_usuario = ? ' +
                'ORDER BY p.data_solicitacao DESC ' +
                'LIMIT ?, ?' , [id, pagina, total])
            return result
        } catch (error) {
            return error
        }
    },

    findByShipperAccept: async (id_usuario, id_pedido) => {
        try {
            const [result] = await pool.query(
                'SELECT * FROM usuario AS u ' +
                'INNER JOIN entregadores_pedidos AS ep ' +
                'ON u.id_usuario = ep.id_entregador ' +
                'INNER JOIN detalhamento_entregador AS e ' +
                'ON u.id_usuario = e.id_usuario ' +
                'INNER JOIN veiculos AS v ' +
                'ON e.id_entregador = v.id_entregador ' +
                'LEFT JOIN favoritados AS f ' +
                'ON u.id_usuario = f.id_favoritado AND f.id_favoritou = ? ' +
                'WHERE ep.id_pedido = ? AND ep.status_resposta = "ACEITO"', [id_usuario, id_pedido])
            return result
        } catch (error) {
            return error
        }
    },

    totalRegByUser: async (id) => {
        try {
            const [result] = await pool.query(
                'SELECT count(*) total FROM usuario AS u ' +
                'INNER JOIN pedidos AS p ' +
                'ON u.id_usuario = p.id_cliente ' +
                'WHERE id_usuario = ? ' +
                'ORDER BY p.data_solicitacao DESC', [id])
            return result
        } catch (error) {
            return error
        }
    },

    insert: async (data) => {
        try {
            const result = await pool.query('INSERT INTO pedidos SET ?', [data])
            return result
        } catch (error) {
            console.log(error)
            return error
        }
    },

    insertShipper: async (data) => {
        try {
            await pool.query('INSERT INTO entregadores_pedidos SET ?', [data])
        } catch (error) {
            console.log(error)
            return error
        }
    },

    insertShipperAccepted: async (id_entregador, id_pedido) => {
        try {
            await pool.query('UPDATE pedidos SET id_entregador = ? WHERE id_pedido = ?', [id_entregador, id_pedido])
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