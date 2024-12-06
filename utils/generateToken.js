const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = (userId, username) => {
  const payload = {
    userId,
    username
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { 
    expiresIn: '1h' 
  });

  return token;
};

module.exports = generateToken;