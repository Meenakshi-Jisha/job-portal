import {useEffect,useState} from "react";
import {getDashboardStats} from "../services/jobService";

function Dashboard(){
  const [stats,setStats]=useState(null);
  useEffect(()=>{
    fetchStats();
  },[]);

  const fetchStats=async()=>{
    try{
      const res=await getDashboardStats();
      console.log(res.data);
      setStats(res.data);
    }catch(error){
      console.log(error);
    }
  };

  if(!stats){
    return <h2>Loading...</h2>
  }
  return(
    // <div>
    //   <h1>Dashboard</h1>
    //   <h3>Total Jobs:{stats.totalJobs}</h3>
    //   <h3> Total Applications:{stats.totalApplications}   </h3>
    //   <h3> Accepted: {stats.accepted} </h3>
    //   <h3> Rejected: {stats.rejected} </h3>
    //   <h3> Pending:  {stats.pending}  </h3>
    // </div>
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-10">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-gray-500 text-sm mb-2">Total Jobs</h2>
            <p className="text-3xl font-bold text-gray-900">{stats.totalJobs}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-gray-500 text-sm mb-2">Applications</h2>
            <p className="text-3xl font-bold text-gray-900">{stats.totalApplications}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-gray-500 text-sm mb-2">Accepted</h2>
            <p className="text-3xl font-bold text-green-600">{stats.accepted}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-gray-500 text-sm mb-2"> Rejected </h2>
            <p className="text-3xl font-bold text-red-600"> {stats.rejected}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-gray-500 text-sm mb-2">  Pending </h2>
            <p className="text-3xl font-bold text-yellow-500"> {stats.pending} </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;