const pool = require('../../config/connection-factory')

const denunciasModel = {

    findByIdDenunciado: async (id_denunciado) => {
        try {
            const [result] = await pool.query('SELECT * FROM denuncias WHERE id_denunciado = ?', [id_denunciado])
            return result
        } catch (error) {
            console.log(error)
            return error
        }
    },
    findPaginate: async (pagina, total) => {
        try {
            const [result] = await pool.query('SELECT * FROM denuncias limit ?, ?', [pagina, total])
            return result
        } catch (error) {
            console.log(error)
            return error
        }
    },
    totalReg: async () => {
        try {
            const [result] = await pool.query('SELECT count (*) total FROM denuncias')
            return result
        } catch (error) {
            console.log(error)
            return error
        }
    },
    insert: async (data) => {
        try {
            await pool.query('INSERT INTO denuncias SET ?', [data])
        } catch (error) {
            console.log(error)
            return error
        }
    }
}

module.exports = denunciasModel