const pool = require('../../config/connection-factory')

const avaliacoesModel = {

    findByIdPedido: async (id_pedido) => {
        try {
            const [result] = await pool.query('SELECT * FROM avaliacoes WHERE id_pedido = ?', [id_pedido])
            return result
        } catch (error) {
            console.log(error)
            return error
        }
    },

    findAllByEntregador: async (id_entregador) => {
        try {
            const [result] = await pool.query(
                'SELECT a.*, u.nome_usuario FROM avaliacoes AS a ' + 
                'INNER JOIN usuario AS u ' + 
                'ON u.id_usuario = a.id_avaliador ' + 
                'WHERE a.id_entregador = ?', [id_entregador])
            return result
        } catch (error) {
            console.log(error)
            return error
        }
    },

    insert: async (data) => {
        try {
            await pool.query('INSERT INTO avaliacoes SET ?', [data])
        } catch (error) {
            console.log(error)
            return error
        }
    }
}

module.exports = avaliacoesModel