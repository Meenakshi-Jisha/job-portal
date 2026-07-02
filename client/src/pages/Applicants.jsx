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
        // <div>
        //     <h1>Applicants</h1>
        //     {
        //         applications.map((app) => (
        //             <div key={app._id}>
        //                 <h2>{app.applicant.name}</h2>
        //                 <p>Email: {app.applicant.email}</p>
        //                 <p>Status: {app.status}</p>
        //                 <button onClick={() => handleStatus(app._id, "accepted")}>Accept</button>
        //                 <button onClick={() => handleStatus(app._id, "rejected")}>Reject</button>
        //                 <hr />
        //             </div>
        //         ))
        //     }
        // </div>
        <div className="min-h-screen bg-gray-200 p-8">

<div className="max-w-5xl mx-auto">


<h1 className="text-4xl font-bold text-gray-900 mb-10">

Applicants

</h1>



{

applications.length===0

?

(

<div className="bg-white border border-gray-200 rounded-3xl p-10 text-center shadow-sm">

<h2 className="text-xl font-semibold text-gray-700">

No applicants yet

</h2>

<p className="text-gray-500 mt-2">

Applicants will appear here

</p>

</div>

)


:

(

<div className="space-y-6">


{

applications.map((app)=>(


<div

key={app._id}

className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8 hover:shadow-md transition"

>


<div className="flex flex-col md:flex-row md:justify-between md:items-start gap-5">



<div>


<div className="flex items-center gap-4">


<div className="w-14 h-14 rounded-full bg-gray-400 text-white flex items-center justify-center text-xl font-bold">

{app.applicant.name?.charAt(0)}

</div>


<div>


<h2 className="text-2xl font-bold text-gray-900">

{app.applicant.name}

</h2>


<p className="text-gray-600">

{app.applicant.email}

</p>


</div>


</div>



<div className="mt-5">

<span

className={

`px-4 py-2 rounded-full text-sm font-medium

${
app.status==="accepted"

?

"bg-green-100 text-green-700"

:

app.status==="rejected"

?

"bg-red-100 text-red-700"

:

"bg-yellow-100 text-yellow-700"

}`

}

>

{app.status}

</span>

</div>



</div>





<div className="flex gap-4 items-center">


<button

onClick={()=>
handleStatus(app._id,"accepted")
}

className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition"

>

Accept

</button>



<button

onClick={()=>
handleStatus(app._d,"rejected")
}

className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition"

>

Reject

</button>


</div>



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
export default Applicants;