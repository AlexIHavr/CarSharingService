import { Router } from 'express';
import runController from '../controllers/runController.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import validationMiddleware from '../middlewares/validationMiddleware.js';
import { USER } from '../constants/roles.js';
import validationSchemas from '../schemas/validationSchemas.js';

const runRouter = Router();

runRouter.post(
  '/add',
  roleMiddleware([USER]),
  validationMiddleware(validationSchemas.getIdSchema('carId')),
  runController.add
);

export default runRouter;
