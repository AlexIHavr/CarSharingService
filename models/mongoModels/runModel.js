import mongoose from 'mongoose';

const runModel = new mongoose.Schema({
  startDate: { type: Date, required: true, trim: true },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
});

export default mongoose.model('Run', runModel);
