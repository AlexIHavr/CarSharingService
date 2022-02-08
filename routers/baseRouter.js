import { Router } from 'express';
import { ADMIN } from '../constants/roles.js';
import accessTokenMiddleware from '../middlewares/accessTokenMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import bookingRouter from './bookingRouter.js';
import carRouter from './carRouter.js';
import creditCardRouter from './creditCardRouter.js';
import driverRouter from './driverRouter.js';
import runRouter from './runRouter.js';

const baseRouter = Router();

baseRouter.use(
  '/api/car',
  accessTokenMiddleware,
  //roleMiddleware([ADMIN]),
  carRouter
);
baseRouter.use('/api/driver', driverRouter);
baseRouter.use('/api/creditCard', accessTokenMiddleware, creditCardRouter);
baseRouter.use('/api/run', accessTokenMiddleware, runRouter);
baseRouter.use('/api/booking', accessTokenMiddleware, bookingRouter);

export default baseRouter;
