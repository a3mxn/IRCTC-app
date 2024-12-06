const express = require('express');
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Check seat availability
router.post('/check-availability', bookingController.checkAvailability);

// Book a seat
router.post('/book', authMiddleware.verifyToken, bookingController.bookSeat);

// Get booking details
router.get('/my-bookings', authMiddleware.verifyToken, bookingController.getBookingDetails);

module.exports = router;
