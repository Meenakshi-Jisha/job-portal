import {useEffect,useState} from "react";
import {getMyApplications} from "../services/jobService";

function MyApplications(){
    const [applications,setApplications] = useState([]);
    useEffect(()=>{
        fetchApplications();
    },[]);
    const fetchApplications=async()=>{
        try{
            const res=await getMyApplications();
            console.log(res.data);
            setApplications(res.data.applications);
        }catch(error){
            console.log(error);
        }
        };
return(
<div>
    <h1>My Applications</h1>
    {
        applications.map((app)=>(
        <div key={app._id}>
            <h2>{app.job.title}</h2>
            <p>Company:{app.job.company}</p>
            <p>Location:{app.job.location}</p>
            <p>Status:{app.status}</p>
            <hr/>
        </div>
        ))
    }
</div>
)
}

export default MyApplications;