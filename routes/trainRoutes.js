const express = require("express");
const router = express.Router();
const { addTrain } = require("../controllers/trainController");
const verifyAdmin = require("../middleware/verifyAdmin");

router.post("/add", verifyAdmin ,addTrain);

module.exports = router;
