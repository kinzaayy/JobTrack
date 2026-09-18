const jwt = require("jsonwebtoken");

/**
 * Signs a JWT containing the user's id. Expires in 30 days —
 * reasonable for a portfolio project (no refresh-token flow needed).
 */
function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "30d" });
}

module.exports = generateToken;