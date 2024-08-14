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

    findAllById: async (id) => {
        try {
            const [result] = await pool.query(
                'SELECT * FROM usuario AS u ' +
	            'INNER JOIN favoritados AS f ' +
	            'ON u.id_usuario = f.id_favoritado ' +
	            'WHERE f.id_favoritou = ?', [id])
            return result
        } catch (error) {
            return error
        }
    },

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