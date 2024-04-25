const pool = require('../../config/connection-factory')

const admCadastroModel = {
    /* findTitle: async () => {
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
    }, */

    findByType: async (type) => {
        try {
            const [result] = await pool.query('SELECT `id_usuario`, `nome_usuario` FROM usuario WHERE `tipo_usuario` = ?', [type])
            return result
        } catch (error) {
            return error
        }
    }
}

module.exports = admCadastroModel