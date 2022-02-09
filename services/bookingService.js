import dbRepository from '../repositories/index.js';
import { FREE } from '../constants/statuses.js';
import modelRepository from '../repositories/modelRepository.js';

class BookingService {
  async add(data) {
    const newBooking = await dbRepository.create(modelRepository.bookingModel, data);

    await dbRepository.updateOneByFilter(
      modelRepository.carModel,
      { currentRun: null, status: FREE },
      { _id: data.car }
    );
    return newBooking;
  }
}

export default new BookingService();
