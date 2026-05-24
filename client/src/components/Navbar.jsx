import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav>
            <h2>Job Portal</h2>
            <Link to="/">Home</Link> {"|"}
            <Link to="/jobs">Jobs</Link> {"|"}
            <Link to="/profile">Profile</Link> {"|"}
            <Link to="/dashboard">Dashboard</Link> {"|"}
            <Link to="/login">Login</Link> {"|"}
            <Link to="/register">Register</Link> {"|"}
        </nav>
    )
}

export default Navbar