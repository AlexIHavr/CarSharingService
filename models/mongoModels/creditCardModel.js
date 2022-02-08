import cardValidator from 'card-validator';
import mongoose from 'mongoose';

const creditCardModel = new mongoose.Schema({
  cardNumber: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: (value) => cardValidator.number(value).isValid,
      message: 'Invalid credit card',
    },
  },
  cardHolder: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: (value) => cardValidator.cardholderName(value).isValid,
      message: 'Invalid card holder',
    },
  },
  cardValidDate: {
    type: Date,
    required: true,
    trim: true,
    validate: {
      validator: (value) => cardValidator.expirationDate(value).isValid,
      message: 'Invalid card date',
    },
  },
});

export default mongoose.model('CreditCard', creditCardModel);
