import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='lg:px-20 md:my-4 border-black lg:w-1/2 '>
      <h1 className='text-center p-4 text-xl font-bold'>Login</h1>
       <div className='md:m-4 flex flex-col'>
        <input type='text' placeholder='Username' className='border-b-2 border-black outline-none  m-4'/>
        <input type='text' placeholder='Password' className='border-b-2  border-black outline-none m-4'/>
        </div>
        <div className='flex justify-end'>
        <Link to="/Updatepassword" className='mr-6 mb-2'>Forget Password ? </Link>
        </div>
        
         <div className= " flex flex-col justify-center items-center md:gap-7">
            <Link to="/home">
         <button className='border-2 bg-purple-900 p-2 px-10 text-gray-300 rounded-full align-text-center'>Sign In</button>
            </Link>
         <p>Or</p>
          <p>Don't have an account? <span className='text-blue-700 font-bold'> <Link to="/sign-up"> Sign Up </Link></span></p>
         </div>
        
    </div>
  )
}

export default Login
