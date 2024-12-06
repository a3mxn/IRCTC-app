const express = require('express');
const bookingController = require('../controllers/bookingController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/search-train', bookingController.searchTrain);

router.post('/book', verifyToken, bookingController.bookSeat);

router.get('/my-bookings', verifyToken, bookingController.getBookingDetails);

module.exports = router;
