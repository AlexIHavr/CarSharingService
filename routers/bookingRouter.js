import { Router } from 'express';
import bookingController from '../controllers/bookingController.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import { USER } from '../constants/roles.js';

const bookingRouter = Router();

bookingRouter.post('/add', roleMiddleware([USER]), bookingController.add);

export default bookingRouter;
