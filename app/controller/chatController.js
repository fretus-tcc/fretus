const ChatModel = require('../models/chatModel');

const ChatController = {
  
    listUsersId: async (req, res) => {
        const { id } = req.params
        try {
            const result = await ChatModel.findByUserId(id)
            const tipo = req.session.autenticado.tipo 
            const messages = await ChatModel.getMessages();
            const username = req.session.autenticado.autenticado
            const userId = req.session.autenticado.id

            res.render('pages/cliente-entregador/chat', { result: result[0], id, dados: null, listaErros: null, type:tipo, autenticado: req.session.autenticado, messages, username, userId})

        } catch (error) {

            res.json({ error })
        }
    },

    postMessage: async (req, res) => {
        try {
          const message = req.body.message;
          const io = require('../../config/socket').getIO();
          const username = req.session.autenticado.autenticado
          const userId = req.session.autenticado.id
          
          await ChatModel.createMessage(userId, message);
          io.emit('chat message', { username, message, userId });
    
          res.redirect('/chat');
        } catch (error) {
          res.status(500).send('Erro ao enviar mensagem.');
        }
      }



};

module.exports = ChatController;
