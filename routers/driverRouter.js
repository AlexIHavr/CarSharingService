import { Router } from 'express';
import driverController from '../controllers/driverController.js';

const driverRouter = Router();

driverRouter.post('/add', driverController.add);

export default driverRouter;
