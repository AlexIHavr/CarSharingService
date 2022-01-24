import { Router } from 'express';
import carController from '../controllers/carController.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import validationMiddleware from '../middlewares/validationMiddleware.js';
import { ADMIN, USER } from '../roles/roles.js';
import validationFieldSchemas from '../schemas/validationFieldSchemas.js';

const carRouter = Router();

carRouter.get('/getUsingFewFuelCars', roleMiddleware([USER]), carController.getUsingFewFuelCars);
carRouter.get(
  '/getReservedUnpaidCars',
  roleMiddleware([USER]),
  carController.getReservedUnpaidCars
);

carRouter.post('/addCar', roleMiddleware([ADMIN]), carController.addCar);

carRouter.put(
  '/setInUseCar',
  roleMiddleware([USER]),
  validationMiddleware([validationFieldSchemas.getIdFieldSchema('carId')]),
  carController.setInUseCar
);

carRouter.put('/setInServiceCar', roleMiddleware([ADMIN]), carController.setInServiceCar);
carRouter.put('/setCoordinatesCar', roleMiddleware([ADMIN]), carController.setCoordinatesCar);

carRouter.delete('/removeCar', roleMiddleware([ADMIN]), carController.removeCar);

export default carRouter;
