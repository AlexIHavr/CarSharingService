import { Router } from 'express';
import carController from '../controllers/carController.js';
import validationMiddleware from '../middlewares/validationMiddleware.js';
import validationSchemas from '../schemas/validationSchemas.js';

const carRouter = Router();

carRouter.get(
  '/getCarsByFilter',
  validationMiddleware(validationSchemas.carsByFilterSchema),
  carController.getCarsByFilter
);
carRouter.get('/getReservedUnpaid', carController.getReservedUnpaid);

carRouter.post('/add', carController.add);

carRouter.put(
  '/setStatus',
  validationMiddleware(validationSchemas.carStatusSchema),
  carController.setStatus
);
carRouter.put(
  '/setCoordinates',
  validationMiddleware(validationSchemas.coordinatesSchema),
  carController.setCoordinates
);

carRouter.delete(
  '/remove',
  validationMiddleware(validationSchemas.carsByFilterSchema),
  carController.remove
);

export default carRouter;
