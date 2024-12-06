const db = require('../config/db');

// Check seat availability
exports.checkAvailability = (req, res) => {
  const { source, destination } = req.body;

  const query = 'SELECT * FROM trains WHERE source = ? AND destination = ?';
  db.query(query, [source, destination], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(404).json({ error: 'No trains available' });

    res.status(200).json({ trains: results });
  });
};

// Book a seat
exports.bookSeat = (req, res) => {
  const { trainId } = req.body;
  const userId = req.userId;  // From JWT

  // Check if seats are available
  const query = 'SELECT * FROM trains WHERE id = ?';
  db.query(query, [trainId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0 || results[0].total_seats <= 0) {
      return res.status(400).json({ error: 'No seats available' });
    }

    // Book the seat (update seats)
    const updateQuery = 'UPDATE trains SET total_seats = total_seats - 1 WHERE id = ?';
    db.query(updateQuery, [trainId], (err) => {
      if (err) return res.status(500).json({ error: 'Database error' });

      // Record the booking
      const insertQuery = 'INSERT INTO bookings (user_id, train_id) VALUES (?, ?)';
      db.query(insertQuery, [userId, trainId], (err) => {
        if (err) return res.status(500).json({ error: 'Database error' });

        res.status(200).json({ message: 'Seat booked successfully' });
      });
    });
  });
};

// Get booking details
exports.getBookingDetails = (req, res) => {
  const userId = req.userId;  // From JWT

  const query = 'SELECT * FROM bookings WHERE user_id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });

    res.status(200).json({ bookings: results });
  });
};
