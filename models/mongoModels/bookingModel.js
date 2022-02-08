import mongoose from 'mongoose';

const bookingModel = new mongoose.Schema({
  startFuelLevel: { type: Number, required: true, min: 0, max: 100 },
  startMileage: { type: Number, required: true, min: 0 },
  finishFuelLevel: { type: Number, required: true, min: 0, max: 100 },
  finishMileage: { type: Number, required: true, min: 0 },
  run: { type: mongoose.Schema.Types.ObjectId, ref: 'Run', required: true },
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
});

export default mongoose.model('Booking', bookingModel);
