import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { getMyJobs } from "../services/jobService";

function MyJobs(){
    const [jobs,setJobs]=useState([]);

    useEffect(()=>{
        fetchJobs();
    },[]);

    const fetchJobs=async()=>{
        try{
            const res=await getMyJobs();
            setJobs(res.data.jobs);
        }catch(error){
            console.log(error);
        }
    }
    return(
        <div>
            <h1>My Jobs</h1>
            {
                jobs.map((job)=>(
                    <div key={job._id}>
                        <h2>{job.title}</h2>
                        <p>{job.location}</p>
                        <Link to={`/applicants/${job._id}`}>view Applicants</Link>
                        <hr />
                    </div>
                ))
            }
        </div>
    )
}
export default MyJobs;