import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
const Register = () => {
  const [objData, setObjData] = useState({});
const navigate =useNavigate();
  const getInputs = (name, value) => {
    const input = { [name]: value };
    setObjData({ ...objData, ...input });
  }
  const handleSubmit = () => {
    console.log(objData);
    axios.post("http://localhost:3000/api/user/", objData)
      .then((response) => {
       
          navigate("/");
      }).catch((err) => {
        console.log(err);
      })

  }
  return (
    <div className=" lg:px-10 border-black lg:w-1/2 ">
      <h2 className="text-center p-4 font-bold">Sign Up</h2>
      <div className="m-4 flex flex-col">
        <input
          type="text"
          placeholder="Name"
          className="border-b-2 border-black outline-none  m-4"
          name="name"
          onChange={(e) => getInputs(e.target.name, e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          className="border-b-2 border-black outline-none  m-4"
          name="email"
          onChange={(e) => getInputs(e.target.name, e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          className="border-b-2 border-black outline-none  m-4"
          name="password"
          onChange={(e) => getInputs(e.target.name, e.target.value)}
        />
        <label>Upload Image</label>
        <input
          type="file"
          className=" border-black outline-none  m-4"
        />
      </div>
      <div className="flex justify-center items-center">
          <button className="border-2 bg-purple-900 p-2 px-10 text-gray-300 rounded-full" onClick={handleSubmit}>Submit</button>
        
      </div>
    </div>
  );
};

export default Register;
