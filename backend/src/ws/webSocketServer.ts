import express from 'express'
import { WebSocket, WebSocketServer } from 'ws'
import UserManager from './userManager'

const app = express()
const httpServer = app.listen(8080, () => {
  console.log("connected to port number 8080");
})

const wss = new WebSocketServer({ server: httpServer });
const userManager = new UserManager();

wss.on('connection', function connection(ws: WebSocket) {
  ws.on('error', console.error);

  ws.on('message', async function message(data: string) {
    const parseData = JSON.parse(data);
    console.log(parseData);
    try {
      if (parseData.type === 'createRoom') {
        
        if (await userManager.getRoom(parseData.roomId)) {
          ws.send(JSON.stringify({
            error: "This Room has already exist"
          }));
          return;
        }
        await userManager.addUser(parseData.roomId, parseData.userId, ws, parseData.userName, parseData.admin);
        ws.send(JSON.stringify({
          type: "roomCreated",
          message: `Room number ${parseData.roomId} has successfully created`
        }));
      }

      if (parseData.type === 'joinRoom') {
        const roomId = parseData.roomId;
        if (!await userManager.getRoom(roomId)) {
          ws.send(JSON.stringify({
            error: "Your Room does not exist"
          }));
          return;
        }

        await userManager.addUser(parseData.roomId, parseData.userId, ws, parseData.userName, "");
        const users: any = await userManager.getAllUsers(roomId);
        console.log("This is the webSocket connection", users.ws);
          users.ws.forEach((ws: WebSocket) => {
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({
                type: 'joinedRoom',
                roomId: roomId,
                userId: parseData.userId,
                userName: parseData.userName,
                message: `${parseData.userName} has joined the room`
              }));
            }
          });
        }

      if (parseData.type === 'leftRoom') {
        const roomId = parseData.roomId;
        const response = await userManager.removeUser(roomId, parseData.userId, ws);

        if (!response) {
          ws.send(JSON.stringify({
            type: "leftRoomFailed",
            message: "you are not removed from the room please try again"
          }));
        } else {
          const getAllUsers = await userManager.getAllUsers(roomId);
          if (getAllUsers && getAllUsers.ws) {
            getAllUsers.ws.forEach((ws: WebSocket) => {
              if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({
                  type: 'leftRoomSuccess',
                  roomId: roomId,
                  userId: parseData.userId,
                  userName: parseData.userName,
                  message: `${parseData.userName} has left the room`
                }));
              }
            });
          }
          ws.send(JSON.stringify({
            type: "leftRoomSuccess",
            message: "you have successfully left the room"
          }));
        }
      }
    } catch (error) {
      console.log(error);
    }
  });


  ws.send('Hello! Message From Server!!');
});