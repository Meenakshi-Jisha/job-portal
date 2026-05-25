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
      
      alert("Login successful");
      navigate("/")
    }
    catch(error){
      console.log(error);
      alert("Login failed")
    }
  }
  return(
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Enter email" value={email} 
              onChange={(e)=>setEmail(e.target.value)}/> <br /><br />
        <input type="password" placeholder="Enter password" value={password}
              onChange={(e)=>setPassword(e.target.value)}/> <br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login;