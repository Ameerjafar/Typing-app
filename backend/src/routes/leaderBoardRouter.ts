import { Router } from 'express';

import { Request, Response } from 'express';
import { showUserRanking } from '../storingUserValue';
const leaderBoardRouter = Router();

leaderBoardRouter.get('/:userId', showUserRanking, (req: Request, res: Response) => {});


export default leaderBoardRouter;