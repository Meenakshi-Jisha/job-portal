import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { getJobById,applyJob } from "../services/jobService";

function JobDetails(){
    const { id } = useParams();
    const [job,setJob]=useState(null)
    useEffect(()=>{
        fetchJob()
    },[id]);
    const fetchJob=async()=>{
        try{
            const res=await getJobById(id)
            setJob(res.data)
        }
        catch(error){
            console.log(error);
        }
    }
    const handleApply=async()=>{
        try{
            await applyJob(job._id)
            alert("Applied Successfully")
        }catch(error){
            console.log(error);
        }
    }
    if(!job){
        return <h2>Loading...</h2> 
    }
    return(
        <div>
            <h1>{job.title}</h1>
            <p>Company:{job.company}</p>
            <p>Location:{job.location}</p>
            <p>Salary:{job.salary}</p>
            <p>Description:{job.description}</p>
            <p>Skills: {job.skillsRequired?.join(", ")}</p>
            <p>Recruiter: {job.createdBy?.name}</p>
            <button onClick={handleApply}>Apply</button>
        </div> 
    )
}
export default JobDetails;