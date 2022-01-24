import creditCardService from '../services/creditCardService.js';

class CreditCardController {
  async addCreditCard(req, res, next) {
    try {
      const newCreditCard = await creditCardService.addCreditCard(req.body);
      res.json(newCreditCard);
    } catch (err) {
      next(err);
    }
  }
}

export default new CreditCardController();
