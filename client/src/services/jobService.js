import axios from "axios";

const API ="http://localhost:5000/api/jobs";

export const getAllJobs=()=>{
    return axios.get(API);
};

export const applyJob=(jobId)=>{
    const token = localStorage.getItem("token")
    return axios.post(
        `http://localhost:5000/api/applications/apply/${jobId}`,
        {},
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
}