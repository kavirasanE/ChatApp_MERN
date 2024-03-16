import React from 'react'
import Navbar from '../components/Navbar'
import Login from '../components/Login'
import Footer from '../components/Footer'
import InboxImage from '../components/InboxImage'
const SignIn = () => {
  return (
    <div>
       <Navbar/>
       <div className=" flex md:justify-between md:items-between items-center justify-center ">
       <Login/>
       <div className=' md:w-1/2 md:mr-36'>
       <InboxImage />
       </div>
       
      </div>
      <Footer/>
    </div>
  )
}

export default SignIn
