const express = require("express");
const {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
} = require("../controllers/applicationController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Every route here requires a valid token — no public access to job data.
router.use(protect);

router.post("/", createApplication);
router.get("/", getApplications);
router.get("/:id", getApplicationById);
router.put("/:id", updateApplication);
router.delete("/:id", deleteApplication);

module.exports = router;