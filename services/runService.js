import dbRepository from '../repositories/index.js';
import { FREE, RESERVED } from '../constants/statuses.js';
import ApiError from '../errors/ApiError.js';
import modelRepository from '../repositories/modelRepository.js';

class RunService {
  async add(data) {
    const car = await dbRepository.findById(modelRepository.carModel, data.carId);

    if (!car) {
      throw ApiError.BadRequest('Car does not exist.');
    }

    if (car.status !== FREE) {
      throw ApiError.BadRequest('Cars must be free.');
    }

    const newRun = await dbRepository.create(modelRepository.runModel, data);

    await dbRepository.updateOne(car, { currentRun: newRun._id, status: RESERVED });

    return newRun;
  }
}

export default new RunService();
