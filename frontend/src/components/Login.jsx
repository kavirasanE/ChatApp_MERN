import React, {  useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { ChatContext } from '../Context/ChatProvider';
const Login = () => {

  const [loginData, setLoginData] = useState({});
  const {setUser} = useContext(ChatContext);
 const navigate =useNavigate();

  const getInput = (name, value) => {
    const inputs = { [name]: value };
    setLoginData({ ...loginData, ...inputs });
  }

  const handleLogin = async () => {
        axios.post("http://localhost:3000/api/user/login", loginData)
        .then((response) => {
   setUser(response.data);
   localStorage.setItem("userInfo",JSON.stringify(response.data))
          console.log(response.data);
          navigate("/chat")
        }).catch((err) => {
          console.log(err);
        })
  }
  return (
    <div className='lg:px-20 md:my-4 border-black lg:w-1/2 '>
      <h1 className='text-center p-4 text-xl font-bold'>Login</h1>
      <div className='md:m-4 flex flex-col'>
        <input type='text' placeholder='Email' name="email" onChange={(e) => getInput(e.target.name, e.target.value)} className='border-b-2 border-black outline-none  m-4' />
        <input type='text' placeholder='Password' name="password" onChange={(e) => getInput(e.target.name, e.target.value)} className='border-b-2  border-black outline-none m-4' />
      </div>
      <div className='flex justify-end'>
        <Link to="/Updatepassword" className='mr-6 mb-2'>Forget Password ? </Link>
      </div>

      <div className=" flex flex-col justify-center items-center md:gap-7">
        
          <button className='border-2 bg-purple-900 p-2 px-10 text-gray-300 rounded-full align-text-center' onClick={handleLogin}>Sign In</button>
    
        <p>Or</p>
        <p>Don't have an account? <span className='text-blue-700 font-bold'> <Link to="/sign-up"> Sign Up </Link></span></p>
      </div>

    </div>
  )
}

export default Login
