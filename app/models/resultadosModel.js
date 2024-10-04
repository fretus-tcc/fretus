const pool = require('../../config/connection-factory')

const resultadosModel = {

    findPedidoPaginate: async (id_entregador, pagina, total) => {
        try {
            const [result] = await pool.query(
                'SELECT p.*, u.nome_usuario, c.porcentagem_cupom FROM pedidos AS p ' + 
                'INNER JOIN usuario AS u ' +
                'ON u.id_usuario = p.id_cliente ' +
                'LEFT JOIN cupons AS c ' +
                'ON p.id_cupom = c.id_cupom ' +
                'WHERE p.id_entregador = ? ' + 
                'ORDER BY data_solicitacao DESC ' + 
                'LIMIT ?, ?', [id_entregador, pagina, total])
            return result
        } catch (error) {
            console.log(error)
            return error
        }
    },

    totalPedidoReg: async (id_entregador) => {
        try {
            const [result] = await pool.query(
                'SELECT count(*) total FROM pedidos AS p ' + 
                'INNER JOIN usuario AS u ' +
                'ON u.id_usuario = p.id_cliente ' +
                'LEFT JOIN cupons AS c ' +
                'ON p.id_cupom = c.id_cupom ' +
                'WHERE p.id_entregador = ?', [id_entregador])
            return result
        } catch (error) {
            console.log(error)
            return error
        }
    },

    findEntregadorById: async (id) => {
        try {
            const [result] = await pool.query('SELECT * FROM detalhamento_entregador WHERE id_usuario = ?', [id])
            return result
        } catch (error) {
            console.log(error)
            return error
        }
    },

    countEntregasRealizadas: async (id) => {
        try {
            const [result] = await pool.query('SELECT count(*) AS total FROM pedidos WHERE id_entregador = ? AND status_finalizacao = "finalizado"', [id])
            return result[0].total
        } catch (error) {
            console.log(error)
            return error
        }
    },

}

module.exports = resultadosModel