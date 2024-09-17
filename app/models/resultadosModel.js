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

}

module.exports = resultadosModel