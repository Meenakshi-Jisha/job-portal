import {Routes,Route} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import MyApplications from "./pages/MyApplications";
import Applicants from "./pages/Applicants";
import MyJobs from "./pages/MyJobs";
import JobDetails from "./pages/JobDetails";
import  CreateJob from "./pages/CreateJob";

function App(){ 
  return(
    <>
      <Navbar/>
      <h1 className="text-4xl font-bold text-center">Job Portal</h1>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>} />
        <Route path="/profile" element={
              <ProtectedRoute>
                <Profile/>
              </ProtectedRoute> }/>
        <Route path="/dashboard"  element={
              <ProtectedRoute>
                <Dashboard/>
              </ProtectedRoute>
        }  />
        <Route path="/my"  element={
              <ProtectedRoute>
                <MyApplications/>
              </ProtectedRoute>
        }  />
        <Route path="/applicants/:jobId"  element={
              <ProtectedRoute>
                <Applicants/>
              </ProtectedRoute>
        }  />
        <Route path="/my-jobs"  element={
              <ProtectedRoute>
                <MyJobs/>
              </ProtectedRoute>
        }  />
        <Route path="/create-job"  element={
              <ProtectedRoute>
                <CreateJob/>
              </ProtectedRoute>
        }  />
        
        <Route path="/jobs" element={<Jobs/>} />
        <Route path="/jobs/:id" element={<JobDetails/>}/>
      </Routes>
    </>
    )

}

export default App;