import creditCardModel from '../models/creditCardModel.js';
import BaseService from './baseService.js';
import driverService from './driverService.js';

class CreditCardService extends BaseService {
  constructor() {
    super(creditCardModel);
  }

  async addCreditCard(data) {
    await driverService.getOneModel({ id: data.driverId });

    const creditCard = await creditCardModel.create(data);
    await driverService.setDriverCreditCard(data.driverId, creditCard.id);

    return creditCard;
  }
}

export default new CreditCardService();
