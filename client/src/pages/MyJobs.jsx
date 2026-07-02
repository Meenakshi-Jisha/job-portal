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
        // <div>
        //     <h1>My Jobs</h1>
        //     {
        //         jobs.map((job)=>(
        //             <div key={job._id}>
        //                 <h2>{job.title}</h2>
        //                 <p>{job.location}</p>
        //                 <Link to={`/applicants/${job._id}`}>view Applicants</Link>
        //                 <hr />
        //             </div>
        //         ))
        //     }
        // </div>

<div className="min-h-screen bg-gray-200 p-8">

<div className="max-w-5xl mx-auto">


<h1 className="text-4xl font-bold text-gray-900 mb-10">

My Jobs

</h1>



{

jobs.length===0

?

(

<div className="bg-white border border-gray-200 rounded-3xl p-10 text-center shadow-sm">

<h2 className="text-xl font-semibold text-gray-700">

No jobs posted yet

</h2>

<p className="text-gray-500 mt-2">

Create your first job posting

</p>

</div>

)


:

(

<div className="space-y-6">


{

jobs.map((job)=>(


<div

key={job._id}

className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8 hover:shadow-md transition"

>


<div className="flex flex-col md:flex-row md:justify-between md:items-start gap-5">


<div>


<h2 className="text-2xl font-bold text-gray-900">

{job.title}

</h2>


<p className="text-gray-600 mt-2">

{job.company}

</p>


<div className="mt-4 flex flex-wrap gap-3">


<span className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700">

📍 {job.location}

</span>


<span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">

💰 {job.salary}

</span>


</div>


</div>



<div>

<span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">

Posted

</span>

</div>


</div>



<div className="mt-8">


<Link

to={`/applicants/${job._id}`}

>

<button

className="bg-blue-700 text-white px-6 py-3 rounded-xl hover:bg-blue-800 transition"

>

View Applicants

</button>


</Link>


</div>



</div>


))

}


</div>

)

}


</div>

</div>
    )
}
export default MyJobs;