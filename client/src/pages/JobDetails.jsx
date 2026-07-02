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
        // <div>
        //     <h1>{job.title}</h1>
        //     <p>Company:{job.company}</p>
        //     <p>Location:{job.location}</p>
        //     <p>Salary:{job.salary}</p>
        //     <p>Description:{job.description}</p>
        //     <p>Skills: {job.skillsRequired?.join(", ")}</p>
        //     <p>Recruiter: {job.createdBy?.name}</p>
        //     <button onClick={handleApply}>Apply</button>
        // </div> 

        <div className="min-h-screen bg-gray-200 p-8">

<div className="max-w-4xl mx-auto">


<div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8">


<div className="flex flex-col md:flex-row md:justify-between gap-6">


<div>

<h1 className="text-4xl font-bold text-gray-900">

{job.title}

</h1>


<p className="text-xl text-gray-600 mt-3">

{job.company}

</p>


</div>


<div className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full h-fit font-medium">

{job.location}

</div>


</div>



<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">


<div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">


<h3 className="font-semibold text-gray-800 mb-2">

Salary

</h3>


<p className="text-gray-600">

💰 {job.salary}

</p>


</div>



<div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">


<h3 className="font-semibold text-gray-800 mb-2">

Recruiter

</h3>


<p className="text-gray-600">

{job.createdBy?.name}

</p>


</div>


</div>




<div className="mt-8">


<h2 className="text-xl font-semibold text-gray-900 mb-3">

Job Description

</h2>


<div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 text-gray-700">


{job.description}


</div>


</div>




<div className="mt-8">


<h2 className="text-xl font-semibold text-gray-900 mb-3">

Required Skills

</h2>


<div className="flex flex-wrap gap-3">


{

job.skillsRequired?.map((skill,index)=>(


<span

key={index}

className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm"

>

{skill}

</span>


))

}


</div>


</div>




<div className="mt-10 flex justify-end">


<button

onClick={handleApply}

className="bg-blue-700 text-white px-8 py-3 rounded-2xl hover:bg-blue-800 transition"

>

Apply Now

</button>


</div>



</div>


</div>


</div>
    )
}
export default JobDetails;