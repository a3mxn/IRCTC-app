const mysql = require('mysql2');
const dotenv = require('dotenv');
const path = require('path');
require('dotenv').config({ 
   path: path.resolve(__dirname, '.env')  
});

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.getConnection((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    process.exit(1);
  }
});

module.exports = db;
