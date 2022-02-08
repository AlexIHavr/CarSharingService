import DATA_BASE from '../constants/dataBases.js';
import { FREE, RESERVED } from '../constants/statuses.js';
import ApiError from '../errors/ApiError.js';
import modelRepository from '../repositories/modelRepository.js';

class RunService {
  async add(data) {
    const car = await DATA_BASE.findById(modelRepository.carModel, data.carId);

    if (!car) {
      throw ApiError.BadRequest('Car does not exist.');
    }

    if (car.status !== FREE) {
      throw ApiError.BadRequest('Cars must be free.');
    }

    //only in mongoose
    const driver = await DATA_BASE.findById(modelRepository.driverModel, data.driver);
    if (!driver) {
      throw ApiError.BadRequest('Driver does not exist.');
    }

    const newRun = await DATA_BASE.create(modelRepository.runModel, data);

    await DATA_BASE.updateOne(car, { currentRun: newRun._id, status: RESERVED });

    return newRun;
  }
}

export default new RunService();
