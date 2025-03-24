import WebSocket, { WebSocketServer } from "ws";
import express from "express";
import { createClient } from "redis";
import dotenv from 'dotenv';
dotenv.config();
const app = express();

const httpServer = app.listen(8080, () => {
  console.log("HTTP server running on http://localhost:8080");
});

const wss = new WebSocketServer({ server: httpServer });


const redisClient = createClient({
  url: process.env.REDIS_URL
});

(async () => {
  redisClient.on('error', (err) => console.error('Redis Client Error:', err));
  await redisClient.connect();
  console.log("Connected to Redis");
})();

const rooms = new Map();

wss.on("connection", (ws: WebSocket) => {
  console.log("New client connected");

  ws.on("message", async (data: string) => {
    try {
      const parsedData = JSON.parse(data);
      console.log("Received message:", parsedData);

      if (parsedData.type === "CreateRoom") {
        const roomId = parsedData.roomId;
        const roomExists = await redisClient.exists(roomId);

        if (roomExists === 0) {
          const playersArray: any = [];
          await redisClient.hSet(roomId, {
            players: JSON.stringify(playersArray),
            text: JSON.stringify(parsedData.text),
            admin: 'true'
          });

          const playersData = await redisClient.hGet(roomId, "players");
          const players = JSON.parse(playersData!);
          players.push({
            ws: ws,
            name: parsedData.name,
            index: 0,
          });

          await redisClient.hSet(roomId, "players", JSON.stringify(players));
          console.log(await redisClient.hGetAll(roomId));
          ws.send(
            JSON.stringify({
              type: "roomCreated",
              message: `Room '${roomId}' created.`,
            })
          );
        } else {
          ws.send(
            JSON.stringify({
              type: "error",
              message: `Room '${roomId}' already exists.`,
            })
          );
        }
      }

      if (parsedData.type === "JoinRoom") {
        const roomId = parsedData.roomId;
        const roomExists = await redisClient.exists(roomId);

        if (roomExists === 1) {
          const roomData = await redisClient.hGetAll(roomId);
          const players = JSON.parse(roomData.players);

          players.push({
            ws: ws,
            name: parsedData.name,
            index: 0,
          });

          await redisClient.hSet(roomId, "players", JSON.stringify(players));

          players.forEach((player: any) => {
            if (player.ws.readyState === WebSocket.OPEN) {
              player.ws.send(
                JSON.stringify({
                  type: "playerJoined",
                  message: `${parsedData.name} has joined the room`,
                  playerName: parsedData.name,
                })
              );
            }
          });

          ws.send(
            JSON.stringify({
              type: "JoinedRoom",
              message: `Joined room '${roomId}'`,
            })
          );
        } else {
          ws.send(
            JSON.stringify({
              type: "error",
              message: `Room '${roomId}' does not exist.`,
            })
          );
        }
      }

      if (parsedData.type === "message") {
        const roomId = parsedData.roomId;
        const roomExists = await redisClient.exists(roomId);

        if (roomExists === 1) {
          const roomData = await redisClient.hGetAll(roomId);
          const players = JSON.parse(roomData.players);
          players.forEach((player: any) => {
            if (player.ws.readyState === WebSocket.OPEN) {
              player.ws.send(
                JSON.stringify({
                  type: "message",
                  message: parsedData.message,
                })
              );
            }
          });
        } else {
          ws.send(
            JSON.stringify({
              type: "error",
              message: `You are not in a valid room.`,
            })
          );
        }
      }

      if (parsedData.type === "IndexUpdate") {
        const roomId = parsedData.roomId;
        const roomExists = await redisClient.exists(roomId);

        if (roomExists === 1) {
          const roomData = await redisClient.hGetAll(roomId);
          const players = JSON.parse(roomData.players);
          players.forEach((player: any) => {
            if (player.ws.readyState === WebSocket.OPEN) {
              player.ws.send(
                JSON.stringify({
                  type: "IndexUpdate",
                  roomId: roomId,
                  index: parsedData.index,
                })
              );
            }
          });
        }
      }

      if (parsedData.type === "gameStart") {
        const roomId = parsedData.roomId;
        const roomExists = await redisClient.exists(roomId);

        if (roomExists === 1) {
          const roomData = await redisClient.hGetAll(roomId);
          const players = JSON.parse(roomData.players);
          players.forEach((player: any) => {
            if (player.ws.readyState === WebSocket.OPEN) {
              player.ws.send(
                JSON.stringify({
                  type: "gameStart",
                  text: roomData.text,
                })
              );
            }
          });
        }
      }
    } catch (err) {
      console.error("Error processing message:", err);
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");

    rooms.forEach((roomData, roomId) => {
      const players = roomData.players;
      players.forEach((player: any) => {
        if (player.ws === ws) {
          players.delete(player);
          players.forEach((remainingPlayer: any) => {
            if (remainingPlayer.ws.readyState === WebSocket.OPEN) {
              remainingPlayer.ws.send(
                JSON.stringify({
                  type: "playerLeft",
                  message: `${player.name} has left the room`,
                  playerName: player.name,
                })
              );
            }
          });
          if (players.size === 0) {
            rooms.delete(roomId);
          }
        }
      });
    });
  });

  ws.on("error", (err) => {
    console.error("WebSocket error:", err);
  });

  ws.send("Hello");
});