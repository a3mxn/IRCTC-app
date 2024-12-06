const dotenv = require("dotenv");

// Initialize dotenv to load environment variables
dotenv.config();

const verifyAdmin = (req, res, next) => {
  const apiKey = req.header("Authorization")?.replace("Bearer ", "");
  
  if (!apiKey) {
    return res.status(401).json({ error: "API key is required" });
  }

  // Check if the API key matches the one in the environment
  if (apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(403).json({ error: "Unauthorized: Invalid API key" });
  }

  // If API key is valid, proceed to the next middleware
  next();
};

module.exports = verifyAdmin;
