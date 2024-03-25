const pool = require('../../config/connection-factory')

const quotesModel = {
    findTitle: async () => {
        try {
            const [result] = await pool.query('SELECT titulo_duvida, slug_duvida FROM duvidas')
            return result
        } catch (error) {
            return error
        }
    },

    findAll: async () => {
        try {
            const [result] = await pool.query('SELECT * FROM duvidas ORDER BY data_duvida DESC')
            return result
        } catch (error) {
            return error
        }
    },
}

module.exports = quotesModel