const mongoose = require("mongoose");
const dns = require("dns");

// Some networks/ISPs fail to resolve MongoDB Atlas's SRV DNS records
// (error: "querySrv ECONNREFUSED"). Pointing Node's resolver at Google's
// public DNS fixes this for this process only — it does not change any
// system-wide network settings.
dns.setServers(["8.8.8.8", "8.8.4.4"]);

/**
 * Connects to MongoDB using the URI from environment variables.
 * Called once at server startup. If it fails, the error is logged
 * and the process exits — a backend with no working database
 * connection shouldn't silently keep running.
 */
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;