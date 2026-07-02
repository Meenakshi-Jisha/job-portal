import {useEffect,useState}from "react";
import {Link}from "react-router-dom";
import {getSavedJobs,removeBookmark}from "../services/jobService";

function SavedJobs(){
    const [bookmarks,setBookmarks]=useState([]);

    useEffect(()=>{
        fetchBookmarks();
    },[]);

    const fetchBookmarks=async()=>{
    try{
        const res=await getSavedJobs();
        setBookmarks(res.data.bookmarks);
    }catch(error){
        console.log(error);
    }
    };

    const handleRemove=async(jobId)=>{
    try{
        await removeBookmark(jobId);
        setBookmarks(bookmarks.filter((bookmark)=>bookmark.job._id!== jobId));
    }catch(error){
        console.log(error);
    }
    };
    return(
        // <div>
        //     <h1>Saved Jobs</h1>
        //     {
        //         bookmarks.length===0?
        //         <h3>No saved jobs</h3>:
        //         bookmarks.map((bookmark)=>(

        //         <div key={bookmark._id}>
        //             <h2>{bookmark.job.title}</h2>
        //             <p>Company:{bookmark.job.company}</p>
        //             <p>Location:{bookmark.job.location}</p>
        //             <Link to={`/jobs/${bookmark.job._id}`}>View Details</Link><br/><br/>
        //             <button onClick={()=>handleRemove(bookmark.job._id)}>Remove</button>
        //             <hr/>
        //         </div>
        //         ))
        //     }
        // </div>
        <div className="min-h-screen bg-gray-200 p-8">

<div className="max-w-5xl mx-auto">


<h1 className="text-4xl font-bold text-gray-900 mb-10">

Saved Jobs

</h1>


{

bookmarks.length===0

?

(

<div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-10 text-center">

<h2 className="text-xl font-semibold text-gray-700">

No saved jobs

</h2>

<p className="text-gray-500 mt-2">

Jobs you bookmark will appear here

</p>

</div>

)


:

(

<div className="space-y-6">


{

bookmarks.map((bookmark)=>(


<div

key={bookmark._id}

className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8 hover:shadow-md transition"


>


<div className="flex flex-col md:flex-row md:justify-between md:items-start gap-5">


<div>


<h2 className="text-2xl font-bold text-gray-900">

{bookmark.job.title}

</h2>


<p className="text-gray-600 mt-2">

{bookmark.job.company}

</p>


<div className="mt-4 space-y-2 text-gray-700">


<p>

📍 {bookmark.job.location}

</p>


<p>

💰 {bookmark.job.salary}

</p>


</div>


</div>


<div>

<span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium">

Saved

</span>


</div>


</div>



<div className="mt-8 flex gap-4 flex-wrap">


<Link

to={`/jobs/${bookmark.job._id}`}

>

<button

className="bg-blue-700 text-white px-6 py-3 rounded-xl hover:bg-v=blue-800 transition"

>

View Details

</button>


</Link>



<button

onClick={()=>handleRemove(bookmark.job._id)}

className="border border-red-300 text-red-600 px-6 py-3 rounded-xl hover:bg-red-50 transition"

>

Remove

</button>



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

export default SavedJobs;