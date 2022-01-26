import { Router } from 'express';
import creditCardController from '../controllers/creditCardController.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import validationMiddleware from '../middlewares/validationMiddleware.js';
import { USER } from '../constants/roles.js';
import validationSchemas from '../schemas/validationSchemas.js';

const creditCardRouter = Router();

creditCardRouter.post(
  '/add',
  roleMiddleware([USER]),
  validationMiddleware(validationSchemas.getIdSchema('driverId')),
  creditCardController.add
);

export default creditCardRouter;
