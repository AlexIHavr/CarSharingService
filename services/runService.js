import ApiError from '../errors/ApiError.js';
import runModel from '../models/runModel.js';
import BaseService from './baseService.js';
import carService from './carService.js';

class RunService extends BaseService {
  constructor() {
    super(runModel);
  }

  async addRun(data) {
    const car = await carService.getOneModel({ id: data.carId });

    if (car.status !== 'free') {
      throw ApiError.BadRequest('Car must be free.');
    }

    const newRun = await runModel.create(data);
    await carService.setCarCurrentRun(data.carId, newRun.id);

    return newRun;
  }
}

export default new RunService();
