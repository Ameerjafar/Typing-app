
import { PrismaClient } from '@prisma/client';
import { Request, Response }  from 'express';

const prisma = new PrismaClient();
const leaderBoard = (second: string, wpm: string, user: object) => {

    // try {
    //     const leaderBoard = prisma.leaderBoard.
    // }catch(error) {
    
    // }
}
const storingUserValue = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { wpm, accuracy, second } = req.body;
        await prisma.typeInformation.create({
            data: {
                userId,
                wpm,
                accuracy,
                second
            }
        });
        const user = prisma.user.findUnique({where: {id: userId}})

        res.status(200).json({message: "Data stored successfully"});
    }catch(error) {
        res.status(403).json(error);
    }

}
const updatingTestStarted = async (req: Request, res: Response) => {
    const prisma = new PrismaClient();
    const { userId } = req.params;
    await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            testStarted: {
                increment: 1
            }
        }
    })
    
}
export {
    storingUserValue,
    updatingTestStarted
};