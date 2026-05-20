const express = require("express");

const router = express.Router();

const { createJob,getAllJobs,getMyJobs,searchJobs,deleteJob } = require("../controllers/jobController");

const authMiddleware = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

// recruiter only
router.post("/create",authMiddleware,authorizeRoles("recruiter"),createJob);
router.get("/", getAllJobs);
router.get("/my-jobs",authMiddleware,authorizeRoles("recruiter"),getMyJobs);
router.get("/search",searchJobs);
router.delete("/:jobId",authMiddleware,authorizeRoles("recruiter"),deleteJob);
module.exports = router;