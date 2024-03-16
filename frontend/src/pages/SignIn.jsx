import React from 'react'
import Navbar from '../components/Navbar'
import Login from '../components/Login'
import Footer from '../components/Footer'
import InboxImage from '../components/InboxImage'
const SignIn = () => {
  return (
    <div>
       <Navbar/>
       <div className=" flex justify-between  items-between">
       <Login/>
       <InboxImage />
      </div>
      <Footer/>
    </div>
  )
}

export default SignIn
