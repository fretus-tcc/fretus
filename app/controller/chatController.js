const chatModel = require('../models/chatModel');

const chatController = {

    getChat: async (req, res) => {
        const { id_conversa } = req.params
        const { tipo, autenticado: username, id: userId } = req.session.autenticado

        try {
            
            const messages = await chatModel.getMessages()
            
            // selecionando conversas do usuario
            const conversas = await chatModel.findConversasById(tipo, userId)
            
            // verifica se conversa nao esta selecionada
            if (id_conversa == undefined) {
                return res.render('pages/cliente-entregador/chat', { 
                    autenticado: req.session.autenticado, type: tipo, conversas, id_conversa: null,
                    messages, username, userId
                })
            }

            const mensagens = await chatModel.findMensagensById(id_conversa)
            // console.log(conversas)

            res.render('pages/cliente-entregador/chat', { 
                autenticado: req.session.autenticado, type: tipo, conversas, id_conversa, mensagens,
                messages, username, userId
            })

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

            await chatModel.createMessage(userId, message);
            io.emit('chat message', { username, message, userId });

            res.redirect('/chat');
        } catch (error) {
            res.status(500).send('Erro ao enviar mensagem.');
        }
    }

};

module.exports = chatController;
