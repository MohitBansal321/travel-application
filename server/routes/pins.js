const router = require("express").Router();
const Pin = require("../models/Pin.js");

// Create a new pin
router.post("/", async (req, res) => {
  const pinCandidate = new Pin(req.body);

  try {
    const savedPin = await pinCandidate.save();
    console.log("\x1b[42m%s\x1b[0m", "[SUCCESS] Pin Added!");
    res.status(200).json(savedPin);
  } catch (err) {
    console.log("\x1b[41m%s\x1b[0m", "[FAILED] Pin can't be added!");
    res.status(500).json(err);
  }
});

// Get all pins
router.get("/", async (req, res) => {
  try {
    const pins = await Pin.find();
    console.log("\x1b[42m%s\x1b[0m", "[SUCCESS] Finding all pins!");
    res.status(200).json(pins);
  } catch (err) {
    console.log("\x1b[41m%s\x1b[0m", "[FAILED] Finding all pins!");
    res.status(500).json(err);
  }
});

module.exports = router;
