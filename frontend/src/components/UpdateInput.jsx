import React from 'react'
import { Link } from 'react-router-dom'

const UpdateInput = () => {
  return (
    <div className="m-10 px-10 border-black w-1/2 ">
    <h2 className="text-center p-4 font-bold">Update Password </h2>
    <div className="m-4 flex flex-col">
      <input
        type="text"
        placeholder="Username"
        className="border-b-2 border-black outline-none  m-4 my-10"
      />
      <input
        type="text"
        placeholder="Password"
        className="border-b-2 border-black outline-none  m-4 my-10"
      />
    </div>
    <div className="flex justify-center items-center">
        <Link to="/"> 
    <button className="border-2 bg-purple-900 p-2 px-10 text-gray-300 rounded-full ">Submit</button>
        </Link>
    </div>
  </div>
  )
}

export default UpdateInput
