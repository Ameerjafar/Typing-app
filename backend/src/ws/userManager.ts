import { WebSocket } from "ws"

interface User {
    userId: string;
    userName: string;
    ws: WebSocket;
    progress: number;
    wpm?: number;
    accuracy?: number;
    finished?: boolean;
}

interface Room {
    roomId: string;
    admin: string;
    users: User[];
    startTime?: number;
}

class UserManager {
    private rooms: Map<string, Room>;

    constructor() {
        this.rooms = new Map<string, Room>();
    }

    async addUser(roomId: string, userId: string, ws: WebSocket, userName: string, admin: string) {
        let room = this.rooms.get(roomId);
        
        if (!room) {
            room = {
                roomId,
                admin,
                users: []
            };
            this.rooms.set(roomId, room);
        }

        // Check if user already exists in the room to avoid duplicates (though connection handling should prevent this)
        const existingUserIndex = room.users.findIndex(u => u.userId === userId);
        if (existingUserIndex !== -1) {
            room.users[existingUserIndex].ws = ws; // Update WS connection if reconnecting
            room.users[existingUserIndex].userName = userName;
        } else {
            room.users.push({
                userId,
                userName,
                ws,
                progress: 0,
                finished: false
            });
        }
    }

    async removeUser(roomId: string, userId: string): Promise<boolean> {
        const room = this.rooms.get(roomId);
        if (!room) return false;

        const userIndex = room.users.findIndex(u => u.userId === userId);
        if (userIndex === -1) return false;

        room.users.splice(userIndex, 1);

        // If room is empty, delete it
        if (room.users.length === 0) {
            this.rooms.delete(roomId);
        } else if (room.admin === userId) {
            // Reassign admin if admin leaves
            room.admin = room.users[0].userId;
        }

        return true;
    }

    async getAllUsers(roomId: string): Promise<User[] | null> {
        const room = this.rooms.get(roomId);
        return room ? room.users : null;
    }

    async getRoom(roomId: string): Promise<boolean> {
        return this.rooms.has(roomId);
    }
    
    async updateProgress(roomId: string, userId: string, progress: number): Promise<boolean> {
        const room = this.rooms.get(roomId);
        if (!room) return false;

        const user = room.users.find(u => u.userId === userId);
        if (!user) return false;

        user.progress = progress;
        return true;
    }

    async updateStats(roomId: string, userId: string, wpm: number, accuracy: number): Promise<boolean> {
        const room = this.rooms.get(roomId);
        if (!room) return false;

        const user = room.users.find(u => u.userId === userId);
        if (!user) return false;

        user.wpm = wpm;
        user.accuracy = accuracy;
        user.finished = true;
        return true;
    }
}

export default UserManager;