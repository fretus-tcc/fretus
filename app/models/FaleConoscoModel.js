var pool = require("../../config/connection-factory")

const FaleconoscoModel = {
    createFaleconosco: async (data) => {
        try {
            await pool.query(
                'INSERT INTO FaleConosco ( `nome_usuario`, `email_usuario`, `tipo_usuario`, `cpf_usuario`, `assunto`, `mensagem` ) VALUES ( ? , ? , ? , ? , ? , ? ) ', [data.nome, data.email, data.tipo, data.cpf, data.assunto, data.mensagem]
            );

        } catch (error) {
            console.log(error)
            throw error;


        }
    },
    findByUserId: async (userId) => {
        try {
            const [result] = await pool.query('SELECT * FROM FaleConosco WHERE `id_solicitacao` = ?', [userId]);
            return result; 
        } catch (error) {
            throw new Error(`Erro ao buscar o ID ${userId}: ${error.message}`);
        }
    },
    


};


module.exports = FaleconoscoModel;