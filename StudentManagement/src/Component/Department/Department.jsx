import React, { useState } from 'react'
import {Link }from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'

function Department() {
    const [department,setDepartment] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:3000/auth/department')
        .then(result =>{
            if(result.data.Status){
                setDepartment(result.data.Result)
            }
            else{
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))

    })

    
  return (
    <div className="px-5 mt-3">
        <div className="flex justify-center">
            <h3 className="text-lg font-semibold">Category List</h3>
        </div>
        <Link
            to="/dashboard/add_department"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-300"
        >
            Add Department
        </Link>
        <div className="mt-3 overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left font-medium">
                            Name
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        department.map((c, index) => (
                            <tr key={index}>
                                <td className="border border-gray-300 px-4 py-2">{c.name}</td>
                            </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    )
}

export default Department