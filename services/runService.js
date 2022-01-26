import { FREE } from '../constants/statuses.js';
import ApiError from '../errors/ApiError.js';
import carModel from '../models/carModel.js';
import runModel from '../models/runModel.js';
import carService from './carService.js';

class RunService {
  async add(data) {
    const car = await carModel.findByPk(data.carId);

    if (!car) {
      throw new ApiError.BadRequest('Car does not exist.');
    }

    if (car.status !== FREE) {
      throw ApiError.BadRequest('Car must be free.');
    }

    const newRun = await runModel.create(data);
    await carService.setCarCurrentRun(data.carId, newRun.id);

    return newRun;
  }
}

export default new RunService();
