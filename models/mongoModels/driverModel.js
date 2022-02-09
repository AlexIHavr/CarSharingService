import mongoose from 'mongoose';
import creditCardModel from './creditCardModel.js';

const DriverSchema = new mongoose.Schema({
  licenseNumber: { type: String, required: true, unique: true, trim: true },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  creditCard: {
    type: mongoose.Schema.Types.ObjectId,
    ref: creditCardModel,
    default: null,
    validate: {
      validator: async (value) => {
        if (value) {
          const creditCard = await creditCardModel.findById(value);
          return creditCard;
        }
      },
      message: 'Credit card does not exist.',
    },
  },
});

export default mongoose.model('Driver', DriverSchema);
