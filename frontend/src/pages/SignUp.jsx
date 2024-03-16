import React from "react";
import Navbar from '../components/Navbar'
import Register from "../components/Register";
import InboxImage from "../components/InboxImage";
import Footer from '../components/Footer'
const SignUp = () => {
  return (
    <div>
      <Navbar />
      
       <div className="flex ">
       <Register/>
       <InboxImage/>
      </div>
      <Footer/>
    </div>
  );
};

export default SignUp;
