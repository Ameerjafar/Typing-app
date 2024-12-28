import { Router, Request, Response } from 'express';
import signup from '../auth/signup';
import signin from '../auth/signin';


const authRouter = Router();

authRouter.post('/signup', signup, (req: Request, res: Response) => {

})

authRouter.post('/signin', signin, (req: Request, res: Response) => {})




export default authRouter;