const Application = require("../models/Application");

/**
 * POST /api/applications
 * Creates a new application owned by the logged-in user.
 */
async function createApplication(req, res) {
  try {
    const { company, position, status, dateApplied, jobLink, notes } = req.body;

    if (!company || !position) {
      return res.status(400).json({ message: "Company and position are required." });
    }

    const application = await Application.create({
      user: req.user._id,
      company,
      position,
      status,
      dateApplied,
      jobLink,
      notes,
    });

    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ message: "Failed to create application.", error: err.message });
  }
}

/**
 * GET /api/applications
 * Returns all applications belonging to the logged-in user, newest first.
 */
async function getApplications(req, res) {
  try {
    const applications = await Application.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch applications.", error: err.message });
  }
}

/**
 * GET /api/applications/:id
 * Returns a single application — only if it belongs to the logged-in user.
 */
async function getApplicationById(req, res) {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found." });
    }

    if (application.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to view this application." });
    }

    res.status(200).json(application);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch application.", error: err.message });
  }
}

/**
 * PUT /api/applications/:id
 * Updates an application — only if it belongs to the logged-in user.
 */
async function updateApplication(req, res) {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found." });
    }

    if (application.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this application." });
    }

    const { company, position, status, dateApplied, jobLink, notes } = req.body;

    if (company !== undefined) application.company = company;
    if (position !== undefined) application.position = position;
    if (status !== undefined) application.status = status;
    if (dateApplied !== undefined) application.dateApplied = dateApplied;
    if (jobLink !== undefined) application.jobLink = jobLink;
    if (notes !== undefined) application.notes = notes;

    const updated = await application.save();
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update application.", error: err.message });
  }
}

/**
 * DELETE /api/applications/:id
 * Deletes an application — only if it belongs to the logged-in user.
 */
async function deleteApplication(req, res) {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found." });
    }

    if (application.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this application." });
    }

    await application.deleteOne();
    res.status(200).json({ message: "Application deleted." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete application.", error: err.message });
  }
}

module.exports = {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
};