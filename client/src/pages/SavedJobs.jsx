import { useEffect, useState } from "react";
import { getSavedJobs } from "../services/jobService";
import { Link } from "react-router-dom";

function SavedJobs() {
  const [bookmarks, setBookmarks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const res = await getSavedJobs();
        setBookmarks(res.data.bookmarks || []);
      } catch (err) {
        console.log(err);
        setError(err.response?.data?.message || "Failed to load saved jobs");
      }
    };

    fetchSavedJobs();
  }, []);

  return (
    <div>
      <h1>Saved Jobs</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {bookmarks.length === 0 ? (
        <p>No saved jobs found.</p>
      ) : (
        bookmarks.map((bookmark) => (
          <div key={bookmark._id} style={{ marginBottom: "1rem" }}>
            <h2>{bookmark.job?.title || "Untitled Job"}</h2>
            <p>Company: {bookmark.job?.company || "N/A"}</p>
            <p>Location: {bookmark.job?.location || "N/A"}</p>
            <p>Salary: {bookmark.job?.salary || "N/A"}</p>
            <Link to={`/jobs/${bookmark.job?._id}`}>View Details</Link>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default SavedJobs;
