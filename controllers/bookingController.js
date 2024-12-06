const db = require('../config/db');

const searchTrain = (req, res) => {
  const { source, destination } = req.body;

  if (!source || !destination) {
    return res.status(400).json({ error: 'Source and destination are required' });
  }

  const query = 'SELECT * FROM trains WHERE source = ? AND destination = ?';
  db.query(query, [source, destination], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json({ trains: results });
  });
};

const bookSeat = (req, res) => {
  const { trainId, seatNumber } = req.body;

  if (!trainId || !seatNumber) {
    return res.status(400).json({ error: 'Train ID and seat number are required' });
  }

  const userId = req.user.id;

  const checkSeatQuery = 'SELECT * FROM bookings WHERE train_id = ? AND seat_number = ?';
  db.query(checkSeatQuery, [trainId, seatNumber], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'Seat is already booked' });
    }

    const bookSeatQuery = 'INSERT INTO bookings (train_id, user_id, seat_number) VALUES (?, ?, ?)';
    db.query(bookSeatQuery, [trainId, userId, seatNumber], (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error booking seat' });
      }

      res.status(200).json({ message: 'Seat booked successfully' });
    });
  });
};

const getBookingDetails = (req, res) => {
  const userId = req.user.id;

  const query = `
    SELECT b.id AS booking_id, t.id AS train_id, t.source, t.destination, b.seat_number
    FROM bookings b
    JOIN trains t ON b.train_id = t.id
    WHERE b.user_id = ?
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json({ bookings: results });
  });
};

module.exports = {
  searchTrain,
  bookSeat,
  getBookingDetails,
};
