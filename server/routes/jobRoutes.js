const express = require("express");

const router = express.Router();

const { createJob,getAllJobs,getMyJobs } = require("../controllers/jobController");

const authMiddleware = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

// recruiter only
router.post("/create",authMiddleware,authorizeRoles("recruiter"),createJob);
router.get("/", getAllJobs);
router.get("/my-jobs",authMiddleware,authorizeRoles("recruiter"),getMyJobs);
module.exports = router;