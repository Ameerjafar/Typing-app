import express from 'express';
import landingRoute from './landingRoute';
import authRouter from './auteRoute';
import userRouter from './userRouter';
import leaderBoardRouter from './leaderBoardRouter';

const route = express.Router();



route.use('/', landingRoute);
route.use('/auth', authRouter);
route.use('/user', userRouter)
route.use('/leaderboard', leaderBoardRouter);

export default route;