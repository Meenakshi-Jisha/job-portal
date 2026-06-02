import {Link} from "react-router-dom";

function Home(){
  return(
    <div>
      <h1>  Find Your Dream Job </h1>
      <p>Search jobs,apply easily,and get hired.</p><br/>
      <Link to="/jobs"><button> Browse Jobs</button></Link>{" "}
      <Link to="/register"><button> Get Started</button></Link>
      <hr/>
      <h2> Why Choose Us? </h2>
      <ul>
        <li>Apply for jobs easily </li>
        <li> Recruiters can post jobs </li>
        <li> Track application status </li>
        <li> Build professional profile </li>
      </ul>
    </div>
  )
}
export default Home;