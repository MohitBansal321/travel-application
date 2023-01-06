const router = require("express").Router();

const Pin = require("../models/Pin.js");

// Creating pin

router.post("/", async (req, res) => {
  const pinCandidate = new Pin(req.body);

  try {
    const savedPin = await pinCandidate.save();
    res.status(200).json(savedPin);
    console.log("\x1b[42m%s\x1b[0m", "[SUCCESS] Pin Added!");
  } catch (err) {
    console.log("\x1b[41m%s\x1b[0m", "[FAILED] Pin can't Added!");
    res.status(500).json(err);
  }
});

// getting all pins

router.get("/", async (req, res) => {
  try {
    const pins=await Pin.find();
    console.log("\x1b[42m%s\x1b[0m", "[SUCCESS] Finding All pins!");
    res.status(200).json(pins);
  } catch (err) {console.log("\x1b[41m%s\x1b[0m", "[FAILED] Finding All pins!");
  res.status(500).json(err);}
});

module.exports=router