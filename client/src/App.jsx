import {Routes,Route} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App(){ 
  return(
    <>
      <Navbar/>
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
        <Route path="/jobs" element={<Jobs/>} />
      </Routes>
    </>
    )

}

export default App;