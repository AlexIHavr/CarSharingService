import bookingService from '../services/bookingService.js';

class BookingController {
  async add(req, res, next) {
    try {
      const newCreditCard = await bookingService.add(req.body);
      res.json(newCreditCard);
    } catch (err) {
      next(err);
    }
  }
}

export default new BookingController();
