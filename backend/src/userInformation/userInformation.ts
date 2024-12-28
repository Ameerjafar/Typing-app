import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
const userInformation = async (req: Request, res: Response) => {
    try {
        const prisma = new PrismaClient();
        const { userId } = req.params;
        const userInformation = await prisma.typeInformation.findMany({
            where: {
                userId
            }
        })
        if(!userInformation) {
            res.status(404).json({message: "No records available at this moment"});
        }
        res.status(200).send({userInformation: userInformation})
    }catch(error) {
        res.status(403).json(error);
    }
}

export default userInformation;