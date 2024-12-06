const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const  generateToken  = require("../utils/generateToken"); // Adjusted import for generateToken
const mysql = require("mysql2");
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = require("../config/db"); // Updated import for DB config

console.log(process.env.DB_USER);
// Create database connection
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


// Signup Controller
const signup = (req, res) => {
  const { username, email, password, role } = req.body;
  
  // Check if all fields are provided
  if (!username || !email || !password || !role) {
    return res.status(400).json({ error: "Please provide all required fields" });
  }
  
  console.log("Executing query:", "SELECT * FROM users WHERE email = ?", [email]);
  
  // Check if user already exists
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }

    if (result.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    db.query(
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
      [username, email, hashedPassword, role],
      (err, result) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Database error" });
        }

        // Generate JWT token with userId and username
        const token = generateToken(result.insertId, username);

        res.status(201).json({
          message: "User registered successfully",
          token,
          user: { username, email, role },
        });
      }
    );
  });
};

// Login Controller
const login = (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ error: "Please provide email and password" });
  }

  // Check if user exists
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }

    if (result.length === 0) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, result[0].password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT token with userId and username
    const token = generateToken(result[0].id, result[0].username);

    res.status(200).json({
      message: "Login successful",
      token,
      user: { username: result[0].username, email: result[0].email, role: result[0].role },
    });
  });
};

module.exports = { signup, login };