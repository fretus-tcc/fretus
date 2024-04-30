const pool = require('../../config/connection-factory')

const admCadastroModel = {
    //Pegando usuario da tabela 
    findByType: async (type) => {
        try {
            const [result] = await pool.query('SELECT `id_usuario`, `nome_usuario`, `email_usuario`, `cpf_usuario`,`tipo_usuario` FROM usuario WHERE `tipo_usuario` = ?', [type])
            return result
        } catch (error) {
            return error
        }
    } , 
    //excluindo usuário da tabela 
     findByTypeDelete: async (id) => {
        try {
            await pool.query('DELETE FROM usuario WHERE id_usuario = ?', [id])
        } catch (error) {
            return error
        }
    },  
    //Pegando da tabela e jogando nos detalhes 
   /*  findByDetalhe: async (detalhes) => {
        try {
            const [detalhe] = await pool.query('SELECT `id_usuario`, `nome_usuario`, `email_usuario`, `cpf_usuario`,`tipo_usuario` FROM usuario WHERE `tipo_usuario` = ?', [detalhes])
            return detalhe
        } catch (error) {
            return error
        }
    } ,  */
}

module.exports = admCadastroModel