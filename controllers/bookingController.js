const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const searchTrain = (req, res) => {
  const { source, destination } = req.body;

  if (!source || !destination) {
    return res.status(400).json({ error: 'Source and destination are required' });
  }

  const query = 'SELECT * FROM trains WHERE source = ? AND destination = ?';
  pool.query(query, [source, destination], (err, results) => {
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

  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: 'Database connection error' });
    }

    connection.beginTransaction((err) => {
      if (err) {
        connection.release();
        return res.status(500).json({ error: 'Transaction start error' });
      }

      const checkSeatQuery = 'SELECT * FROM bookings WHERE train_id = ? AND seat_number = ? FOR UPDATE';
      connection.query(checkSeatQuery, [trainId, seatNumber], (err, results) => {
        if (err) {
          return connection.rollback(() => {
            connection.release();
            res.status(500).json({ error: 'Database error during seat check' });
          });
        }

        if (results.length > 0) {
          return connection.rollback(() => {
            connection.release();
            res.status(400).json({ error: 'Seat is already booked' });
          });
        }

        const bookSeatQuery = 'INSERT INTO bookings (train_id, user_id, seat_number) VALUES (?, ?, ?)';
        connection.query(bookSeatQuery, [trainId, userId, seatNumber], (err) => {
          if (err) {
            return connection.rollback(() => {
              connection.release();
              res.status(500).json({ error: 'Error booking seat' });
            });
          }

          connection.commit((err) => {
            if (err) {
              return connection.rollback(() => {
                connection.release();
                res.status(500).json({ error: 'Transaction commit error' });
              });
            }

            connection.release();
            res.status(200).json({ message: 'Seat booked successfully' });
          });
        });
      });
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

  pool.query(query, [userId], (err, results) => {
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
