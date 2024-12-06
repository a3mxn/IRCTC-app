const express = require('express');
const trainController = require('../controllers/trainController');
const adminMiddleware = require('../middleware/verifyAdmin');
const router = express.Router();

// Admin only - Add a new train
// router.post('/add', adminMiddleware.verifyAdmin, trainController.addTrain);

module.exports = router;
