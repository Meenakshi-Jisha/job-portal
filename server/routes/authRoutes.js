const express = require("express");

const router = express.Router();

const { registerUser ,loginUser,updateProfile,uploadResume} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const upload =require("../middleware/uploadMiddleware");
// register route
router.post("/register", registerUser);
// login route
router.post("/login", loginUser);

router.get("/profile", authMiddleware, (req, res) => {
    res.status(200).json({
        message: "Welcome to profile",
        user: req.user,
    });
});
router.get("/recruiter-dashboard",authMiddleware,authorizeRoles("recruiter"),(req, res) => {
        res.json({
        message: "Welcome Recruiter",
        });
    }
);
router.put("/profile",authMiddleware,updateProfile);
router.post("/upload-resume",authMiddleware,upload.single("resume"),uploadResume);
module.exports = router;