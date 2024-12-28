import express from 'express';
import landingRoute from './landingRoute';
import authRouter from './auteRoute';

const route = express.Router();



route.use('/', landingRoute);
route.use('/auth', authRouter)

export default route;