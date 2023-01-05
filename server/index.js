const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const application = express();
env.config();
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("\x1b[42m%s\x1b[0m", "[SUCCESS] Mongo DB connected!");
  })
  .catch((err) => console.log("\x1b[41m%s\x1b[0m", "[Failed] Connection to Mongo DB!!"));

application.listen(7800, () => {
  // displaying with green color
  console.log("\x1b[42m%s\x1b[0m", "[SUCCESS] Backend server started!");
});
