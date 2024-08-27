const ChatModel = require('../models/chatModel');

const ChatController = {
    getChatMessages: async (req, res) => {
        const { chatId } = req.params;
        try {
            const messages = await ChatModel.getMessagesByChatId(chatId);
            res.json(messages);
        } catch (error) {
            console.error('Erro ao obter mensagens do chat:', error);
            res.status(500).send('Erro ao obter mensagens');
        }
    },

    sendMessage: async (req, res) => {
        const { message, chatId, userId, recipientId } = req.body;
        const messageData = {
            conteudo_mensagem: message,
            tipo_mensagem: 'text',
            id_usuario: userId,
            id_usuario_destinatario: recipientId,
            id_usuario_rementente: userId
        };
        try {
            await ChatModel.sendMessage(messageData);
            res.status(201).send('Mensagem enviada com sucesso');
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            res.status(500).send('Erro ao enviar mensagem');
        }
    }
};

module.exports = ChatController;
