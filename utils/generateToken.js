const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Initialize dotenv to load environment variables
dotenv.config();

// Function to generate JWT token
const generateToken = (userId, username) => {
  const payload = {
    userId,
    username
  };

  // Create token with expiration of 1 hour
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

  return token;
};

module.exports = generateToken;
