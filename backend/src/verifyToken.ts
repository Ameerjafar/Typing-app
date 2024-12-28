import {Request, Response, NextFunction } from "express";


import jwt from 'jsonwebtoken';

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1]; 

  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  }

  jwt.verify(token!, 'your-secret-key', (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        res.status(401).send('Unauthorized: Token expired');
      } else {
         res.status(401).send('Unauthorized: Invalid token');
      }
    }
    next();
  });
}

export default verifyToken;