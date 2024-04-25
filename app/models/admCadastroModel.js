const pool = require('../../config/connection-factory')

const admCadastroModel = {

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