import React from 'react'
import { useState,useEffect } from 'react'
import { getProfile } from '../services/authService'

function Profile() {
  const [user,setUser]=useState(null)
  useEffect(()=>{
    fetchProfile()
  },[])
  const fetchProfile=async()=>{
    try{
      const res= await getProfile();
      console.log(res.data);
      
      setUser(res.data)
    }
    catch(error){
      console.log(error);
      
    }
  }
  if(!user){
    return(
      <h2>Loading...</h2>
    )
  }
  return (
    <div>
      <h1>Profile</h1>
      <h3>Name:{user.name}</h3>
      <p>Email:{user.email}</p>
      <p>Role:{user.role}</p>
      <p>Bio:{user.bio}</p>
      <p>Phone:{user.phone}</p>
    </div>
  )
}

export default Profile