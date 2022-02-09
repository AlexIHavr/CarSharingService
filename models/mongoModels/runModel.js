import mongoose from 'mongoose';
import driverModel from './driverModel.js';

const RunSchema = new mongoose.Schema({
  startDate: { type: Date, required: true, trim: true },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: driverModel,
    required: true,
    validate: {
      validator: async (value) => {
        const driver = await driverModel.findById(value);
        return driver;
      },
      message: 'Driver does not exist.',
    },
  },
});

export default mongoose.model('Run', RunSchema);
