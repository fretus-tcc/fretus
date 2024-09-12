var pool = require("../../config/connection-factory")


const FaleconoscoModel = {
    createFaleconosco: async (data) => {
        try {
            const tipoMap = {
                'Cliente': 1,
                'Entregador': 2
            };
            const tipoNumerico = tipoMap[data.tipo];
    
            await pool.query(
                'INSERT INTO FaleConosco (nome_usuario, email_usuario, tipo_usuario, cpf_usuario, assunto, mensagem) VALUES (?, ?, ?, ?, ?, ?)', 
                [data.nome, data.email, tipoNumerico, data.cpf, data.assunto, data.mensagem]
            );
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    findByMensg: async () => {
        try {
            const [result] = await pool.query('SELECT * FROM FaleConosco');
            return result;
        } catch (error) {
            throw new Error(`Erro: ${error.message}`, error);
        }
    },

    //Paginador 

    findPage: async (pagina, total) => {
        try {
            const [linhas] = await pool.query('SELECT * FROM FaleConosco ORDER BY id_solicitacao DESC LIMIT ?, ?', [pagina, total]);
            return linhas;
        } catch (error) {
            return error;
        }
    },

    totalReg: async () => {
        try {
            const [linhas] = await pool.query('SELECT count(*) as total FROM FaleConosco');
            return linhas;
        } catch (error) {
            return error;
        }
    },


};


module.exports = FaleconoscoModel;