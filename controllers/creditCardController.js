import creditCardService from '../services/creditCardService.js';

class CreditCardController {
  async add(req, res, next) {
    try {
      const newCreditCard = await creditCardService.add(req.body);
      res.json(newCreditCard);
    } catch (err) {
      next(err);
    }
  }
}

export default new CreditCardController();
