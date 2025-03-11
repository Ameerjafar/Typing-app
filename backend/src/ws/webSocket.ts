import WebSocket, { WebSocketServer } from 'ws';
import express from 'express';
const app = express();
const httpServer = app.listen(8080, () => {
  console.log('HTTP server running on http://localhost:8080');
});

const wss = new WebSocketServer({ server: httpServer });
const rooms = new Map();
wss.on('connection', (ws: WebSocket) => {
  ws.on('message', (data: string) => {
    try {
      const parsedData = JSON.parse(data);

      if (parsedData.type === 'CreateRoom') {
        const roomId = parsedData.roomId;
        if (!rooms.has(roomId)) {
          rooms.set(roomId, {
            players: new Set(),
            text: parsedData.text,
            admin: true
          });
          rooms.get(roomId)!['players'].add({
            ws: ws,
            name: parsedData.name,
            index: 0
          });

          ws.send(JSON.stringify({ type: 'success', message: `Room '${roomId}' created.` }));
        } else {
          ws.send(JSON.stringify({ type: 'error', message: `Room '${roomId}' already exists.` }));
        }
      }


      if (parsedData.type === 'JoinRoom') {
        const roomId = parsedData.roomId;
        if (!rooms.has(roomId)) {
          ws.send(JSON.stringify({ type: 'error', message: `Room '${roomId}' does not exist.` }));
          return;
        }
        rooms.get(roomId)!['players'].add({
          ws: ws,
          name: parsedData.name,
          index: 0
        })
        rooms.get(roomId)!['players'].forEach((player: any) => {
          if(player.ws.readyState === WebSocket.OPEN) {
            player.ws.send(JSON.stringify({
              type: 'playerJoined',
              message: `${parsedData.name} has joined the room`,
              playerName: parsedData.name
            }))
          }
        })
        ws.send(JSON.stringify({ type: 'success', message: `Joined room '${roomId}'` }));
      }

      if (parsedData.type === 'message') {
        const room = parsedData.roomId;
        if (room && rooms.has(room)) {
          rooms.get(room)!['players'].forEach((client: any) => {
            if (client.ws.readyState === WebSocket.OPEN) {
              client.ws.send(JSON.stringify({ type: 'message', message: parsedData.message }));
            }
          });
        } else {
          ws.send(JSON.stringify({ type: 'error', message: `You are not in a valid room.` }));
        }
      }
      if(parsedData.type === 'IndexUpdate') {
        const roomId = parsedData.roomId;
        if(rooms.has(roomId)) {
          rooms.get(roomId)!['players'].forEach((player: any) => {
            if(player.ws.readyState === WebSocket.OPEN) {
              player.ws.send(JSON.stringify({
                type: 'IndexUpdate',
                roomId: roomId,
                index: parsedData.index
              }))
            }
          })
        }
      }
      if (parsedData.type === 'gameStart') {
        const room = parsedData.roomId;
        if (rooms.has(room)) {
            rooms.get(room)!['players'].forEach((player: any) => {
                if (player.ws.readyState === WebSocket.OPEN) {
                    player.ws.send(JSON.stringify({
                        type: 'gameStart',
                        text: rooms.get(room)!['text']
                    }));  
        }   });
        }
    }
    } catch (err) {
      console.error('Error processing message:', err);
    }
  });
  ws.on('close', () => {
    rooms.forEach((roomData, roomId) => {
        const players = roomData.players;
        players.forEach((player: any) => {
            if (player.ws === ws) {
                players.delete(player);
                players.forEach((remainingPlayer: any) => {
                    if (remainingPlayer.ws.readyState === WebSocket.OPEN) {
                        remainingPlayer.ws.send(JSON.stringify({
                            type: 'playerLeft',
                            message: `${player.name} has left the room`,
                            playerName: player.name
                        }));
                    }
                });
                if (players.size === 0) {
                    rooms.delete(roomId);
                }
            }
        });
    });
    
    console.log('Client disconnected');
});
  ws.on('error', (err) => {
    console.error('WebSocket error:', err);
  });
  ws.send('Hello');
});
