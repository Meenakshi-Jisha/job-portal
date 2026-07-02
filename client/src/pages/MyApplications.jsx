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
    
/* <div>
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
</div> */
    <div className="min-h-screen bg-gray-200 p-8">
        <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-10">My Applications</h1>
            <div className="space-y-6">
                {
                    applications.map((app)=>(
                    <div key={app._id} className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8 hover:shadow-md transition">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-5">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{app.job.title}</h2>
                                <p className="text-gray-600 mt-2">{app.job.company}</p>
                                <div className="mt-4 space-y-2 text-gray-700">
                                    <p>📍 {app.job.location}</p>
                                    <p>💰 {app.job.salary}</p>
                                </div>
                            </div>
                            <div>
                                <span className={`px-4 py-2 rounded-full text-sm font-medium 
                                                    ${app.status==="accepted"?"bg-green-100 text-green-700":app.status==="rejected"?"bg-red-100 text-red-700":"bg-yellow-100 text-yellow-700"}`
                                                } >{app.status}
                                </span>
                            </div>
                        </div>
                    </div>
                    ))
                }
            </div>
                {applications.length===0 &&(<div className="bg-white rounded-2xl p-8 text-center text-gray-500">No applications yet</div>)}
            </div>
    </div>
)


}

export default MyApplications;