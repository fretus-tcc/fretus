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

  getMessages: async () => {
    const [rows] = await pool.query('SELECT u.nome_usuario, m.message FROM chat m JOIN usuario u ON m.user_id = u.id_usuario ORDER BY m.created_at ASC');
    return rows;
  },

  createMessage: async (userId, message) => {
    if (!userId || !message) {
      throw new Error('User ID and message are required');
    }
    await pool.query('INSERT INTO chat (user_id, message, tipo_mensagem) VALUES (?, ?, 1)', [userId, message]);
  },

};

module.exports = ChatModel;
