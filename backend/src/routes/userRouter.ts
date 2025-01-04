import { Request, Response, Router } from 'express'
import userInformation from '../userInformation/userInformation';
import verifyToken from '../verifyToken';

import { storingUserValue, updatingTestStarted, updatingTestCompleted } from '../storingUserValue';
import average from '../userInformation/average';
const  userRouter = Router();


userRouter.get('/:userId', verifyToken, userInformation, (req: Request, res: Response) => {});
userRouter.get('testInformation/:userId', verifyToken, userInformation, (req: Request, res: Response) => {});

userRouter.get('/average/:userId', verifyToken, average, (req: Request, res: Response) => {});

userRouter.post('/addData/:userId', verifyToken, storingUserValue, (req: Request, res: Response) => {});


userRouter.put('/testStarted/:userId', verifyToken, updatingTestStarted, (req: Request, res: Response) => {})

userRouter.put('/testCompleted/:userId', verifyToken, updatingTestCompleted, (req: Request, res: Response) => {})

export default userRouter;