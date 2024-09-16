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

    findById: async (id_cupom) => {
        try {
            const [result] = await pool.query('SELECT * FROM cupons WHERE id_cupom = ? AND status_cupom = 1', [id_cupom])
            return result
        } catch (error) {
            console.log(error)
            return error
        }
    },

    findByCodigo: async (codigo, status = 1) => {
        try {
            const [result] = await pool.query(
                `SELECT * FROM cupons WHERE codigo_cupom = ? ${status == 1 ? 'AND status_cupom = ?' : ''}`, [codigo, status]
            )
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

    findAllPayment: async (id) => {
        try {
            const [result] = await pool.query(
                'SELECT c.*, uc.estado_cupom FROM cupons AS c ' +
                'INNER JOIN usuario_cupons AS uc ' +
                'ON c.id_cupom = uc.id_cupom ' +
                'WHERE uc.id_usuario = ? AND uc.estado_cupom = "ativo" AND c.status_cupom = 1', [id]
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
            console.log(error)
            return error
        }
    },

    updateActive: async (data, id_usuario, id_cupom) => {
        try {
            await pool.query('UPDATE usuario_cupons SET ? WHERE id_usuario = ? AND id_cupom = ?', [data, id_usuario, id_cupom])
        } catch (error) {
            return error
        }
    },

    // ADMIN
    findPaginate: async (pagina, total) => {
        try {
            const [result] = await pool.query('SELECT * FROM cupons WHERE tipo_cupom = 1 ORDER BY id_cupom DESC LIMIT ?, ?', [pagina, total])
            return result
        } catch (error) {
            console.log(error)
            return error
        }
    },

    totalReg: async () => {
        try {
            const [result] = await pool.query('SELECT count(*) total FROM cupons WHERE tipo_cupom = 1')
            return result
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