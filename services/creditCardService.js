import ApiError from '../errors/ApiError.js';
import creditCardModel from '../models/creditCardModel.js';
import driverModel from '../models/driverModel.js';

class CreditCardService {
  async add(data) {
    const driver = await driverModel.findByPk(data.driverId);
    if (!driver) {
      throw ApiError.BadRequest('Driver does not exist.');
    }

    const creditCard = await creditCardModel.create(data);
    await driver.setCreditCard(creditCard);

    return creditCard;
  }
}

export default new CreditCardService();
