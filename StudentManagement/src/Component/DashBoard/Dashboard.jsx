import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleLogout = () => {
    axios.get("http://localhost:3000/auth/logout").then((result) => {
      if (result.data.Status) {
        localStorage.removeItem("valid");
        navigate("/");
      }
    });
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed z-20 top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col items-center p-4">
          <Link
            to="/dashboard"
            className="flex items-center text-lg font-bold mb-6"
          >
            Code With Harshal
          </Link>
          <ul className="w-full space-y-4">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center px-4 py-2 hover:bg-gray-700 rounded"
              >
                <i className="bi-speedometer2 text-xl"></i>
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/student"
                className="flex items-center px-4 py-2 hover:bg-gray-700 rounded"
              >
                <i className="bi-people text-xl"></i>
                <span className="ml-3">Manage Student</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/department"
                className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
                <i className="bi-columns text-xl"></i>
                <span className="ml-3">Department</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/profile"
                className="flex items-center px-4 py-2 hover:bg-gray-700 rounded"
              >
                <i className="bi-person text-xl"></i>
                <span className="ml-3">Profile</span>
              </Link>
            </li>
            <li onClick={handleLogout}>
              <button className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-700 rounded">
                <i className="bi-power text-xl"></i>
                <span className="ml-3">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="bg-gray-800 text-white flex items-center justify-between px-4 py-3 md:hidden">
          <h1 className="text-lg font-semibold">Student Management System</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white focus:outline-none"
          >
            <i className="bi-list text-2xl"></i>
          </button>
        </div>

        {/* Page Header */}
        <div className="p-4 shadow bg-gray-100 flex justify-center md:ml-64">
          <h4 className="text-lg font-semibold">Student Management System</h4>
        </div>

        <div className="p-4 bg-gray-50 flex-1 md:ml-64">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
