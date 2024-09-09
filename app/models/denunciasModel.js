const pool = require('../../config/connection-factory')

const denunciasModel = {

    findByIdPedido: async (id_pedido) => {
        try {
            const [result] = await pool.query('SELECT * FROM avaliacoes WHERE id_pedido = ?', [id_pedido])
            return result
        } catch (error) {
            console.log(error)
            return error
        }
    },

    insert: async (data) => {
        try {
            await pool.query('INSERT INTO denuncias SET ?', [data])
        } catch (error) {
            console.log(error)
            return error
        }
    }
}

module.exports = denunciasModel