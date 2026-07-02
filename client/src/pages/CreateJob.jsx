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
        // <div>
        //     <h1> Create Job</h1>
        //     <form onSubmit={handleSubmit}>
        //         <input type="text" name="title" placeholder="Title" onChange={handleChange}/><br/><br/>
        //         <input type="text" name="company" placeholder="Company" onChange={handleChange}/><br/><br/>
        //         <input type="text" name="location" placeholder="Location" onChange={handleChange}/><br/><br/>
        //         <input type="text" name="salary" placeholder="Salary" onChange={handleChange}  /><br/><br/>
        //         <textarea name="description" placeholder="Description" onChange={handleChange} /><br/><br/>
        //         <input type="text" name="skillsRequired" placeholder="Skills comma separated" onChange={handleChange}/><br/><br/>

        //         <button type="submit">Create Job </button>
        //     </form>
        // </div>bg-gradient-to-br from-gray-200 to-gray-400
        <div className="min-h-screen  bg-gray-200 p-8">
            <div className="max-w-4xl mx-auto ">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-200  p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Job</h1>
                    <p className="text-gray-500 mb-8">Post a new job opportunity</p>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block mb-2 font-medium text-gray-700">Job Title</label>
                                <input type="text" name="title" placeholder="Title" onChange={handleChange}  className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"/><br/><br/>
                            </div>
                            <div>
                                <label className="block mb-2 font-medium text-gray-700">Company</label>
                                <input type="text" name="company" placeholder="Company" onChange={handleChange} className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"/><br/><br/>
                            </div>
                            <div>
                                <label className="block mb-2 font-medium text-gray-700">Location</label>
                                <input type="text" name="location" placeholder="Location" onChange={handleChange} className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"/><br/><br/>
                            </div>
                            <div>
                                <label className="block mb-2 font-medium text-gray-700">Salary</label>
                                <input type="text" name="salary" placeholder="Salary" onChange={handleChange} className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"/><br/><br/>
                            </div>
                        </div>
                            <div className="mt-8">
                                <label className="block mb-2 font-medium text-gray-700">Description</label>
                                <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"/><br/><br/>
                            </div>
                            <div>
                                <label className="block mb-2 font-medium text-gray-700">Required Skills</label>
                                <input type="text" name="skillsRequired" placeholder="Skills comma separated" onChange={handleChange} className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"/><br/><br/>
                            </div>
                            <div className="mt-10 flex justify-end">
                                <button type="submit" className="bg-black text-white px-8 py-3 rounded-2xl hover:bg-gray-800 transition">Create Job </button>
                            </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default CreateJob;