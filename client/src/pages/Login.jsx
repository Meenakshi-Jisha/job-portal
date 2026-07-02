import { useState } from "react";
import { loginUser } from "../services/authService";
import {useNavigate} from "react-router-dom";

function Login(){
  const [email,setEmail]= useState("");
  const [password,setPassword]= useState("");
  const navigate= useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    // console.log({
    //   email,
    //   password
    // });
    try{
      const res= await loginUser({
        email,password
      })
      console.log(res.data);
      localStorage.setItem("token",res.data.token)
      localStorage.setItem("role", res.data.user.role)
      
      alert("Login successful");
      // navigate("/")
      window.location="/";
    }
    catch(error){
      console.log(error);
      alert("Login failed")
    }
  }
  return(
    // <div>
    //   <h1>Login</h1>
    //   <form onSubmit={handleSubmit}>
    //     <input type="email" placeholder="Enter email" value={email} 
    //           onChange={(e)=>setEmail(e.target.value)}/> <br /><br />
    //     <input type="password" placeholder="Enter password" value={password}
    //           onChange={(e)=>setPassword(e.target.value)}/> <br /><br />
    //     <button type="submit">Login</button>
    //   </form>
    // </div>
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-200 ">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">
      <h1  className="text-3xl font-bold text-center mb-8 text-gray-900">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block mb-2 font-medium text-gray-700">Email</label>
          <input type="email" placeholder="Enter email" value={email} 
              onChange={(e)=>setEmail(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"/>
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">Password</label>
          <input type="password" placeholder="Enter password" value={password}
              onChange={(e)=>setPassword(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
/> 
        </div>
        <button type="submit" className="w-full bg-blue-700 text-white py-3 rounded-xl hover:bg-blue-800 transition">Login</button>
      </form>
      </div>
    </div>
  )
}

export default Login;