import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios  from 'axios'

function AddStudent() {

    const [student,setStudent] = useState({
        name:"",
        email:"",
        address:"",
        department_id:""

    })
    const navigate = useNavigate()

    const [department,setDepartment]=useState([])
    useEffect(()=>{
        axios.get("http://localhost:3000/auth/department")
        .then(result => {
            if(result.data.Status){
                setDepartment(result.data.Result)
            }else{
                alert(result.data.Error);
            }
        })
        .catch(err => console.log(err))
    })
    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:3000/auth/add_student", student)
        .then(result =>{
            if(result.data.Status){
                navigate("/dashboard/student")
            }else{
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))

    }
    return (
        <div className="flex justify-center items-center mt-3">
          <div className="p-3 rounded-lg w-full max-w-md border border-gray-300">
            <h3 className="text-center text-lg font-semibold mb-4">Add Student</h3>
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="w-full">
                <label htmlFor="inputName" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  id="inputName"
                  placeholder="Enter Name"
                  onChange={(e) =>
                    setStudent({ ...student, name: e.target.value })
                  }
                />
              </div>
              <div className="w-full">
                <label htmlFor="inputEmail4" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  id="inputEmail4"
                  placeholder="Enter Email"
                  autoComplete="off"
                  onChange={(e) =>
                    setStudent({ ...student, email: e.target.value })
                  }
                />
              </div>
              <div className="w-full">
                <label htmlFor="inputAddress" className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  id="inputAddress"
                  placeholder="1234 Main St"
                  autoComplete="off"
                  onChange={(e) =>
                    setStudent({ ...student, address: e.target.value })
                  }
                />
              </div>
              <div className="w-full">
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select
                  name="department"
                  id="department"
                  className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) =>
                    setStudent({ ...student, department_id: e.target.value })
                  }
                >
                  {department.map((c) => {
                    return <option value={c.id} key={c.id}>{c.name}</option>;
                  })}
                </select>
              </div>
              <div className="w-full">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      );
}
export default AddStudent
