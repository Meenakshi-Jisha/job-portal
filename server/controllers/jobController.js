const Job = require("../models/Job");

const createJob = async (req, res) => {

    try {

        const {
        title,
        company,
        location,
        salary,
        description,
        skillsRequired,
        } = req.body;

        const job = await Job.create({
        title,
        company,
        location,
        salary,
        description,
        skillsRequired,

        // recruiter id from token
        createdBy: req.user.id,
        });

        res.status(201).json({
        message: "Job created successfully",
        job,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
        message: "Server Error",
        });

    }
    };

const getAllJobs = async (req, res) => {

    try {

        const jobs = await Job.find()
        .populate("createdBy", "name email")
        .sort({ createdAt: -1 });

        res.status(200).json({
        count: jobs.length,
        jobs,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
        message: "Server Error",
        });

    }
};
const getMyJobs = async (req, res) => {

    try {

        const jobs = await Job.find({
        createdBy: req.user.id
        });

        res.status(200).json({
        count: jobs.length,
        jobs
        });

    } catch(error){

        console.log(error);

        res.status(500).json({
        message:"Server Error"
        });

    }

};

    module.exports = {createJob,getAllJobs,getMyJobs};