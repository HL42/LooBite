const express = require("express");
const mongoose = require("mongoose");

const reviewRoutes = require("./routes/reviewRoutes");
const searchRoutes = require("./routes/searchRoutes");
const crowdRoutes = require("./routes/crowdRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api/reviews", reviewRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/crowd", crowdRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/loobite")
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });