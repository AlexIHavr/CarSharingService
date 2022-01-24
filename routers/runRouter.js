import { Router } from 'express';
import runController from '../controllers/runController.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import validationMiddleware from '../middlewares/validationMiddleware.js';
import { USER } from '../roles/roles.js';
import validationFieldSchemas from '../schemas/validationFieldSchemas.js';

const runRouter = Router();

runRouter.post(
  '/addRun',
  roleMiddleware([USER]),
  validationMiddleware([validationFieldSchemas.getIdFieldSchema('carId')]),
  runController.addRun
);

export default runRouter;
