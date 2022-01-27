import driverModel from '../models/driverModel.js';

class DriverService {
  async add(data) {
    const newDriver = await driverModel.create(data);
    return newDriver;
  }
}

export default new DriverService();
