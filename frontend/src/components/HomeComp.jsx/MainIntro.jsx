import React from "react";
import gmail from "../../assets/Gmail.png";
import Email from "../../assets/Email.png";
import Post from "../../assets/Post.png";
import yahoo from "../../assets/Yahoo Mail App.png";
import oulook from "../../assets/Microsoft Outlook.png";
import { Link } from "react-router-dom";

const MainIntro = () => {
  return (
    <div>
      <div className="">
        <img src={Email} alt="gmail" className="absolute top-20 left-1/4 " />
        <img src={Post} alt="gmail" className="absolute top-20 left-1/2 ml-60"/>
        <div className="flex flex-col  top-64 ml-96">
        <p className=" text-3xl font-bold mt-48 ">Start Your 2-Month Free Trail</p>
        <Link to="/Add">
         <button className=" border-2 ml- bg-purple-900 p-4 px-10 mx-24 my-5 text-gray-300 text-xl font-semibold rounded-full">Try Now</button>
        </Link>
        </div>
        
        <img src={yahoo} alt="gmail" className="absolute top-40 ml-32" />
        <img src={gmail} alt="gmail" className="ml-64 top-96 absolute" />
        <img
          src={oulook}
          alt="gmail"
          className="absolute top-96 right-48 ml-9"
        />
      </div>
    </div>
  );
};

export default MainIntro;
