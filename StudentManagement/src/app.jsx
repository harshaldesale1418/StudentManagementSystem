import Login from "./Component/LoginPage/Login"
import { BrowserRouter,Route,Routes } from "react-router-dom"
import Dashboard from "./Component/DashBoard/Dashboard"
import Home from "./Component/Home/Home"
import Profile from "./Component/Profile/Profile"
import Department from "./Component/Department/Department"
import ManageStudent from "./Component/ManageStudent/ManageStudent"
import AddDepartment from "./Component/Department/AddDepartment"
import AddStudent from "./Component/ManageStudent/AddStudent"
import EditStudent from "./Component/ManageStudent/EditStudent"

export function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/adminlogin" element ={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}>
            <Route path="" element={<Home/>}/>
            <Route path="/dashboard/profile" element={<Profile/>}/>
            <Route path="/dashboard/department"element = {<Department/>}/>
            <Route path="/dashboard/student" element = {<ManageStudent/>}/>
            <Route path="/dashboard/add_department" element = {<AddDepartment/>}/>
            <Route path ="/dashboard/add_student" element = {<AddStudent/>}></Route>
            <Route path = "/dashboard/edit_student/:id" element={<EditStudent/>}></Route>
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}
