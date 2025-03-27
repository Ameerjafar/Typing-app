import { RedisClientType, createClient } from "@redis/client";
import { WebSocket } from "ws"
import dotenv from 'dotenv';

dotenv.config();

interface RoomIdObject {
    admin?: string | undefined
    userId: string[],
    ws: WebSocket[],
    userName: string[],
}

class UserManager {
    private redisClient: RedisClientType;
    constructor() {
        this.redisClient = createClient({
            url: process.env.REDIS_URL
        });
        this.initialize();
    }
    initialize() {
        this.redisClient.on('error', (err) => {
            console.log(err);
            return;
        })
        this.redisClient.connect();
    }
    async addUser(roomId: string, userId: string, ws: WebSocket, userName: string, admin: string) {
        const existingData = await this.getRoomData(roomId);
        const newData = {
            userId: [...(existingData?.userId || []), userId],
            ws: [...(existingData?.ws || []), ws],
            userName: [...(existingData?.userName || []), userName],
            admin: existingData?.admin ? existingData.admin : admin
        };
        console.log(this.redisClient);
        await this.redisClient.set(roomId, JSON.stringify(newData));
    }
    async removeUser(roomId: string, userId: string, ws: WebSocket): Promise<boolean> {
        const room = await this.getRoomData(roomId);
        if (!room) return false;

        const findUserId: number = room.userId.indexOf(userId);
        if (findUserId === -1) return false;

        room.userId.splice(findUserId, 1);
        room.ws.splice(findUserId, 1);
        room.userName.splice(findUserId, 1);
        await this.redisClient.set(roomId, JSON.stringify(room));
        return true;
    }
    async getAllUsers(roomId: string) {
        const room = await this.getRoomData(roomId);
        return { ws: room?.ws } ;
    }
    async getRoom(roomId: string) {
        const exists = await this.redisClient.exists(roomId);
        return exists === 1;
    }
    async getRoomData(roomId: string) {
        const response = await this.redisClient.get(roomId);
        console.log(response);
        return response ? JSON.parse(response) : null;
    }
}

export default UserManager;