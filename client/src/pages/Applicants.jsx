import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { getApplicants,updateStatus } from "../services/jobService";

function Applicants(){
    const {jobId}=useParams();
    const [applications,setApplications]=useState([])
    useEffect(()=>{
        fetchApplicants()
    },[])
    const fetchApplicants=async()=>{
        try{
            const res=await getApplicants(jobId)
            setApplications(res.data.applications)
        }catch(error){
            console.log(error);
            
        }
    }
    const handleStatus=async(id,status)=>{
        try{
            await updateStatus(id,status)
            alert("status updated")
            fetchApplicants()
        }catch(error){
            console.log(error);
            
        }
    }
    return(
        <div>
            <h1>Applicants</h1>
            {
                applications.map((app) => (
                    <div key={app._id}>
                        <h2>{app.applicant.name}</h2>
                        <p>Email: {app.applicant.email}</p>
                        <p>Status: {app.status}</p>
                        <button onClick={() => handleStatus(app._id, "accepted")}>Accept</button>
                        <button onClick={() => handleStatus(app._id, "rejected")}>Reject</button>
                        <hr />
                    </div>
                ))
            }
        </div>
    )
}  
export default Applicants;