import mongoose from 'mongoose';
import carModel from './carModel.js';
import runModel from './runModel.js';

const BookingSchema = new mongoose.Schema({
  startFuelLevel: { type: Number, required: true, min: 0, max: 100 },
  startMileage: { type: Number, required: true, min: 0 },
  finishFuelLevel: { type: Number, required: true, min: 0, max: 100 },
  finishMileage: { type: Number, required: true, min: 0 },
  run: {
    type: mongoose.Schema.Types.ObjectId,
    ref: runModel,
    required: true,
    validate: {
      validator: async (value) => {
        const run = await runModel.findById(value);
        return run;
      },
      message: 'Run does not exist.',
    },
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: carModel,
    required: true,
    validate: {
      validator: async (value) => {
        const car = await carModel.findById(value);
        return car;
      },
      message: 'Car does not exist.',
    },
  },
});

export default mongoose.model('Booking', BookingSchema);
