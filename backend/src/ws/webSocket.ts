import WebSocket, { WebSocketServer } from 'ws';
import express from 'express';

const app = express();
const httpServer = app.listen(8080, () => {
  console.log('HTTP server running on http://localhost:8080');
});

interface CustomWebSocket extends WebSocket {
  room?: string;
}

const wss = new WebSocketServer({ server: httpServer });
const rooms = new Map<string, Set<CustomWebSocket>>();

wss.on('connection', (ws: CustomWebSocket) => {
  ws.on('message', (data: string) => {
    try {
      const parsedData = JSON.parse(data);

      if (parsedData.type === 'CreateRoom') {
        const roomId = parsedData.room;
        if (!rooms.has(roomId)) {
          rooms.set(roomId, new Set());
          console.log(rooms);
          rooms.get(roomId)!.add(ws);
          ws.room = roomId;
          ws.send(JSON.stringify({ type: 'success', message: `Room '${roomId}' created.` }));
        } else {
          ws.send(JSON.stringify({ type: 'error', message: `Room '${roomId}' already exists.` }));
        }
      }

      if (parsedData.type === 'JoinRoom') {
        const room = parsedData.room;
        if (!rooms.has(room)) {
          ws.send(JSON.stringify({ type: 'error', message: `Room '${room}' does not exist.` }));
          return;
        }
        rooms.get(room)!.add(ws);
        ws.room = room;
        ws.send(JSON.stringify({ type: 'success', message: `Joined room '${room}'` }));
      }

      if (parsedData.type === 'message') {
        const room = ws.room;
        if (room && rooms.has(room)) {
          rooms.get(room)!.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ type: 'message', message: parsedData.message }));
            }
          });
        } else {
          ws.send(JSON.stringify({ type: 'error', message: `You are not in a valid room.` }));
        }
      }
    } catch (err) {
      console.error('Error processing message:', err);
    }
  });
  ws.on('close', () => {
    const room = ws.room;
    if (room && rooms.has(room)) {
      rooms.get(room)!.delete(ws);
      if (rooms.get(room)!.size === 0) {
        rooms.delete(room); 
      }
    }
    console.log('Client disconnected');
  });
  ws.on('error', (err) => {
    console.error('WebSocket error:', err);
  });
  ws.send('Hello');
});
