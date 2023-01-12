const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const pinRoute=require("./routes/pins");
const userRoute=require("./routes/users");
const cors = require('cors');
const PORT=process.env.PORT || 7800
const application = express();
application.use(express.json())
application.use(cors())

env.config();
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("\x1b[42m%s\x1b[0m", "[SUCCESS] Mongo DB connected!");
  })
  .catch((err) => console.log("\x1b[41m%s\x1b[0m", "[Failed] Connection to Mongo DB!!"));


application.use("/api/pins",pinRoute)
application.use("/api/users",userRoute)
application.listen(PORT, () => {
  // displaying with green color
  console.log("\x1b[42m%s\x1b[0m", "[SUCCESS] Backend server started!");
});
