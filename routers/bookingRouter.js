import { Router } from 'express';
import bookingController from '../controllers/bookingController.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import { USER } from '../roles/roles.js';

const bookingRouter = Router();

bookingRouter.post('/addBooking', roleMiddleware([USER]), bookingController.addBooking);

export default bookingRouter;
