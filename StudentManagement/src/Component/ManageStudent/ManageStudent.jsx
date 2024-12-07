import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function ManageStudent() {
    const [student, setStudent]= useState([]);
    useEffect(()=>{
        axios.get("http://localhost:3000/auth/student")
        .then(result =>{
            if(result.data.Status){
                setStudent(result.data.Result)
            }else{
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err)
        )
    })

    const handleDelete = (id)=>{

        axios.delete("http://localhost:3000/auth/delete_student/"+id)
        .then(result =>{
            if(result.data.Status){
                alert("Record is deleted sucessfully")
            }
        }).catch(err => console.log(err));

    }
    return (
        <div className="px-5 mt-3">
          <div className="flex justify-center">
            <h3 className="text-lg font-semibold">Employee List</h3>
          </div>
          <Link
            to="/dashboard/add_student"
            className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Student
          </Link>
          <div className="mt-3 overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2 border border-gray-300">Name</th>
                  <th className="px-4 py-2 border border-gray-300">Email</th>
                  <th className="px-4 py-2 border border-gray-300">Address</th>
                  <th className='px-4 py-2 border border-grey-300'>Department</th>
                  <th className="px-4 py-2 border border-gray-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {student.map((e) => (
                  <tr key={e.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border border-gray-300">{e.sname}</td>
                    <td className="px-4 py-2 border border-gray-300">{e.email}</td>
                    <td className="px-4 py-2 border border-gray-300">{e.address}</td>
                    <td className="px-4 py-2 border border-gray-300">{e.name}</td>
                    <td className="px-4 py-2 border border-gray-300 space-x-2">
                      <Link
                        to={`/dashboard/edit_student/` + e.id}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                      >
                        Edit
                      </Link>
                      <button
                        className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                        onClick={() => handleDelete(e.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );      
}

export default ManageStudent
