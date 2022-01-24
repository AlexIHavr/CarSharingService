import bookingModel from '../models/bookingModel.js';
import BaseService from './baseService.js';
import carService from './carService.js';

class BookingService extends BaseService {
  constructor() {
    super(bookingModel);
  }

  async addBooking(data) {
    const newBooking = await bookingModel.create(data);
    await carService.removeCarCurrentRun(data.car);
    return newBooking;
  }
}

export default new BookingService();
