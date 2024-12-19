const BatteryData = require('../models/BatteryData');

// POST /api/battery/data
exports.storeBatteryData = async (req, res) => {
  try {
    const { battery_id, current, voltage, temperature, time } = req.body;

    const newData = new BatteryData({ battery_id, current, voltage, temperature, time });
    await newData.save();

    res.status(201).json({ message: 'Battery data stored successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to store battery data.' });
  }
};

// GET /api/battery/:id
exports.getBatteryData = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await BatteryData.find({ battery_id: id });

    if (!data.length) {
      return res.status(404).json({ message: 'No data found for this battery ID.' });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve battery data.' });
  }
};

// GET /api/battery/:id/:field
exports.getBatteryField = async (req, res) => {
  try {
    const { id, field } = req.params;
    const data = await BatteryData.find({ battery_id: id }).select(field);

    if (!data.length) {
      return res.status(404).json({ message: `No data found for battery ID ${id}.` });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve specific battery field.' });
  }
};

// GET /api/battery/:id/:field?start=:start&end=:end
exports.getBatteryFieldInRange = async (req, res) => {
  try {
    const { id, field } = req.params;
    const { start, end } = req.query;

    const data = await BatteryData.find({
      battery_id: id,
      time: { $gte: new Date(start), $lte: new Date(end) }
    }).select(field);

    if (!data.length) {
      return res.status(404).json({ message: `No data found for the given range.` });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve data within range.' });
  }
};
