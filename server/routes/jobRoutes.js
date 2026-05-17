const express = require("express");

const router = express.Router();

const { createJob,getAllJobs } = require("../controllers/jobController");

const authMiddleware = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

// recruiter only
router.post("/create",authMiddleware,authorizeRoles("recruiter"),createJob);
router.get("/", getAllJobs);

module.exports = router;