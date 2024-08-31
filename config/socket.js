const chatModel = require('../app/models/chatModel')

let io
let chatUsers = []

module.exports = {
    init: (server, socketIO) => {
        io = socketIO;
        io.on('connection', (socket) => {
            // console.log('user connected')

            socket.on('disconnect', () => {
                // remove usuario quando se desconecta
                chatUsers = chatUsers.filter(user => user.socketId != socket.id)
                // console.log('user disconnected')
            })

            socket.on('connect new user', async (data) => {
                // adiciona usuario ao chat
                const { id_usuario } = data
                chatUsers.push({ socketId: socket.id, id_usuario })
            })

            socket.on('chat message', async (msg) => {
                const { id_conversa, id_usuario, id_destinatario, msg: mensagem } = msg
                try {
                    await chatModel.insertMensagem({ id_conversa, id_usuario, mensagem })
                    const socket_destinatario = chatUsers.find(user => user.id_usuario == id_destinatario)?.socketId

                    if (socket_destinatario) {
                        io.to(socket_destinatario).emit('receive message', { id_conversa, id_usuario, mensagem })
                    }
                    
                } catch (error) {
                    console.error('Error saving message to database:', error);
                }
            })

            /*  socket.on('add person', async (data) => {
               const { userId, friendIdentifier } = data;
               try {
                 await chatModel.addFriend(userId, friendIdentifier);
                 socket.emit('friend added', { success: true });
               } catch (error) {
                 socket.emit('friend added', { success: false, message: error.message });
               }
             }); */
        });
    },
    getIO: () => {
        if (!io) {
            throw new Error("Socket.io not initialized!")
        }
        return io
    }
};
