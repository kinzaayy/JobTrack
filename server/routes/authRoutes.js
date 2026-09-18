const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected test route: proves the JWT middleware works before building
// the real job-application API on top of it. Returns whichever user
// the token belongs to.
router.get("/me", protect, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;