import ApiError from '../errors/ApiError.js';
import driverModel from '../models/driverModel.js';
import BaseService from './baseService.js';

class DriverService extends BaseService {
  constructor() {
    super(driverModel);
  }

  async addDriver(data) {
    const newDriver = await driverModel.create(data);
    return newDriver;
  }

  async setDriverCreditCard(driverId, creditCardId) {
    await driverModel.update({ creditCard: creditCardId }, { where: { id: driverId } });
  }

  async getDriverCreditCard(driverId) {
    const driver = await super.getOneModel({ id: driverId });

    if (!driver.creditCard) {
      throw ApiError.BadRequest('Driver credit card has not been authorized.');
    }

    return driver.creditCard;
  }
}

export default new DriverService();
