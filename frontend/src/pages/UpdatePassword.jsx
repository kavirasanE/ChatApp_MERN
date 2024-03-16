import React from "react";
import Navbar from "../components/Navbar";
import UpdateInput from "../components/UpdateInput";
import InboxImage from "../components/InboxImage";
import Footer from "../components/Footer";

const UpdatePassword = () => {
  return (
    <div>
      <Navbar />
      <div className=" flex flex-row">
        <UpdateInput />
        <InboxImage />
      </div>
      <Footer/>
    </div>
  );
};

export default UpdatePassword;
