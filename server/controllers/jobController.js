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
const searchJobs = async (req,res)=>{
    try{
        const keyword =
        req.query.keyword || "";

        const location =
        req.query.location || "";

        const jobs =
        await Job.find({
            title:{
                $regex:keyword,
                $options:"i"
            },

            location:{
                $regex:location,
                $options:"i"
            }
        }).populate(
            "createdBy",
            "name email"
        );
        res.status(200).json({
            count:jobs.length,
            jobs
        });
    }catch(error){
        console.log(error);

        res.status(500).json({
            message:"Server Error"
        });
    }
}
const deleteJob = async (req,res)=>{
    try{
        const {jobId}=req.params;

        const job =await Job.findById(jobId);

        if(!job){
            return res.status(404).json({
                message:"Job not found"
            });
        }

        if(
            job.createdBy.toString()!== req.user.id
        ){

            return res.status(403).json({
                message:"Not authorized"
            });

        }

        await Job.findByIdAndDelete(
            jobId
        );

        res.status(200).json({
            message:
            "Job deleted successfully"
        });

    }catch(error){

        console.log(error);

        res.status(500).json({
            message:"Server Error"
        });
    }
};
const updateJob = async(req,res)=>{
    try{

        const {jobId}=req.params;

        const job=await Job.findById(jobId);

        if(!job){

            return res.status(404).json({
                message:"Job not found"
            });

        }

        if(
            job.createdBy.toString()!== req.user.id
        ){

            return res.status(403).json({
                message:"Not authorized"
            });

        }

        const updatedJob =await Job.findByIdAndUpdate(

            jobId,

            req.body,

            {
                new:true
            }

        );

        res.status(200).json({
            message:
            "Job updated successfully",

            updatedJob
        });

    }catch(error){

        console.log(error);

        res.status(500).json({
            message:"Server Error"
        });

    }

};
module.exports = {createJob,getAllJobs,getMyJobs,searchJobs,deleteJob,updateJob};