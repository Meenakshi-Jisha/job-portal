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
    // <div>
    //   <h1>Profile</h1>
    //   <form  onSubmit={handleUpdate}>
    //     <input type="text" value={user.name} 
    //           onChange={(e)=>{
    //             setUser({...user,name:e.target.value})
    //           }}/> <br /> <br />
    //     <input type="text" placeholder='Bio' value={user.bio}
    //           onChange={(e)=>{
    //             setUser({...user,bio:e.target.value})
    //           }}/> <br /><br />
    //     <input type="text" placeholder='Phone' value={user.phone}
    //           onChange={(e)=>{
    //             setUser({...user,phone:e.target.value})
    //           }}/> <br /><br />
    //     <input type="text" placeholder='Skills comma separated' value={user.skills.join(",")}
    //           onChange={(e)=>{
    //             setUser({...user,skills:e.target.value.split(",")})
    //           }}/> <br /><br />
    //     <button type='submit'>Update Profile</button>
    //   </form>    
    // </div>
        <div className="min-h-screen bg-gray-100 bg-gray-200 p-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
                <div className="flex items-center justify-between mb-10">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Update Profile</h1>
                  <p className="text-gray-500 mt-2">Edit your professional details </p>
                  <span className="inline-block mt-3 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    {
                      user.role === "recruiter" ? "Recruiter" : "Job Seeker"
                    }
                  </span>
                </div>
                <div className="w-20 h-20 rounded-full bg-gray-400 text-white flex items-center justify-center text-3xl font-bold">{user.name?.charAt(0)} </div>

              </div>
              <form onSubmit={handleUpdate}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Name </label>
                      <input type="text" value={user.name} onChange={(e)=>{
                            setUser({  ...user,name:e.target.value})
                            }} className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                      />
                  </div>
                <div>
                    <label className="block mb-2 font-medium text-gray-700">   Phone</label>
                      <input type="text"  placeholder="Enter phone number" value={user.phone}  onChange={(e)=>{
                        setUser({
                        ...user,phone:e.target.value
                        })}} className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                      />
                </div>
              </div>
              <div className="mt-8">
                <label className="block mb-2 font-medium text-gray-700"> Bio</label>
                <textarea placeholder="Write about yourself" value={user.bio}
                    onChange={(e)=>{
                    setUser({
                    ...user,
                    bio:e.target.value
                    })
                    }}
                    rows="5"
                    className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                ></textarea>
              </div>

              <div className="mt-8">
                <label className="block mb-2 font-medium text-gray-700"> Skills</label>
                <input type="text" placeholder="React, Node.js, MongoDB" value={user.skills.join(",")}
                onChange={(e)=>{
                  setUser({
                  ...user,
                  skills:
                  e.target.value.split(",")
                  })
                }}
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                />
                <p className="text-sm text-gray-500 mt-2"> Separate skills with commas </p>
              </div>
              <div className="mt-10 flex justify-end">
                <button   type="submit"   className="bg-blue-600 text-white px-8 py-3 rounded-2xl hover:bg-blue-800 transition" > Save Changes </button>
              </div>
            </form>
          </div>
        </div>
      </div>

  )
}

export default Profile