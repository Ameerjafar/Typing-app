import { Server, Socket } from 'socket.io';
import { createServer } from 'http';

const WS_PORT = 3001;

const wsHttpServer = createServer();
const io = new Server(wsHttpServer, {
  cors: {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket: Socket) => {
  console.log("hello");
  console.log(`WebSocket connected: ${socket.id}`);

  socket.on('message', (data) => {
    console.log(`Message received: ${data}`);
    io.emit('message', data); 
  });

  socket.on('disconnect', () => {
    console.log(`WebSocket disconnected: ${socket.id}`);
  });
});

wsHttpServer.listen(WS_PORT, () => {
  console.log(`WebSocket server is running on ws://localhost:${WS_PORT}`);
});

export default io;
