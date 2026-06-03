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
        <div>
            <h1>Saved Jobs</h1>
            {
                bookmarks.length===0?
                <h3>No saved jobs</h3>:
                bookmarks.map((bookmark)=>(

                <div key={bookmark._id}>
                    <h2>{bookmark.job.title}</h2>
                    <p>Company:{bookmark.job.company}</p>
                    <p>Location:{bookmark.job.location}</p>
                    <Link to={`/jobs/${bookmark.job._id}`}>View Details</Link><br/><br/>
                    <button onClick={()=>handleRemove(bookmark.job._id)}>Remove</button>
                    <hr/>
                </div>
                ))
            }
        </div>
    )
}

export default SavedJobs;