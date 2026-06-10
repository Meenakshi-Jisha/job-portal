import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    const token= localStorage.getItem("token")
    const role=localStorage.getItem("role")
    const handleLogout=()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        window.location="/login"
    }
    return (
        <nav className="flex justify-between items-center p-4 bg-gray-100 text-black">
            <h2 className="text-2xl font-bold">Job Portal</h2>
            <div className="flex gap-4">
                <Link to="/">Home</Link> {"|"}
                <Link to="/jobs">Jobs</Link> {"|"}
                {token && (
                    <>
                        <Link to="/profile">Profile</Link> {"|"}
                    </>
                )}
                {
                    role==="jobseeker" && (
                        <>
                            <Link to="/my">My Applications</Link> {"|"}
                            <Link to="/saved-jobs">Saved Jobs</Link> {"|"}

                        </>
                    )
                }
                {
                    role==="recruiter" && (
                        <>
                            <Link to="/dashboard">Dashboard</Link> {"|"}
                            <Link to="/my-jobs">My Jobs</Link> {"|"}
                            <Link to="/create-job">Create Job</Link>{" | "}
                        </>
                    )
                }
                { token ? (
                <>
                    <button onClick={handleLogout}>Logout</button>
                </>
                ):( <>
                    <Link to="/login">Login</Link> {"|"} 
                    <Link to="/register">Register</Link> {"|"}

                </>)
                }
            </div>
            
        </nav>
    )
}

export default Navbar