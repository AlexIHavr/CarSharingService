import { FREE, RESERVED } from '../constants/statuses.js';
import ApiError from '../errors/ApiError.js';
import carModel from '../models/carModel.js';
import runModel from '../models/runModel.js';

class RunService {
  async add(data) {
    const car = await carModel.findByPk(data.carId);

    if (!car) {
      throw ApiError.BadRequest('Car does not exist.');
    }

    if (car.status !== FREE) {
      throw ApiError.BadRequest('Cars must be free.');
    }

    const newRun = await runModel.create(data);
    await car.setRun(newRun);

    await car.update({ status: RESERVED });

    return newRun;
  }
}

export default new RunService();
