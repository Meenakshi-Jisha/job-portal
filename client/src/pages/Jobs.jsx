import {useEffect,useState} from "react";
import {getAllJobs,applyJob,searchJobs,bookmarkJob,getSavedJobs} from "../services/jobService";
import { Link } from "react-router-dom";

function Jobs(){ 
  const [jobs,setJobs]=useState([]);
  const [keyword,setKeyword]=useState("")
  const [location,setLocation]=useState("")
  const role=localStorage.getItem("role")
  const [bookmarkedJobs,setBookmarkedJobs]=useState([])
  // pagination
  const [currentPage,setCurrentPage]=useState(1);
  const [totalPages,setTotalPages]=useState(1)
  useEffect(()=>{
    fetchJobs(currentPage);
  },[currentPage]);
  useEffect(()=>{
    fetchBookmarks();
  },[]);

const fetchJobs=async(page=1)=>{
  try{
    const res=await getAllJobs(page);
    console.log(res.data);
    setJobs(res.data.jobs);
    setCurrentPage(res.data.currentPage)
    setTotalPages(res.data.totalPages)
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
    alert("Appliction failed")
    // alert("You are already Applied");
  }
};

const handleSearch=async()=>{
  try{
    const res=await searchJobs(keyword,location)
    setJobs(res.data.jobs)
  }catch(error){
    console.log(error);
  }
}
const handleBookmark=async(jobId)=>{
  try{
    const res=await bookmarkJob(jobId);
    alert(res.data.message);
    setBookmarkedJobs(prev=>
      prev.includes(jobId) ? prev : [...prev,jobId]
    );
    fetchBookmarks();
  }catch(error){
    console.log(error);
    alert(error.response?.data?.message || "Bookmark failed");
  }
};
const fetchBookmarks=async()=>{
  try{
    const res=await getSavedJobs();
    const ids=res.data.bookmarks.map((bookmark)=>bookmark.job._id);
    setBookmarkedJobs(ids);
  }catch(error){
    console.log(error);
  }
}
return(
  <div>
    <h1>All Jobs</h1>
    <input type="text" placeholder="Search keyword" value={keyword}
          onChange={(e)=>setKeyword(e.target.value)}
    />
    <input type="text" placeholder="Location" value={location}
          onChange={(e)=>setLocation(e.target.value)}
    />
    <button onClick={handleSearch}>Search</button> <br /> <br />
    {
    jobs.map((job)=>(
      <div key={job._id}>
        <h2>{job.title}</h2>
        <p>Company:{job.company}</p>
        <p>Location:{job.location}</p>
        <p>Salary:{job.salary}</p>
        <Link to={`/jobs/${job._id}`}>View Details</Link> <br /> <br />
        <button onClick={()=>handleApply(job._id)}>Apply</button>
        {
          role==="jobseeker" && (bookmarkedJobs.includes(job._id)?
          <button disabled>Bookmarked</button>:
          <button onClick={()=>handleBookmark(job._id)}>Bookmark</button>)
        }
        <hr/>


      </div>
    ))
    }
      <div>
        <button disabled={currentPage===1} onClick={()=>setCurrentPage(currentPage-1)}>Previous</button>
        <span>Page {currentPage}of {totalPages}</span>
        <button disabled={  currentPage===totalPages} onClick={()=>setCurrentPage(currentPage+1)}>Next</button>
    </div>
  </div>
)
}

export default Jobs;