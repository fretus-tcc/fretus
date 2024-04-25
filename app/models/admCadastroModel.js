const pool = require('../../config/connection-factory')

const admCadastroModel = {

    findByType: async (type) => {
        try {
            const [result] = await pool.query('SELECT `nome_usuario`, `email_usuario`, `cpf_usuario` FROM usuario WHERE `tipo_usuario` = ?', [type])
            return result
        } catch (error) {
            return error
        }
    }
}

module.exports = admCadastroModel