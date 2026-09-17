const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");
const path = require("path");
const cors = require("cors");

const PORT = process.env.PORT || 7800;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Load environment variables
env.config();
mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("\x1b[42m%s\x1b[0m", "[SUCCESS] Mongo DB connected!");
  })
  .catch((err) => {
    console.log("\x1b[41m%s\x1b[0m", "[Failed] Connection to Mongo DB!!");
    console.error(err);
  });

// Routes
app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  // Serve static client build in production
  app.use(express.static(path.join(__dirname1, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "../client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

app.listen(PORT, () => {
  console.log("\x1b[42m%s\x1b[0m", "[SUCCESS] Backend server started!");
});
