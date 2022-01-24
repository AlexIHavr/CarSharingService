import { Router } from 'express';
import creditCardController from '../controllers/creditCardController.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import validationMiddleware from '../middlewares/validationMiddleware.js';
import { USER } from '../roles/roles.js';
import validationFieldSchemas from '../schemas/validationFieldSchemas.js';

const creditCardRouter = Router();

creditCardRouter.post(
  '/addCreditCard',
  roleMiddleware([USER]),
  validationMiddleware([validationFieldSchemas.getIdFieldSchema('driverId')]),
  creditCardController.addCreditCard
);

export default creditCardRouter;
