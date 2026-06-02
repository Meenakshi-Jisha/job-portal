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
        <nav>
            <h2>Job Portal</h2>
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
            
        </nav>
    )
}

export default Navbar