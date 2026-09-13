require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// Health check — confirms the server is up and reachable.
// Real API routes (auth, applications) get mounted here in later phases.
app.get("/", (req, res) => {
  res.send("JobTrack API is running.");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`JobTrack server running on port ${PORT}`);
});