
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
const signin = async (req: Request, res: Response) => {
    const prisma = new PrismaClient();
    const { email, password } = req.body;
    const existingUser = await prisma.user.findFirst({
        where: {
            email
        }
    })
    if(!existingUser) {
        res.status(403).json({message: "This Email is not present in the db"});
    }
    const hashedPassword = await bcrypt.compare(password, existingUser!.password);
    console.log(hashedPassword)
    if(hashedPassword) {
        try {
            const token = jwt.sign({email: existingUser?.email, userId: existingUser!.id}, process.env.JWT_SECRET!, {expiresIn: "1h"})
            res.status(200).json({token: token});
        }catch(error) {
            res.status(200).json(error)
        }
    } 
    else {
        res.status(403).json({meessage: "Your password must be wrong"});
    }

    
}

export default signin;