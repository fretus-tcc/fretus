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
   

};


module.exports = FaleconoscoModel;