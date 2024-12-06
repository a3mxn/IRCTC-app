const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const path = require('path');
require('dotenv').config({ 
   path: path.resolve(__dirname, '.env') 
});

const app = express();

app.use(cors({
  origin: '*',
  credentials: true, 
}));
app.use(cookieParser());
app.use(bodyParser.json());

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
  } else {
    console.log('Connected to MySQL database');
  }
});

const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const trainRoutes = require('./routes/trainRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/trains', trainRoutes);

const PORT = process.env.PORT || 8787;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = db;
