import bookingModel from '../models/bookingModel.js';
import carService from './carService.js';

class BookingService {
  async add(data) {
    const newBooking = await bookingModel.create(data);
    await carService.removeCurrentRun(data.car);
    return newBooking;
  }
}

export default new BookingService();
