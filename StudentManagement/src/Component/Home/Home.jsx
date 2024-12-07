import React, { useEffect, useState } from 'react'
import axios from 'axios';
function Home() {
  const [adminTotal, setAdminTotal] = useState();
  const [studentTotal, setStudentCount] = useState();
  const [departmentTotal, setDepartmentTotal] = useState();
  const [admins, setAdmins] = useState([])

  useEffect(() => {
    adminCount();
    departmentCount();
    studentCount();
    getAdmin();

  }, [])

  const adminCount = () => {
    axios.get('http://localhost:3000/auth/admin_count')
      .then(result => {
        if (result.data.Status) {
          setAdminTotal(result.data.Result[0].admin)
        } else {
          alert(result.data.Error)
        }
      }).catch(err => console.log(err)
      )
  }
  const studentCount = () => {
    axios.get('http://localhost:3000/auth/student_count')
      .then(result => {
        if (result.data.Status) {
          setStudentCount(result.data.Result[0].student);
        }
      }).catch(err => console.log(err)
      )
  }
  const departmentCount = () => {
    axios.get('http://localhost:3000/auth/department_count')
      .then(result => {
        if (result.data.Status) {
          setDepartmentTotal(result.data.Result[0].department);
        } else {
          alert(result.data.Error)
        }
      }).catch(err => console.log(err)
      )
  }
  const getAdmin = () => {
    axios.get('http://localhost:3000/auth/get_admins')
      .then(result => {
        if (result.data.Status) {
          setAdmins(result.data.Result)
        } else {
          alert(result.data.Error)
        }
      }).catch(err => console.log(err)
      )
  }
  return (
    <div>
      <div className="flex justify-around mt-3 p-3">
        <div className="px-4 pt-3 pb-4 border shadow-sm w-1/4">
          <div className="text-center pb-2">
            <h4 className="text-lg font-semibold">Admin</h4>
          </div>
          <hr className="border-gray-300" />
          <div className="flex justify-between mt-3">
            <h5 className="text-md font-medium">Total:</h5>
            <h5 className="text-md font-medium">{adminTotal}</h5>
          </div>
        </div>
        <div className="px-4 pt-3 pb-4 border shadow-sm w-1/4">
          <div className="text-center pb-2">
            <h4 className="text-lg font-semibold">Student</h4>
          </div>
          <hr className="border-gray-300" />
          <div className="flex justify-between mt-3">
            <h5 className="text-md font-medium">Total:</h5>
            <h5 className="text-md font-medium">{studentTotal}</h5>
          </div>
        </div>
        <div className="px-4 pt-3 pb-4 border shadow-sm w-1/4">
          <div className="text-center pb-2">
            <h4 className="text-lg font-semibold">Department</h4>
          </div>
          <hr className="border-gray-300" />
          <div className="flex justify-between mt-3">
            <h5 className="text-md font-medium">Total:</h5>
            <h5 className="text-md font-medium">{departmentTotal}</h5>
          </div>
        </div>
      </div>
      <div className="mt-4 px-5 pt-3">
        <h3 className="text-xl font-semibold">List of Admins</h3>
        <table className="table-auto w-full mt-3">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              admins.map(a => (
                <tr>
                  <td>{a.email}</td>
                  <td>
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded-md mr-2">
                      Edit
                    </button>
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1 rounded-md">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );

}

export default Home