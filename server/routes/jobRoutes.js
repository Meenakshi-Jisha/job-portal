const express = require("express");

const router = express.Router();

const { createJob,getAllJobs,getMyJobs,searchJobs,deleteJob,updateJob, getJobById } = require("../controllers/jobController");

const authMiddleware = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

// recruiter only
router.post("/create",authMiddleware,authorizeRoles("recruiter"),createJob);
router.get("/", getAllJobs);
router.get("/my-jobs",authMiddleware,authorizeRoles("recruiter"),getMyJobs);
// register specific routes before dynamic parameter routes
router.get("/search",searchJobs);
router.get("/:id",getJobById)
router.delete("/:jobId",authMiddleware,authorizeRoles("recruiter"),deleteJob);
router.put("/:jobId",authMiddleware,authorizeRoles("recruiter"),updateJob);
module.exports = router;