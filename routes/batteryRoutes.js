const express = require('express');
const router = express.Router();
const batteryController = require('../controllers/batteryController');

router.post('/data', batteryController.storeBatteryData);
router.get('/:id', batteryController.getBatteryData);
router.get('/:id/:field', batteryController.getBatteryField);
router.get('/:id/:field', batteryController.getBatteryFieldInRange);

module.exports = router;
