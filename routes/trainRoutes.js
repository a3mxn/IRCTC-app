const express = require("express");
const router = express.Router();
const { addTrain } = require("../controllers/trainController");
const verifyToken = require("../middleware/verifyAdmin");

router.post("/add", verifyToken ,addTrain);

module.exports = router;
