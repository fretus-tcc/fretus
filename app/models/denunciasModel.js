const pool = require('../../config/connection-factory')

const denunciasModel = {

    findById: async (id_denuncia) => {
        try {
            const [result] = await pool.query(
                'SELECT d.*, u1.nome_usuario AS denunciador, u2.nome_usuario AS denunciado FROM denuncias AS d '+ 
                'INNER JOIN usuario AS u1 '+ 
                'ON u1.id_usuario = id_denunciador ' +
                'INNER JOIN usuario AS u2 '+ 
                'ON u2.id_usuario = id_denunciado '+ 
                'WHERE d.id_denuncia = ?', [id_denuncia]
            )
            return result
        } catch (error) {
            console.log(error)
            return error
        }
    },

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