import { Request, Response, Router } from 'express'
import userInformation from '../userInformation/userInformation';
import verifyToken from '../verifyToken';

import { storingUserValue, updatingTestStarted } from '../storingUserValue';
const  userRouter = Router();


userRouter.get('/:userId', verifyToken, userInformation, (req: Request, res: Response) => {});

userRouter.post('addData/:userId', verifyToken, storingUserValue, (req: Request, res: Response) => {});


userRouter.get('/testStarted/:userId', verifyToken, updatingTestStarted, (req: Request, res: Response) => {})

export default userRouter;