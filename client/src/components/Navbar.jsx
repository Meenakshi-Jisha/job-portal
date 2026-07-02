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
        <nav className="bg-white border-b border-gray-200 shadow-sm">

<div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">


<div className="flex items-center gap-10">


<h2 className="text-2xl font-bold text-gray-900">

Job Portal

</h2>


<div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">


<Link
to="/"
className="hover:text-black transition"
>
Home
</Link>


<Link
to="/jobs"
className="hover:text-black transition"
>
Jobs
</Link>


{
token &&

<Link
to="/profile"
className="hover:text-black transition"
>

Profile

</Link>

}



{
role==="jobseeker" &&

<>

<Link
to="/my"
className="hover:text-black transition"
>

My Applications

</Link>


<Link
to="/saved-jobs"
className="hover:text-black transition"
>

Saved Jobs

</Link>

</>

}



{
role==="recruiter" &&

<>

<Link
to="/dashboard"
className="hover:text-black transition"
>

Dashboard

</Link>


<Link
to="/my-jobs"
className="hover:text-black transition"
>

My Jobs

</Link>


<Link
to="/create-job"
className="hover:text-black transition"
>

Create Job

</Link>

</>

}


</div>


</div>



<div>


{

token

?

<button

onClick={handleLogout}

className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-800 transition"

>

Logout

</button>


:

<div className="flex gap-4">


<Link
to="/login"
className="px-4 py-2"
>

Login

</Link>


<Link

to="/register"

className="bg-blue-600 text-white px-5 py-2 rounded-xl"

>

Register

</Link>


</div>


}


</div>



</div>


</nav>
    )
}

export default Navbar