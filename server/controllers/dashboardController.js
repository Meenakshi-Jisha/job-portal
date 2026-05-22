const Job =require("../models/Job");

const Application =require("../models/Application");

const getDashboardStats =async(req,res)=>{
    try{
        const jobs=await Job.find({
        createdBy:req.user.id
        });

        const jobIds=jobs.map(job=>job._id);

        const applications=await Application.find({
        job:{
            $in:jobIds
        }
        });

        const accepted=applications.filter(app=>
            app.status==="accepted").length;

        const rejected=applications.filter(app=>
            app.status==="rejected").length;

        const pending=applications.filter(app=>
            app.status==="pending").length;

        res.status(200).json({

        totalJobs:jobs.length,
        totalApplications:applications.length,
        accepted,
        rejected,
        pending
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
        message:
        "Server Error"
        });
    }

};

module.exports={getDashboardStats}