import dbRepository from '../repositories/index.js';
import modelRepository from '../repositories/modelRepository.js';

class DriverService {
  async add(data) {
    const newDriver = await dbRepository.create(modelRepository.driverModel, data);
    return newDriver;
  }
}

export default new DriverService();
