import bookingService from '../services/bookingService.js';

class BookingController {
  async addBooking(req, res, next) {
    try {
      const newCreditCard = await bookingService.addBooking(req.body);
      res.json(newCreditCard);
    } catch (err) {
      next(err);
    }
  }
}

export default new BookingController();
