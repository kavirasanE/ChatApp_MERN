import React from "react";
import Navbar from "../components/Navbar";
import UpdateInput from "../components/UpdateInput";
import InboxImage from "../components/InboxImage";
import Footer from "../components/Footer";

const UpdatePassword = () => {
  return (
    <div>
      <Navbar />
      <div className=" flex md:justify-between md:items-between items-center justify-center ">
        <UpdateInput />
        <div className='md:w-1/2 md:mr-36'>
       <InboxImage />
       </div>
      </div>
      <Footer/>
    </div>
  );
};

export default UpdatePassword;
