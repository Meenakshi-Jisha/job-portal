const express = require("express");

const router = express.Router();

const {applyJob,getMyApplications,getApplicantsForJob} = require("../controllers/applicationController");

const authMiddleware = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

// only jobseekers can apply
router.post("/apply/:jobId",authMiddleware,authorizeRoles("jobseeker"),applyJob);
router.get("/my",authMiddleware,authorizeRoles("jobseeker"),getMyApplications);
router.get("/job/:jobId",authMiddleware,authorizeRoles("recruiter"),getApplicantsForJob);

module.exports = router;