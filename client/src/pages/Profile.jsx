import React, { use } from 'react'
import { useState,useEffect } from 'react'
import { getProfile, updateProfile } from '../services/authService'

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
  const handleUpdate=async(e)=>{
    e.preventDefault();
    try{
      const res= await updateProfile(user)
      setUser(res.data.user)
      alert("Profile updated")
    }
    catch(error){
      console.log(error);
      alert("Update failed")
    }
  }
  return (
    <div>
      <h1>Profile</h1>
      <form  onSubmit={handleUpdate}>
        <input type="text" value={user.name} 
              onChange={(e)=>{
                setUser({...user,name:e.target.value})
              }}/> <br /> <br />
        <input type="text" placeholder='Bio' value={user.bio}
              onChange={(e)=>{
                setUser({...user,bio:e.target.value})
              }}/> <br /><br />
        <input type="text" placeholder='Phone' value={user.phone}
              onChange={(e)=>{
                setUser({...user,phone:e.target.value})
              }}/> <br /><br />
        <input type="text" placeholder='Skills comma separated' value={user.skills.join(",")}
              onChange={(e)=>{
                setUser({...user,skills:e.target.value.split(",")})
              }}/> <br /><br />
        <button type='submit'>Update Profile</button>
      </form>
      {/* <h3>Name:{user.name}</h3>
      <p>Email:{user.email}</p>
      <p>Role:{user.role}</p>
      <p>Bio:{user.bio}</p>
      <p>Phone:{user.phone}</p> */}
      
    </div>
  )
}

export default Profile