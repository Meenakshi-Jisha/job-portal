const Bookmark =
require("../models/Bookmark");

const saveJob =async(req,res)=>{
    try{

        const {jobId}=req.params;

        const exists=await Bookmark.findOne({
            user:req.user.id,
            job:jobId
        });

        if(exists){

        return res.status(400).json({
            message:
            "Already saved"
        });
        }

        const bookmark=await Bookmark.create({
            user:req.user.id,
            job:jobId
        });

        res.status(201).json({
            message:
            "Job saved",

            bookmark

        });

    }catch(error){
        console.log(error);
        res.status(500).json({
        message:"Server Error"
        });

    }

};
const getSavedJobs =async(req,res)=>{
    try{
        const bookmarks=await Bookmark.find({
            user:req.user.id

        }).populate("job");

        res.status(200).json({

        count:
        bookmarks.length,

        bookmarks

        });

    }catch(error){

        res.status(500).json({
        message:"Server Error"
        });
    }
}
module.exports={saveJob,getSavedJobs}