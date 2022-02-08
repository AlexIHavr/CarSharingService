import DATA_BASE from '../constants/dataBases.js';
import ApiError from '../errors/ApiError.js';
import modelRepository from '../repositories/modelRepository.js';

class CreditCardService {
  async add(data) {
    const driver = await DATA_BASE.findById(modelRepository.driverModel, data.driverId);
    if (!driver) {
      throw ApiError.BadRequest('Driver does not exist.');
    }

    const creditCard = await DATA_BASE.create(modelRepository.creditCardModel, data);
    await DATA_BASE.updateOne(driver, { creditCard: creditCard._id });

    return creditCard;
  }
}

export default new CreditCardService();
