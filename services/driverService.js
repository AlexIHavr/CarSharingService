import driverModel from '../models/driverModel.js';

class DriverService {
  async add(data) {
    const newDriver = await driverModel.create(data);
    return newDriver;
  }

  async setDriverCreditCard(driverId, creditCardId) {
    await driverModel.update({ creditCard: creditCardId }, { where: { id: driverId } });
  }

  async getDriverCreditCard(driverId) {
    const driver = await driverModel.findByPk(driverId);

    return driver?.creditCard;
  }
}

export default new DriverService();
