import axios from "axios";

const API ="http://localhost:5000/api/jobs";

export const getAllJobs=()=>{
    return axios.get(API);
};

export const applyJob=(jobId)=>{
    const token = localStorage.getItem("token")
    return axios.post(
        `http://localhost:5000/api/applications/apply/${jobId}`, //backend routes in server.js is different
        {},
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
}

export const getMyApplications=()=>{
    const token=localStorage.getItem("token");
    return axios.get(
        "http://localhost:5000/api/applications/my",
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    );
}

export const getApplicants=(jobId)=>{
    const token=localStorage.getItem("token")
    return axios.get(
        `http://localhost:5000/api/applications/job/${jobId}`,
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    )
}

export const updateStatus=(applicationId,status)=>{
    const token=localStorage.getItem("token")
    return axios.patch(
        `http://localhost:5000/api/applications/status/${applicationId}`,
        {status},
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    )
}

export const getMyJobs=()=>{
    const token=localStorage.getItem("token")
    return axios.get(
        `${API}/my-jobs`,
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    )
}

export const searchJobs=(keyword,location)=>{
    return axios.get(
        `${API}/search?keyword=${keyword}&location=${location}`
    )
}

export const getJobById=(id)=>{
    return axios.get(
        `${API}/${id}`
    )
}

export const createJob=(data)=>{
    const token=localStorage.getItem("token")
    return axios.post(`${API}/create`,
        data,
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    )
}