const express =require("express");

const router=express.Router();
const { saveJob,getSavedJobs,removeBookmark} = require("../controllers/bookmarkController");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");


router.post("/:jobId",authMiddleware,authorizeRoles("jobseeker"),saveJob);
router.get("/",authMiddleware,authorizeRoles("jobseeker"),getSavedJobs);
router.delete("/:jobId",authMiddleware,authorizeRoles("jobseeker"),removeBookmark);
module.exports=router;