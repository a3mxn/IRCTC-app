const db = require('../config/db');

// Add a new train (Admin only)
exports.addTrain = (req, res) => {
  const { source, destination, totalSeats } = req.body;

  const query = 'INSERT INTO trains (source, destination, total_seats) VALUES (?, ?, ?)';
  db.query(query, [source, destination, totalSeats], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });

    res.status(201).json({ message: 'Train added successfully' });
  });
};
