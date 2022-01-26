import { Router } from 'express';
import carController from '../controllers/carController.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import validationMiddleware from '../middlewares/validationMiddleware.js';
import { ADMIN, USER } from '../constants/roles.js';
import validationSchemas from '../schemas/validationSchemas.js';

const carRouter = Router();

carRouter.get(
  '/getCarsByFilter',
  roleMiddleware([ADMIN]),
  validationMiddleware(validationSchemas.carsByFilterSchema),
  carController.getCarsByFilter
);
carRouter.get('/getReservedUnpaid', roleMiddleware([ADMIN]), carController.getReservedUnpaid);

carRouter.post('/add', roleMiddleware([ADMIN]), carController.add);

carRouter.put(
  '/setStatus',
  roleMiddleware([ADMIN]),
  validationMiddleware(validationSchemas.carStatusSchema),
  carController.setStatus
);
carRouter.put(
  '/setCoordinates',
  roleMiddleware([ADMIN]),
  validationMiddleware(validationSchemas.coordinatesSchema),
  carController.setCoordinates
);

carRouter.delete(
  '/remove',
  roleMiddleware([ADMIN]),
  validationMiddleware(validationSchemas.carsByFilterSchema),
  carController.remove
);

export default carRouter;
