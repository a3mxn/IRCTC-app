const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// Load environment variables from .env file
// dotenv.config();
const path = require('path');
require('dotenv').config({ 
   path: path.resolve(__dirname, '.env')  // Adjust the path to where your .env file is
});

// Initialize Express app
const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Create MySQL database connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Check database connection
db.getConnection((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    process.exit(1); // Exit the process if database connection fails
  } else {
    console.log('Connected to MySQL database');
  }
});

// Define routes
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const trainRoutes = require('./routes/trainRoutes');

// Use routes in the app
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/trains', trainRoutes);

// Start server
const PORT = process.env.PORT || 8787;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = db;
