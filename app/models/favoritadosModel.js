const pool = require('../../config/connection-factory')

const favoritadosModel = {
    findById: async (favoritou, favoritado) => {
        try {
            const [result] = await pool.query('SELECT * FROM favoritados WHERE id_favoritou = ? AND id_favoritado = ?', [favoritou, favoritado])
            return result
        } catch (error) {
            return error
        }
    },

    /* findAll: async () => {
        try {
            const [result] = await pool.query('SELECT titulo_duvida, slug_duvida FROM duvidas')
            return result
        } catch (error) {
            return error
        }
    }, */

    create: async (data) => {
        try {
            await pool.query('INSERT INTO favoritados SET ?', [data])
        } catch (error) {
            return error
        }
    },

    delete: async (favoritou, favoritado) => {
        try {
            await pool.query('DELETE FROM favoritados WHERE id_favoritou = ? AND id_favoritado = ?', [favoritou, favoritado])
        } catch (error) {
            return error
        }
    },

}

module.exports = favoritadosModel