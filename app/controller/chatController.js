const ChatModel = require('../models/chatModel');

const ChatController = {
  
    listUsersId: async (req, res) => {
        const { id } = req.params
        try {
            const result = await ChatModel.findByUserId(id)

            const tipo = req.session.autenticado.tipo 

            res.render('pages/cliente-entregador/chat', { result: result[0], id, dados: null, listaErros: null, type:tipo, autenticado: req.session.autenticado})


        } catch (error) {

            res.json({ error })
        }
    },


};

module.exports = ChatController;
