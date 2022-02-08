import DATA_BASE from '../constants/dataBases.js';
import modelRepository from '../repositories/modelRepository.js';

class DriverService {
  async add(data) {
    const newDriver = await DATA_BASE.create(modelRepository.driverModel, data);
    return newDriver;
  }
}

export default new DriverService();
