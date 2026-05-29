import {useEffect,useState} from "react";
import {getAllJobs,applyJob} from "../services/jobService";

function Jobs(){ 
  const [jobs,setJobs]=useState([]);
  useEffect(()=>{
    fetchJobs();
  },[]);

const fetchJobs=async()=>{
  try{
    const res=await getAllJobs();
    console.log(res.data);
    setJobs(
    res.data.jobs
    );
  }catch(error){
    console.log(error);
  }
};

const handleApply=async(jobId)=>{
  try{
    const res=await applyJob(jobId);
    alert(res.data.message);
  }catch(error){
    console.log(error);
    console.log(error.response);
    alert("Application failed");
  }
};

return(
  <div>
    <h1>All Jobs</h1>
    {
    jobs.map((job)=>(
      <div key={job._id}>
        <h2>{job.title}</h2>
        <p>Company:{job.company}</p>
        <p>Location:{job.location}</p>
        <p>Salary:{job.salary}</p>
        <button onClick={()=>handleApply(job._id)}>Apply</button>
        <hr/>
      </div>
    ))
    }
  </div>
)
}

export default Jobs;