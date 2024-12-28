
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt'

const signup = async (req: Request, res: Response) => {
    const prisma = new PrismaClient();
    const { fullName, email, password } = req.body;
    const existingEmail = await prisma.user.findFirst({
        where: {
            email
        }
    })
    if(existingEmail) {
        res.status(403).json({message: "This is email is already present"});
    } else {
        const saltRounds = parseInt(process.env.SALTROUND || '10', 10);
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await prisma.user.create({
            data: {
                fullName, 
                email,
                password: hashedPassword,
                testCompleted: 0,
                testStarted: 0
            }
        })
        res.status(200).json({message: 
            "User created successfully in the db"
        })
    }
}

export default signup;