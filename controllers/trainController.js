const Train = require("../models/train");

const addTrain = (req, res) => {
  const { source, destination, totalSeats } = req.body;
  Train.addTrain(source, destination, totalSeats, (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.status(201).json({ message: "Train added successfully", trainId: result.insertId });
  });
};

module.exports = { addTrain };
