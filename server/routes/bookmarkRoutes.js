const express =require("express");

const router=express.Router();
const { saveJob,getSavedJobs} = require("../controllers/bookmarkController");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");


router.post("/:jobId",authMiddleware,authorizeRoles("jobseeker"),saveJob);
router.get("/",authMiddleware,authorizeRoles("jobseeker"),getSavedJobs);

module.exports=router;