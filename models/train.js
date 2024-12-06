const db = require('../config/db');

// Train Model
const Train = {
  addTrain: (source, destination, totalSeats, callback) => {
    const query = 'INSERT INTO trains (source, destination, total_seats) VALUES (?, ?, ?)';
    db.query(query, [source, destination, totalSeats], callback);
  },

  getTrainsBetweenStations: (source, destination, callback) => {
    const query = 'SELECT * FROM trains WHERE source = ? AND destination = ?';
    db.query(query, [source, destination], callback);
  },

  updateSeats: (trainId, seatsAvailable, callback) => {
    const query = 'UPDATE trains SET total_seats = ? WHERE id = ?';
    db.query(query, [seatsAvailable, trainId], callback);
  }
};

module.exports = Train;