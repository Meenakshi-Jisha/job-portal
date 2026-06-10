const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
    // get data from request body
    const { name, email, password, role } = req.body;

    // validate required fields
    if(!name || !email || !password){
        return res.status(400).json({
            message:"All fields required"
        });
    }

    // check if user already exists
    const existingUser = await User.findOne({ email });

        if (existingUser) {
        return res.status(400).json({
            message: "User already exists",
        });
        }
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create new user
        const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
        });

        // send response
        res.status(201).json({
        message: "User registered successfully",
        user,
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
        message: "Server Error",
        });
    }
    };

const loginUser = async (req, res) => {
    try {
        // get email and password
        const { email, password } = req.body;

        // validate required fields
        if(!email || !password){
            return res.status(400).json({
                message:"All fields required"
            });
        }

        // check if user exists
        const user = await User.findOne({ email });

        if (!user) {
        return res.status(400).json({
            message: "Invalid credentials",
        });
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
        return res.status(400).json({
            message: "Invalid credentials",
        });
        }

        // generate JWT token
        const token = jwt.sign(
        {
            id: user._id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
        );

        // send response
        res.status(200).json({
        message: "Login successful",
        token,
        user,
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
        message: "Server Error",
        });
    }
};
const uploadResume=async(req,res)=>{
    try{
        if(!req.file){
            return res.status(400).json({
                message:"No file uploaded"
            });
        }
        const user=await User.findById(req.user.id);
        user.resume=req.file.path;
        await user.save();

        res.status(200).json({
            message:"Resume uploaded",
            resume:req.file.path
        });
    }catch(error){
        res.status(500).json({
            message:"Server Error"
        }); 
    }
}

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(
        req.user.id
        ).select("-password");

        if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });

    }

};
const updateProfile =async(req,res)=>{
    try{
            const user=await User.findById(req.user.id);
            if(!user){
                return res.status(404)
                .json({
                    message:
                    "User not found"
                });
            }
            const {name,bio,skills,phone}=req.body;
            if(name)
                user.name=name;

            if(bio)
                user.bio=bio;

            // if(skills){
            //     user.skills=skills
            // }
            if(skills){
                user.skills = Array.isArray(skills) ? skills : skills.split(",");
            }

            if(phone)
                user.phone=phone;

            await user.save();
            res.status(200).json({
                message:"Profile updated",
                user
            });
        }catch(error){
            console.log(error);
            res.status(500).json({
            message:"Server Error"
        });
    }
}

const changePassword =async(req,res)=>{
    try{
        const {oldPassword,newPassword}=req.body;
        const user=await User.findById(req.user.id);

        if(!user){
            return res.status(404).json({
                message:"User not found"
            });
        }

        const isMatch=await bcrypt.compare(oldPassword,user.password);

        if(!isMatch){
            return res.status(400).json({
                message:"Old password incorrect"
            });
        }

        const salt=await bcrypt.genSalt(10);

        user.password=await bcrypt.hash(newPassword,salt);

        await user.save();
        res.status(200).json({
            message:"Password updated"
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"Server Error"
        });
}
};
module.exports = {registerUser,loginUser,getProfile,uploadResume,updateProfile,changePassword};