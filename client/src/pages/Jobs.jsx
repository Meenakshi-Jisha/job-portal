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
  <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-400 p-8">
    <div className="max-w-6xl mx-auto px-6 py-10">
    <h1 className="text-4xl font-bold text-gray-900 mb-8">Explore Jobs</h1>
    {/* <div className="backdrop-blur-lg bg-white/70 border border-white/30 shadow-xl rounded-2xl p-6 mb-10 flex flex-wrap gap-4"> */}
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm mb-8">
      <div className="flex flex-col md:flex-row gap-4">
      <input type="text" placeholder="Search jobs..." value={keyword}
            onChange={(e)=>setKeyword(e.target.value)} className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
      />
      <input type="text" placeholder="Location" value={location}
            onChange={(e)=>setLocation(e.target.value)} className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
      />
      <button onClick={handleSearch} className="bg-blue-700 text-white px-6 py-3 rounded-xl hover:bg-blue-800 transition">Search</button>
    </div>
    </div>
    <div className="space-y-6">
    {
    jobs.map((job)=>(
      <div key={job._id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition duration-300">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{job.title}</h2>
            <p className="text-gray-600  mt-1">{job.company}</p>
          </div>
          <div className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium text-gray-700">{job.location}</div>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <div className="bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">💰 {job.salary}</div>
        </div>
        <div className="mt-6 flex gap-4 flex-wrap">
          <Link to={`/jobs/${job._id}`}><button className="bg-black text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 transition">View Details</button></Link> 
          <button onClick={()=>handleApply(job._id)} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition">Apply</button>
          {
            role==="jobseeker" && (bookmarkedJobs.includes(job._id)?
            <button disabled className="bg-gray-300 text-gray-700 px-5 py-2.5 rounded-lg">Bookmarked</button>:
            <button onClick={()=>handleBookmark(job._id)} className="border border-gray-300 px-5 py-2.5 rounded-lg hover:bg-gray-100 transition">Bookmark</button>)
          }
        </div>
      </div>
    ))
    }
    </div>
      <div className="flex justify-center items-center gap-6 mt-12">
        <button disabled={currentPage===1} onClick={()=>setCurrentPage(currentPage-1)} className="bg-black text-white px-5 py-3 rounded-xl disabled:opacity-40" >Previous</button>
        <p className="text-lg font-semibold text-gray-700">Page {currentPage}of {totalPages}</p>
        <button disabled={  currentPage===totalPages} onClick={()=>setCurrentPage(currentPage+1)} className="bg-black text-white px-5 py-3 rounded-xl disabled:opacity-40">Next</button>
    </div>
  </div>
  </div>
)
}

export default Jobs;