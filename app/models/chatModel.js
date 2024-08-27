const pool = require("../../config/connection-factory");

const ChatModel = {
    getMessagesByChatId: async (chatId) => {
        try {
            const [rows] = await pool.query(
                'SELECT * FROM CHAT WHERE id_conversa = ? ORDER BY data ASC',
                [chatId]
            );
            return rows;
        } catch (error) {
            console.error('Erro ao buscar mensagens:', error);
            throw error;
        }
    },

    sendMessage: async (messageData) => {
        const { conteudo_mensagem, tipo_mensagem, id_usuario, id_usuario_destinatario, id_usuario_rementente } = messageData;
        try {
            await pool.query(
                'INSERT INTO CHAT (conteudo_mensagem, tipo_mensagem, data, id_usuario, id_usuario_destinatario, id_usuario_rementente) VALUES (?, ?, NOW(), ?, ?, ?)',
                [conteudo_mensagem, tipo_mensagem, id_usuario, id_usuario_destinatario, id_usuario_rementente]
            );
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            throw error;
        }
    }
};

module.exports = ChatModel;
