import ApiError from '../errors/ApiError.js';
import creditCardModel from '../models/creditCardModel.js';
import driverModel from '../models/driverModel.js';
import driverService from './driverService.js';

class CreditCardService {
  async add(data) {
    const driver = await driverModel.findByPk(data.driverId);
    if (!driver) {
      throw new ApiError.BadRequest('Driver does not exist.');
    }

    const creditCard = await creditCardModel.create(data);

    await driverService.setDriverCreditCard(data.driverId, creditCard.id);

    return creditCard;
  }
}

export default new CreditCardService();
