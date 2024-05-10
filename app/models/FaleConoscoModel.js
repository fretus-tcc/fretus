var pool = require("../../config/connection-factory")

const FaleconoscoModel = {
    createFaleconosco: async (data) => {
        try {
            await pool.query(
                'INSERT INTO FaleConosco ( `nome_usuario`, `email_usuario`, `Identificador_usuario`, `cpf_usuario`, `assunto`, `mensagem` ) VALUES ( ? , ? , ? , ? , ? , ? ) ', [data.nome, data.email, data.identificador, data.cpf, data.assunto, data.mensagem]
            );

        } catch (error) {
            throw error;
        }
    },
    findByUserId: async (userId) => {
        try {
            const [result] = await pool.query('SELECT * FROM FaleConosco WHERE `id_assunto` = ? ', [userId]);
            return result;
        } catch (error) {
            return error;
        }
    },
};


module.exports = FaleconoscoModel;