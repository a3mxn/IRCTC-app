const mysql = require('mysql2');
const dotenv = require('dotenv');

// Load environment variables from .env file
const path = require('path');
require('dotenv').config({ 
   path: path.resolve(__dirname, '.env')  // Adjust the path to where your .env file is
});

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

module.exports = db;
