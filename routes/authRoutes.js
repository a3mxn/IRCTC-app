const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");
const verifyAdmin = require("../middleware/verifyAdmin"); // Import the verifyAdmin middleware

// User Signup Route
router.post("/signup", signup); // No verifyAdmin needed for signup

// User Login Route
router.post("/login", verifyAdmin, login); // Apply verifyAdmin middleware to the login route

module.exports = router;
