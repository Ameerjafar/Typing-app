import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
const userInformation = async (req: Request, res: Response) => {
    const prisma = new PrismaClient();
    try {
        const { userId } = req.params;
        const userInformation = await prisma.typeInformation.findMany({
            where: {
                id: userId
            }
        })
        console.log(userInformation);
        if(!userInformation) {
            res.status(404).json({message: "No records available at this moment"});
        }
        else {
             res.status(200).json({userInformation})
        }

    }catch(error) {
        res.status(403).json({error});
    }
}

export default userInformation;