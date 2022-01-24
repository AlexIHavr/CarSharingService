import { Router } from 'express';
import driverController from '../controllers/driverController.js';

const driverRouter = Router();

driverRouter.post('/addDriver', driverController.addDriver);

export default driverRouter;
