import React from "react";
import Navbar from '../components/Navbar'
import Register from "../components/Register";
import InboxImage from "../components/InboxImage";
import Footer from '../components/Footer'
const SignUp = () => {
  return (
    <div>
      <Navbar />
      <div className=" flex md:justify-between md:items-between items-center justify-center ">
       <Register/>
       <div className=' md:w-1/2 md:mr-36'>
       <InboxImage />
       </div>
      </div>
      <Footer/>
    </div>
  );
};

export default SignUp;
