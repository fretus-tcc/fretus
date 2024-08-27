const pool = require("../../config/connection-factory");

const ChatModel = {

    findByUserId: async (userId) => {
        try {
            const [result] = await pool.query('SELECT * FROM usuario WHERE `id_usuario` = ? ', [userId]);
            return result;
        } catch (error) {
            return error;
        }
    },


};

module.exports = ChatModel;
