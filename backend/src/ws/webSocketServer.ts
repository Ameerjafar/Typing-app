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
    console.log("Received message:", parseData.type);
    
    try {
      if (parseData.type === 'createRoom') {
        if (await userManager.getRoom(parseData.roomId)) {
          ws.send(JSON.stringify({
            error: "This Room already exists"
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
        const users = await userManager.getAllUsers(roomId);
        
        if (users) {
            // Notify existing users about the new user
            users.forEach((user) => {
                if (user.ws.readyState === WebSocket.OPEN) {
                    user.ws.send(JSON.stringify({
                        type: 'joinedRoom',
                        roomId: roomId,
                        userId: parseData.userId,
                        userName: parseData.userName,
                        message: `${parseData.userName} has joined the room`,
                        users: users.map(u => ({ userId: u.userId, userName: u.userName, progress: u.progress })) // Send current user list
                    }));
                }
            });
        }
      }

      if (parseData.type === 'leftRoom') {
        const roomId = parseData.roomId;
        const response = await userManager.removeUser(roomId, parseData.userId);

        if (!response) {
          ws.send(JSON.stringify({
            type: "leftRoomFailed",
            message: "you are not removed from the room please try again"
          }));
        } else {
          const users = await userManager.getAllUsers(roomId);
          if (users) {
            users.forEach((user) => {
              if (user.ws.readyState === WebSocket.OPEN) {
                user.ws.send(JSON.stringify({
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

      if (parseData.type === 'updateProgress') {
        const { roomId, userId, progress } = parseData;
        const updated = await userManager.updateProgress(roomId, userId, progress);
        
        if (updated) {
            const users = await userManager.getAllUsers(roomId);
            if (users) {
                users.forEach((user) => {
                    if (user.ws.readyState === WebSocket.OPEN) {
                        user.ws.send(JSON.stringify({
                            type: 'progressUpdate',
                            userId: userId,
                            progress: progress
                        }));
                    }
                });
            }
        }
      }

      if (parseData.type === 'startGame') {
        const { roomId, text } = parseData;
        const users = await userManager.getAllUsers(roomId);
        if (users) {
            users.forEach((user) => {
                if (user.ws.readyState === WebSocket.OPEN) {
                    user.ws.send(JSON.stringify({
                        type: 'gameStarted',
                        text: text
                    }));
                }
            });
        }
      }

      if (parseData.type === 'gameFinished') {
        const { roomId, userId, wpm, accuracy } = parseData;
        const updated = await userManager.updateStats(roomId, userId, wpm, accuracy);

        if (updated) {
            const users = await userManager.getAllUsers(roomId);
            if (users) {
                // Check if all users have finished
                const allFinished = users.every(u => u.finished);

                if (allFinished) {
                    // Calculate winner
                    const sortedUsers = [...users].sort((a, b) => {
                        if (b.wpm !== a.wpm) {
                            return (b.wpm || 0) - (a.wpm || 0);
                        }
                        return (b.accuracy || 0) - (a.accuracy || 0);
                    });

                    users.forEach((user) => {
                        if (user.ws.readyState === WebSocket.OPEN) {
                            user.ws.send(JSON.stringify({
                                type: 'gameEnded',
                                leaderboard: sortedUsers.map(u => ({
                                    userId: u.userId,
                                    userName: u.userName,
                                    wpm: u.wpm,
                                    accuracy: u.accuracy
                                }))
                            }));
                        }
                    });
                }
            }
        }
      }

    } catch (error) {
      console.log(error);
    }
  });

  ws.send(JSON.stringify({ type: 'connected', message: 'Hello! Message From Server!!' }));
});