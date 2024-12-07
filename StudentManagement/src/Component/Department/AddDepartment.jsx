import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function AddDepartment() {

    const [department,setDepartment]= useState()
    const navigate = useNavigate()

    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:3000/auth/add_department',{department})
        .then(result => {
            if(result.data.Status){
                navigate('/dashboard/department')
            }
            else{
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }
  return (
        <div className="flex justify-center items-center h-screen">
          <div className="p-4 bg-white shadow-md rounded-md w-full max-w-sm border">
            <h2 className="text-xl font-bold text-center mb-4">Add Department</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="department" className="block font-medium mb-2">
                  Department:
                </label>
                <input
                  type="text"
                  name="department"
                  placeholder="Enter Department"
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 
                text-white font-bold py-2 rounded-md transition duration-300">
                Add Department
              </button>
            </form>
          </div>
        </div>
      );
      
}

export default AddDepartment