const chatModel = require('../models/chatModel');

const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime')
const locale = require('dayjs/locale/pt-br') // Importa o locale pt-BR

// Extende dayjs com plugins
dayjs.extend(relativeTime)
dayjs.locale(locale) // Define o locale como pt-BR

const chatController = {

    getChat: async (req, res) => {
        const { id_conversa } = req.params
        const { tipo, autenticado: username, id: userId } = req.session.autenticado

        try {
            
            // selecionando conversas do usuario
            const conversas = await chatModel.findConversasByUser(tipo, userId)

            // formatando datas da ultima mensagem da conversa
            conversas.forEach(conversa => {
                if (conversa.data_envio != null) {
                    conversa.data_envio = dayjs(conversa.data_envio).fromNow()
                }
            })
            
            // verifica se conversa nao esta selecionada
            if (id_conversa == undefined) {
                return res.render('pages/cliente-entregador/chat', {
                    autenticado: req.session.autenticado, type: tipo, conversas, id_conversa: null, id_destinatario: null, mensagens: [],
                    username, userId
                })
            }

            const id_destinatario = await chatModel.findDestinatarioConversa(tipo, id_conversa)
            const mensagens = await chatModel.findMensagensById(id_conversa)

            res.render('pages/cliente-entregador/chat', { 
                autenticado: req.session.autenticado, type: tipo, conversas, id_conversa, id_destinatario, mensagens,
                username, userId
            })

        } catch (error) {
            console.log(error)
            res.json({ error })
        }
    },

    /* postMessage: async (req, res) => {
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
    } */

}

module.exports = chatController
