import React from 'react'
import { useState } from 'react'
import { registerUser } from '../services/authService';
import { Link } from 'react-router-dom';

function Register() {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [role,setRole]=useState("jobseeker")
  
  const handleSubmit=async (e)=>{
    e.preventDefault()
    try{
        await registerUser({
          name,email,password,role
        })
        alert("Registered Successfully")
    }catch(error){
        console.log(error);
        alert("Registration failed")
    }
  }
  return (
    // <div>
    //   <h1>Register</h1>
    //   <form onSubmit={handleSubmit}>
    //     <input type="text" placeholder='Enter name' value={name}
    //             onChange={(e)=>setName(e.target.value)}/> <br /><br />
    //     <input type="email" placeholder='Enter email' value={email}
    //             onChange={(e)=>setEmail(e.target.value)}/> <br /> <br />
    //     <input type="password" placeholder='Enter password' value={password}
    //             onChange={(e)=>setPassword(e.target.value)}/> <br /><br />
    //     <select value={role} onChange={(e)=>setRole(e.target.value)}>
    //       <option value="jobseeker">Job Seeker</option>
    //       <option value="recruiter">Recruiter</option>
    //     </select> <br /><br />
    //     <button type='submit'>Register</button>
    //   </form>
    // </div> 
    <div className="min-h-screen flex items-center justify-center  bg-gray-200  px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">Create Account</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block mb-2 font-medium text-gray-700">Name</label>
          <input type="text" placeholder='Enter name' value={name}
                onChange={(e)=>setName(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"/> 
        </div>
        <div className="mb-5">
          <label className="block mb-2 font-medium text-gray-700">Email</label>
          <input type="email" placeholder='Enter email' value={email}
                onChange={(e)=>setEmail(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
/>
        </div>
        <div className="mb-5">
          <label className="block mb-2 font-medium text-gray-700">Password</label>
          <input type="password" placeholder='Enter password' value={password}
                onChange={(e)=>setPassword(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
/>
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">Role</label>
          <select value={role} onChange={(e)=>setRole(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black">
            <option value="jobseeker">Job Seeker</option>
            <option value="recruiter">Recruiter</option>
          </select> 
        </div>
        <button type='submit' className="w-full bg-blue-700 text-white py-3 rounded-xl hover:bg-blue-800 transition">Register</button>
      </form>
      <p className="text-center mt-6 text-gray-600">Already have an account?
      <Link to="/login" className="text-black font-semibold ml-2">Login</Link>
      </p>

      </div>
    </div> 
  )
}

export default Register