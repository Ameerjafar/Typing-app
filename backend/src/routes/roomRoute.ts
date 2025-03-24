import express, { Request, Response } from 'express';
import { createClient } from 'redis';
const roomRoute = express.Router();

const redisClient = createClient({
    url: process.env.REDIS_URL
});
roomRoute.get('/get-text/:roomId', async (req: Request, res: Response) => {
    const roomId = req.params.roomId;
    const text = await redisClient.hGet(roomId, "text");
    res.json({ text });
})

export default roomRoute;