import React from 'react'
import { useState } from 'react'
import { registerUser } from '../services/authService';

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
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Enter name' value={name}
                onChange={(e)=>setName(e.target.value)}/> <br /><br />
        <input type="email" placeholder='Enter email' value={email}
                onChange={(e)=>setEmail(e.target.value)}/> <br /> <br />
        <input type="password" placeholder='Enter password' value={password}
                onChange={(e)=>setPassword(e.target.value)}/> <br /><br />
        <select value={role} onChange={(e)=>setRole(e.target.value)}>
          <option value="jobseeker">Job Seeker</option>
          <option value="recruiter">Recruiter</option>
        </select> <br /><br />
        <button type='submit'>Register</button>
      </form>
    </div> 
  )
}

export default Register