import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {

    const [loginvalue,setLoginValue] = useState({
        email:"",
        password:""
    })  
    const [error,setError]= useState(null)
    axios.defaults.withCredentials=true;
    const navigate =useNavigate()
    const handleSubmit = (event)=>{
        try{
            event.preventDefault();
            axios.post('http://localhost:3000/auth/adminlogin',loginvalue)
            .then(result => {
                if(result.data.loginStatus){
                    navigate('/dashboard')
                }else{
                    setError(result.data.Error)
                }
                
                
            });
    
        }catch(err){
            console.log(err);
        }

    } 
    
    



  return (
    <div class="bg-cover bg-center bg-fixed" style="background-image: url('https://picsum.photos/1920/1080')">
    <div class="h-screen flex justify-center items-center">
        <div class="bg-white mx-4 p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
        <div className='text-red-500'>
            {error && error}

        </div>
            <h1 class="text-3xl font-bold mb-8 text-center">Login</h1>
            <form onSubmit={handleSubmit}>
                <div class="mb-4">
                    <label class="block font-semibold text-gray-700 mb-2" for="email">
                        Email Address:
                    </label>
                    <input
                        class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email" type="email" placeholder="Enter your email address"
                        onChange={(e)=>setLoginValue({...loginvalue, email: e.target.value})} />
                </div>
                <div class="mb-4">
                    <label class="block font-semibold text-gray-700 mb-2" for="password">
                        Password
                    </label>
                    <input
                        class="border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password" type="password" placeholder="Enter your password" 
                        onChange={(e)=> setLoginValue({...loginvalue, password:e.target.value})}/>
    
                </div>
                <div class="mb-6">
                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        Login
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
  )
}

export default Login
