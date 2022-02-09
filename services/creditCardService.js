import dbRepository from '../repositories/index.js';
import ApiError from '../errors/ApiError.js';
import modelRepository from '../repositories/modelRepository.js';

class CreditCardService {
  async add(data) {
    const driver = await dbRepository.findById(modelRepository.driverModel, data.driverId);
    if (!driver) {
      throw ApiError.BadRequest('Driver does not exist.');
    }

    const creditCard = await dbRepository.create(modelRepository.creditCardModel, data);
    await dbRepository.updateOne(driver, { creditCard: creditCard._id });

    return creditCard;
  }
}

export default new CreditCardService();
