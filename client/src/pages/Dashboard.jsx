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
    <div>
      <h1>Dashboard</h1>
      <h3>Total Jobs:{stats.totalJobs}</h3>
      <h3> Total Applications:{stats.totalApplications}   </h3>
      <h3> Accepted: {stats.accepted} </h3>
      <h3> Rejected: {stats.rejected} </h3>
      <h3> Pending:  {stats.pending}  </h3>
    </div>
  )
}

export default Dashboard;