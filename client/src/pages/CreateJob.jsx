import { useState} from "react";
import {useNavigate} from "react-router-dom";
import { createJob } from "../services/jobService";

function CreateJob(){
    const navigate=useNavigate()
    const [formData, setFormData]=useState({
        title:"",
        company:"",
        location:"",
        salary:"",
        description:"",
        skillsRequired:""
    })
    const handleChange=(e)=>{
        setFormData({...formData,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const data={...formData,
                skillsRequired:formData.skillsRequired.split(",")
            };
            await createJob(data);
            alert("Job Created");
            navigate("/my-jobs");
        }catch(error){
            console.log(error);
            alert("Failed");
        }
    };

    return(
        <div>
            <h1> Create Job</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" onChange={handleChange}/><br/><br/>
                <input type="text" name="company" placeholder="Company" onChange={handleChange}/><br/><br/>
                <input type="text" name="location" placeholder="Location" onChange={handleChange}/><br/><br/>
                <input type="text" name="salary" placeholder="Salary" onChange={handleChange}  /><br/><br/>
                <textarea name="description" placeholder="Description" onChange={handleChange} /><br/><br/>
                <input type="text" name="skillsRequired" placeholder="Skills comma separated" onChange={handleChange}/><br/><br/>

                <button type="submit">Create Job </button>
            </form>
        </div>
    )
}
export default CreateJob;