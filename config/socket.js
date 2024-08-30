const ModelChat = require('../app/models/chatModel');

let io;

module.exports = {
  init: (server, socketIO) => {
    io = socketIO;
    io.on('connection', (socket) => {
      console.log('a user connected');

      socket.on('disconnect', () => {
        console.log('user disconnected');
      });

      socket.on('chat message', async (msg) => {
        const { userId, username, message } = msg;
        try {
          await ModelChat.createMessage(userId, message);
          io.emit('chat message', { username, message });
        } catch (error) {
          console.error('Error saving message to database:', error);
        }
      });

     /*  socket.on('add person', async (data) => {
        const { userId, friendIdentifier } = data;
        try {
          await ModelChat.addFriend(userId, friendIdentifier);
          socket.emit('friend added', { success: true });
        } catch (error) {
          socket.emit('friend added', { success: false, message: error.message });
        }
      }); */
    });
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }
    return io;
  }
};
