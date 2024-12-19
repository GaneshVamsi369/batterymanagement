const mongoose = require('mongoose');

const BatteryDataSchema = new mongoose.Schema({
  battery_id: { type: String, required: true },
  current: { type: Number, required: true },
  voltage: { type: Number, required: true },
  temperature: { type: Number, required: true },
  time: { type: Date, required: true }
});

BatteryDataSchema.index({ battery_id: 1, time: 1 }); // Index for efficient querying

module.exports = mongoose.model('BatteryData', BatteryDataSchema);
