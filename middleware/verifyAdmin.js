const dotenv = require("dotenv");

dotenv.config();

const verifyAdmin = (req, res, next) => {
  const apiKey = req.header("Authorization")?.replace("Bearer ", "");
  
  if (!apiKey) {
    return res.status(401).json({ error: "API key is required" });
  }

  if (apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(403).json({ error: "Unauthorized: Invalid API key" });
  }

  next();
};

module.exports = verifyAdmin;
