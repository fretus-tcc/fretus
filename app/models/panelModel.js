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