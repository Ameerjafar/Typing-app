import {Request, Response, NextFunction } from "express";


import jwt from 'jsonwebtoken';

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']!.split(' ')[1]; 
  console.log(token);
  if(!token) {
    res.status(401).json({message: "unauthorized error"});
  }

  jwt.verify(token!, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        res.status(401).json({message: 'Unauthorized: Token expired'});
      } else {
         res.status(401).json({message: err});
      }
    }
    next();
  });
}

export default verifyToken;