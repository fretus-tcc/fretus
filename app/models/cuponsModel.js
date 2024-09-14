const pool = require('../../config/connection-factory')

const cuponsModel = {
    
    findCompartilhamento: async (id) => {
        try {
            const [result] = await pool.query('SELECT * FROM cupons WHERE id_criador = ?', [id])
            return result
        } catch (error) {
            return error
        }
    },

    findByCodigo: async (codigo) => {
        try {
            const [result] = await pool.query('SELECT * FROM cupons WHERE codigo_cupom = ? AND status_cupom = 1', [codigo])
            return result
        } catch (error) {
            console.log(error)
            return error
        }
    },

    findAllActive: async (id) => {
        try {
            const [result] = await pool.query(
                'SELECT c.*, uc.estado_cupom FROM cupons AS c ' +
                'INNER JOIN usuario_cupons AS uc ' +
                'ON c.id_cupom = uc.id_cupom ' +
                'WHERE uc.id_usuario = ? AND c.status_cupom = 1', [id]
            )
            return result
        } catch (error) {
            console.log(error)
            return error
        }
    },

    findActiveById: async (id_usuario, id_cupom) => {
        try {
            const [result] = await pool.query('SELECT * FROM usuario_cupons WHERE id_usuario = ? AND id_cupom = ?', [id_usuario, id_cupom])
            return result
        } catch (error) {
            console.log(error)
            return error
        }
    },

    insert: async (data) => {
        try {
            await pool.query('INSERT INTO cupons SET ?', [data])
        } catch (error) {
            return error
        }
    },

    insertActive: async (data) => {
        try {
            await pool.query('INSERT INTO usuario_cupons SET ?', [data])
        } catch (error) {
            return error
        }
    },

    update: async (data, id) => {
        try {
            await pool.query('UPDATE cupons SET ? WHERE id_cupom = ?', [data, id])
        } catch (error) {
            return error
        }
    },

    // delete: async (id) => {
    //     try {
    //         await pool.query('DELETE FROM duvidas WHERE id_duvida = ?', [id])
    //     } catch (error) {
    //         return error
    //     }
    // },
}

module.exports = cuponsModel