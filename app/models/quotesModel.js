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
    
    findById: async (id) => {
        try {
            const [result] = await pool.query('SELECT * FROM duvidas WHERE id_duvida = ?', [id])
            return result
        } catch (error) {
            return error
        }
    },

    findBySlug: async (slug) => {
        try {
            const [result] = await pool.query('SELECT * FROM duvidas WHERE slug_duvida = ?', [slug])
            return result
        } catch (error) {
            return error
        }
    },

    create: async (data) => {
        try {
            await pool.query('INSERT INTO duvidas SET ?', [data])
        } catch (error) {
            return error
        }
    },

    update: async (data, id) => {
        try {
            await pool.query('UPDATE duvidas SET ? WHERE id_duvida = ?', [data, id])
        } catch (error) {
            return error
        }
    },

    delete: async (id) => {
        try {
            await pool.query('DELETE FROM duvidas WHERE id_duvida = ?', [id])
        } catch (error) {
            return error
        }
    },

    repeatedTitle: async (title, id) => {
        try {
            const [result] = await pool.query(`SELECT * FROM duvidas WHERE titulo_duvida = ? ${id ? 'AND id_duvida != ?' : ''}`, [title, id])
            return result.length
        } catch (error) {
            return error
        }
    },
}

module.exports = quotesModel