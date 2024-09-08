const pool = require('../../config/connection-factory')

const avaliacoesModel = {

    insert: async (data) => {
        try {
            await pool.query('INSERT INTO avaliacoes SET ?', [data])
        } catch (error) {
            console.log(error)
            return error
        }
    }
}

module.exports = avaliacoesModel