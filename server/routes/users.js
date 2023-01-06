const router = require("express").Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt");

//  Register
router.post("/register", async (req, res) => {
  try {
    // Genrating password
    const salt = await bcrypt.genSalt(10);
    const cryptedPass = await bcrypt.hash(req.body.password, salt);

    // Creating new user
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: cryptedPass,
    });

    // push user to DB
    const savedUser = await newUser.save();
    console.log("\x1b[42m%s\x1b[0m", "[SUCCESS] User Added!");
    res.status(200).json(savedUser._id);

  } 
  catch (err) {
    console.log("\x1b[41m%s\x1b[0m", "[FAILED] User can't Added!");
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    // Find a specific user
    const user = await User.findOne({ userName: req.body.userName });

    if (!user) {
      console.log("\x1b[41m%s\x1b[0m", "[FAILED] Logging to user!");
      res.status(400).json("Wrong Username or password!");
    } 
    else {

      // validate password
      const validPassword = await bcrypt.compare(req.body.password, user.password);

      if (!validPassword) {
        console.log("\x1b[41m%s\x1b[0m", "[FAILED] Logging to user!");
        res.status(400).json("Wrong Username or password!");
      }
      else{
        console.log("\x1b[42m%s\x1b[0m", "[SUCCESS] Logging to user!");
        res.status(200).json("Successfully Logging!");
      }
    }
  } 
  catch (err) {
    console.log("\x1b[41m%s\x1b[0m", "[FAILED] Logging in with user!");
    res.status(500).json(err);
  }
});

module.exports=router