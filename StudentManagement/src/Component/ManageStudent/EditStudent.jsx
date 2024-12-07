import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function EditStudent() {
    const {id} = useParams()
    const [department,setDepartment]= useState([])
    const navigate = useNavigate()
    const [student, setStudent] = useState({
        name: "",
        email: "",
        address: "",
        department_id: ""
      });
    useEffect(()=>{
        axios.get('http://localhost:3000/auth/department')
        .then(result =>{
            if(result.data.Status){
                setDepartment(result.data.Result);
            } else {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err));

        axios.get('http://localhost:3000/auth/student/'+id)
        .then(result =>{
            if(result.data.Status){
              setStudent({
                ...student,
                name: result.data.Result[0].name,
                email: result.data.Result[0].email,
                address: result.data.Result[0].address,
                department_id: result.data.Result[0].department_id,
            })
            }else{
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    },[]);

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log("hello");
        axios.put('http://localhost:3000/auth//edit_student/'+id,student)
        .then(result=>{
            if(result.data.Status){
              navigate('/dashboard/student')
            }else{
                alert(result.data.Error)
            }

        }).catch(err => console.log(err))
    }
    return (
        <div className="flex justify-center items-center mt-3">
          <div className="p-3 rounded w-1/2 border border-gray-300">
            <h3 className="text-center text-lg font-semibold">Edit Student</h3>
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="w-full">
                <label htmlFor="inputName" className="block text-sm font-medium">
                  Name
                </label>
                <input
                  type="text"
                  className="form-input mt-1 block w-full rounded border-gray-300"
                  id="inputName"
                  placeholder="Enter Name"
                  value={student.name}
                  onChange={(e) =>
                    setStudent({ ...student, name: e.target.value })
                  }
                />
              </div>
              <div className="w-full">
                <label htmlFor="inputEmail4" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  className="form-input mt-1 block w-full rounded border-gray-300"
                  id="inputEmail4"
                  placeholder="Enter Email"
                  autoComplete="off"
                  value={student.email}
                  onChange={(e) =>
                    setStudent({ ...student, email: e.target.value })
                  }
                />
              </div>
              <div className="w-full">
                <label htmlFor="inputAddress" className="block text-sm font-medium">
                  Address
                </label>
                <input
                  type="text"
                  className="form-input mt-1 block w-full rounded border-gray-300"
                  id="inputAddress"
                  placeholder="Main St"
                  autoComplete="off"
                  value={student.address}
                  onChange={(e) =>
                    setStudent({ ...student, address: e.target.value })
                  }
                />
              </div>
              <div className="w-full">
                <label htmlFor="department" className="block text-sm font-medium">
                  Department
                </label>
                <select
                  name="department"
                  id="department"
                  className="form-select mt-1 block w-full rounded border-gray-300"
                  onChange={(e) =>
                    setStudent({ ...student, department_id: e.target.value })
                  }
                >
                  {department.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" onClick={()=> console.log("submit")
                  }
                >
                  Edit Student
                </button>
              </div>
            </form>
          </div>
        </div>
      );
      
}

export default EditStudent
