const db = require('../config/db');

// Booking Model
const Booking = {
  createBooking: (userId, trainId, callback) => {
    const query = 'INSERT INTO bookings (user_id, train_id) VALUES (?, ?)';
    db.query(query, [userId, trainId], callback);
  },

  getUserBookings: (userId, callback) => {
    const query = 'SELECT * FROM bookings WHERE user_id = ?';
    db.query(query, [userId], callback);
  }
};

module.exports = Booking;
