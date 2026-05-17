const Application = require("../models/Application");
const Job = require("../models/Job");

const applyJob = async (req, res) => {

    try {

        const jobId = req.params.jobId;
        const userId = req.user.id;

        // check already applied
        const alreadyApplied =await Application.findOne({
            job: jobId,
            applicant: userId,
        });

        if (alreadyApplied) {
        return res.status(400).json({
            message: "Already applied to this job",
        });
        }

        // create application
        const application =
        await Application.create({
            job: jobId,
            applicant: userId,
        });

        res.status(201).json({
        message: "Job applied successfully",
        application,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
        message: "Server Error",
        });
    }
    };
const getMyApplications = async (req, res) => {
    try {
        const applications =await Application.find({
            applicant: req.user.id
        })
        .populate({
            path: "job",
            // select:"title",
            populate: {
            path: "createdBy",
            select: "name email"
            }
        });

        res.status(200).json({
        count: applications.length,
        applications
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        message: "Server Error"
        });
    }
};
const getApplicantsForJob = async (req, res) => {
    try {
        const { jobId } = req.params;

        // find job
        const job = await Job.findById(jobId);

        if (!job) {
        return res.status(404).json({
            message: "Job not found"
        });
        }

        // check ownership
        if (
        job.createdBy.toString() !==
        req.user.id
        ) {
        return res.status(403).json({
            message: "Not authorized"
        });
        }

        const applications =
        await Application.find({
            job: jobId
        })
        .populate(
            "applicant",
            "name email"
        );
        res.status(200).json({
        count: applications.length,
        applications
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
        message:"Server Error"
        });
    }
};
const updateApplicationStatus = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const { status } = req.body;

        // validate input
        if (
        !["accepted","rejected"]
        .includes(status)
        ) {
        return res.status(400).json({
            message:
            "Status must be accepted or rejected"
        });
        }

        const application =
        await Application.findById(
            applicationId
        ).populate("job");

        if (!application) {
        return res.status(404).json({
            message:"Application not found"
        });
        }

        // ownership check
        if (
        application.job.createdBy.toString()
        !== req.user.id
        ) {
        return res.status(403).json({
            message:"Not authorized"
        });
        }

        application.status = status;

        await application.save();

        res.status(200).json({
        message:"Status updated",
        application
        });

    } catch(error){
        console.log(error);
        res.status(500).json({
        message:"Server Error"
        });
    }
};
module.exports = {applyJob,getMyApplications, getApplicantsForJob,updateApplicationStatus};