import axios from "axios";

const API ="http://localhost:5000/api/jobs";

export const getAllJobs=()=>{
    return axios.get(API);
};