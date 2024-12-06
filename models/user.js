const db = require('../config/db'); // Assuming you have a db.js for mysql connection

// User schema as an object for MySQL
const User = {
  create: (username, email, password, role, callback) => {
    const query = "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";
    db.query(query, [username, email, password, role], callback);
  },

  findByEmail: (email, callback) => {
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], callback);
  },

  findById: (id, callback) => {
    const query = "SELECT * FROM users WHERE id = ?";
    db.query(query, [id], callback);
  },

  // Add other methods as needed (e.g., update, delete)
};

module.exports = User;
