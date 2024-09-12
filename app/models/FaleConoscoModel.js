var pool = require("../../config/connection-factory")

/* const tipoMap = {
    "Cliente": "1",
    "Entregador": "2"
}; */

const FaleconoscoModel = {
    createFaleconosco: async (data) => {
        try {
          // Mapear o tipo para o valor numérico
          /* const tipoNumerico = tipoMap[data.tipo] || data.tipo; */
      
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
    // Paginação 

   /*  findPage: async (pagina, total) => {
        try {
            const [linhas] = await pool.query('SELECT * FROM tipo_quartos WHERE status_quarto = 1 limit ?, ?', [pagina, total])
            return linhas;
        } catch (error) {
            return error;
        }
    },

    totalReg: async () => {
        try {
            const [linhas] = await pool.query('SELECT count(*) total FROM tipo_quartos  WHERE status_quarto = 1')
            return linhas;
        } catch (error) {
            return error;
        }
    }, */
    


};


module.exports = FaleconoscoModel;