import mongoose from 'mongoose';

const driverModel = new mongoose.Schema({
  licenseNumber: { type: String, required: true, unique: true, trim: true },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  creditCard: { type: mongoose.Schema.Types.ObjectId, ref: 'CreditCard', default: null },
});

export default mongoose.model('Driver', driverModel);
