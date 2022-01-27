import { FREE } from '../constants/statuses.js';
import bookingModel from '../models/bookingModel.js';
import carModel from '../models/carModel.js';

class BookingService {
  async add(data) {
    const newBooking = await bookingModel.create(data);
    await carModel.update({ currentRun: null, status: FREE }, { where: { id: data.car } });
    return newBooking;
  }
}

export default new BookingService();
