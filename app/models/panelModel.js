const pool = require('../../config/connection-factory')

const panelModel = {

    findEntregas: async (id_entregador) => {
        try {
            const [result] = await pool.query(
                'SELECT p.*, u.nome_usuario, u.foto_de_perfil, c.id_conversa FROM pedidos AS p ' + 
                'INNER JOIN pagamentos AS pg ' +
                'ON p.id_pedido = pg.id_pedido ' +
                'INNER JOIN usuario AS u ' +
                'ON u.id_usuario = p.id_cliente ' +
                'INNER JOIN conversas AS c ' +
                'ON p.id_entregador = c.id_entregador ' +
                'WHERE pg.estado_pagamento = "aprovado" AND p.id_entregador = ?', [id_entregador])
            return result
        } catch (error) {
            console.log(error)
            return error
        }
    },

    findStatus: async (id_entregador) => {
        try {
            const [result] = await pool.query(
                'SELECT s.id_pedido, MAX(s.status_entrega) AS status_entrega FROM pedidos AS p ' + 
                'INNER JOIN status_entrega AS s ' +
                'ON p.id_pedido = s.id_pedido ' +
                'WHERE p.id_entregador = ? ' +
                'GROUP BY s.id_pedido', [id_entregador])
            return result
        } catch (error) {
            console.log(error)
            return error
        }
    },

    findStatusById: async (id_pedido) => {
        try {
            const [result] = await pool.query(
                'SELECT s.id_pedido, MAX(s.status_entrega) AS status_entrega FROM pedidos AS p ' + 
                'INNER JOIN status_entrega AS s ' +
                'ON p.id_pedido = s.id_pedido ' +
                'WHERE p.id_pedido = ? ' +
                'GROUP BY s.id_pedido', [id_pedido])
            return result
        } catch (error) {
            console.log(error)
            return error
        }
    },

    findAllStatusById: async (id_pedido) => {
        try {
            const [result] = await pool.query(
                'SELECT s.*, p.id_entregador FROM pedidos AS p ' + 
                'INNER JOIN status_entrega AS s ' +
                'ON p.id_pedido = s.id_pedido ' +
                'WHERE p.id_pedido = ?', [id_pedido])
            return result
        } catch (error) {
            console.log(error)
            return error
        }
    },

    insert: async (data) => {
        try {
            await pool.query('INSERT INTO status_entrega SET ?', [data])
        } catch (error) {
            console.log(error)
            return error
        }
    },

    // findEntregadorById: async (id) => {
    //     try {
    //         const [result] = await pool.query('SELECT * FROM detalhamento_entregador WHERE id_usuario = ?', [id])
    //         return result
    //     } catch (error) {
    //         console.log(error)
    //         return error
    //     }
    // },

}

module.exports = panelModel