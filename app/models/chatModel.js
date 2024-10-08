const pool = require("../../config/connection-factory");

const ChatModel = {

    /* findByUserId: async (userId) => {
        try {
            const [result] = await pool.query('SELECT * FROM usuario WHERE `id_usuario` = ? ', [userId]);
            return result;
        } catch (error) {
            return error;
        }
    }, */

    /* getMessages: async () => {
        const [rows] = await pool.query('SELECT u.nome_usuario, m.message FROM chat m JOIN usuario u ON m.user_id = u.id_usuario ORDER BY m.created_at ASC');
        return rows;
    },

    createMessage: async (userId, message) => {
        if (!userId || !message) {
            throw new Error('User ID and message are required');
        }
        await pool.query('INSERT INTO chat (user_id, message, tipo_mensagem) VALUES (?, ?, 1)', [userId, message]);
    }, */

    insertConversa: async (data) => {
        try {
            await pool.query('INSERT INTO conversas SET ?', [data])
        } catch (error) {
            return error
        }
    },

    findConversasByUser: async (tipo, id) => {
        try {
            const [result] = await pool.query(
                'SELECT u.nome_usuario, u.id_usuario, u.foto_de_perfil, c.*, m.mensagem, m.data_envio, d.* FROM conversas AS c ' +
                'INNER JOIN usuario AS u ' +
                'ON IF(? = 2, c.id_cliente, c.id_entregador) = u.id_usuario ' +
                'LEFT JOIN ( ' +
                '	SELECT id_conversa, MAX(data_envio) AS last_message_time FROM mensagens ' +
                '	GROUP BY id_conversa ' +
                ') lm ON c.id_conversa = lm.id_conversa ' +
                'LEFT JOIN mensagens m ON m.id_conversa = c.id_conversa AND m.data_envio = lm.last_message_time ' +
                'LEFT JOIN denuncias AS d ' +
                'ON IF(? = 2, c.id_cliente, c.id_entregador) = d.id_denunciado  ' +
                'WHERE c.id_cliente = ? OR c.id_entregador = ? ' +
                'ORDER BY m.data_envio DESC', [tipo, tipo, id, id])
            return result
        } catch (error) {
            return error
        }
    },

    findDestinatarioConversa: async (tipo, id_conversa) => {
        try {
            const [result] = await pool.query(
                'SELECT IF(? = 2, id_cliente, id_entregador) AS id_destinatario ' +
                'FROM conversas WHERE id_conversa = ?', [tipo, id_conversa])
            return result[0].id_destinatario
        } catch (error) {
            return error
        }
    },

    findMensagensById: async (id_conversa) => {
        try {
            const [result] = await pool.query('SELECT * FROM mensagens WHERE id_conversa = ?', [id_conversa])
            return result
        } catch (error) {
            return error
        }
    },

    insertMensagem: async (data) => {
        try {
            await pool.query('INSERT INTO mensagens SET ?', [data])
        } catch (error) {
            return error
        }
    },
};

module.exports = ChatModel;
