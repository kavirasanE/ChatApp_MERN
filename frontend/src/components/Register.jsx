import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="lg:m-10 lg:px-10 border-black lg:w-1/2 ">
      <h2 className="text-center p-4 font-bold">Sign Up</h2>
      <div className="m-4 flex flex-col">
        <input
          type="text"
          placeholder="Name"
          className="border-b-2 border-black outline-none  m-4"
        />
        <input
          type="text"
          placeholder="Mobile Number"
          className="border-b-2 border-black outline-none  m-4"
        />
        <input
          type="text"
          placeholder="Email"
          className="border-b-2 border-black outline-none  m-4"
        />
        <input
          type="text"
          placeholder="Gender"
          className="border-b-2 border-black outline-none  m-4"
        />
      </div>
      <div className="flex justify-center items-center">
        <Link to="/">
      <button className="border-2 bg-purple-900 p-2 px-10 text-gray-300 rounded-full ">Submit</button>
        </Link>
      </div>
    </div>
  );
};

export default Register;
