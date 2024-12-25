import express from 'express';
import landingRoute from './landingRoute';

const route = express.Router();



route.use('/', landingRoute);

export default route;