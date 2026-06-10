import {Link} from "react-router-dom";

function Home(){
  return(
    <div className="min-h-screen flex flex-col justify-center items-center  bg-gradient-to-br from-gray-200 to-gray-400 text-center p-6">
      <h1 className="text-5xl font-bold mb-6">  Find Your Dream Job </h1>
      <p className="text-lg text-gray-700 max-w-2xl mb-8">Search jobs,apply easily,and get hired.</p><br/>
      <div className="flex gap-4">
        <Link to="/jobs"><button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"> Browse Jobs</button></Link>{" "}
        <Link to="/register"><button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"> Get Started</button></Link>
        {/* <hr/> */}
      </div>
      {/* <h2> Why Choose Us? </h2>
      <ul>
        <li>Apply for jobs easily </li>
        <li> Recruiters can post jobs </li>
        <li> Track application status </li>
        <li> Build professional profile </li>
      </ul> */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Easy Job Applications</h3>
            <p>Apply for jobs quickly with a simple process.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Recruiter Dashboard</h3>
            <p>Recruiters can post jobsand manage applicants.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Track Applications</h3>
            <p>Monitor application statusin real time.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Professional Profiles</h3>
            <p>Build a strong professional jobseeker profile.</p>
          </div>
        </div>
      </div>
      {/* <div className="bg-white p-6 rounded-lg shadow-md">

<h2 className="text-2xl font-bold mb-2">

1000+

</h2>

<p>
Applications
</p>

</div> */}

    </div>
  )
}
export default Home;