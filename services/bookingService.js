import DATA_BASE from '../constants/dataBases.js';
import { FREE } from '../constants/statuses.js';
import modelRepository from '../repositories/modelRepository.js';

class BookingService {
  async add(data) {
    const newBooking = await DATA_BASE.create(modelRepository.bookingModel, data);

    await DATA_BASE.updateOneByFilter(
      modelRepository.carModel,
      { currentRun: null, status: FREE },
      { _id: data.car }
    );
    return newBooking;
  }
}

export default new BookingService();
