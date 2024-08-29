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
        const [rows] = await pool.query('SELECT u.username, m.message FROM chat m JOIN id_usuario u ON m.user_id = u.id_usuario ORDER BY m.created_at ASC');
        return rows;
      },
      createMessage: async (userId, message) => {
        if (!userId || !message) {
          throw new Error('User ID and message are required');
        }
        await pool.query('INSERT INTO chat (user_id, message) VALUES (?, ?)', [userId, message]);
      },

      addFriend: async (userId, friendIdentifier) => {
        const [friend] = await pool.query('SELECT id FROM id_usuario WHERE id = ?', [friendIdentifier]);
        if (friend.length === 0) {
          throw new Error('Friend not found');
        }
        await pool.query('INSERT INTO friends (user_id, friend_id) VALUES (?, ?)', [userId, friend[0].id]);
      },

      getFriends: async (userId) => {
        const [friends] = await pool.query(`SELECT u.id, u.username FROM friends f JOIN id_usuario u ON f.friend_id = u.id_usuario WHERE f.user_id = ?`, 
          [userId]
        );
        return friends;
      }


};

module.exports = ChatModel;
