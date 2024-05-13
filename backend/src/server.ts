import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // Adjust this to match your frontend URL
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket: Socket) => {
  console.log('A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });

  // Receive message along with user details
  socket.on('chat message', ({ user, text }) => {
    // Emit message along with user details to all clients
    io.emit('chat message', { user, text });
  });
});

const PORT = 3000; // Make sure the port doesn't conflict with your frontend
httpServer.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});