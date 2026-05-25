import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    const token= localStorage.getItem("token")
    const handleLogout=()=>{
        localStorage.removeItem("token")
        window.location="/login"
    }
    return (
        <nav>
            <h2>Job Portal</h2>
            <Link to="/">Home</Link> {"|"}
            <Link to="/jobs">Jobs</Link> {"|"}
            { token ? (
            <>
                <Link to="/profile">Profile</Link> {"|"}
                <Link to="/dashboard">Dashboard</Link> {"|"}
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