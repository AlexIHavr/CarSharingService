import mongoose from 'mongoose';
import statuses, { FREE } from '../../constants/statuses.js';
import runModel from './runModel.js';

const CarSchema = new mongoose.Schema({
  VIN: { type: String, required: true, unique: true, minlength: 17, maxlength: 17, trim: true },
  registrationNumber: { type: String, required: true, unique: true, trim: true },
  brand: { type: String, required: true, trim: true },
  model: { type: String, required: true, trim: true },
  productionDate: { type: Date, required: true, trim: true },
  status: { type: String, default: FREE, enum: statuses },
  fuelLevel: { type: Number, default: 100, min: 0, max: 100 },
  mileage: { type: Number, default: 0, min: 0 },
  geoLatitude: { type: Number, required: true, min: -90, max: 90 },
  geoLongitude: { type: Number, required: true, min: -180, max: 180 },
  currentRun: {
    type: mongoose.Schema.Types.ObjectId,
    ref: runModel,
    default: null,
    validate: {
      validator: async (value) => {
        if (value) {
          const run = await runModel.findById(value);
          return run;
        }
      },
      message: 'Run does not exist.',
    },
  },
});

export default mongoose.model('Car', CarSchema);
