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
        <img src={Email} alt="gmail" className="absolute top-20 left-1/4 w-20 md:w-36 " />
        <img src={Post} alt="gmail" className="absolute top-20 left-1/2 md:ml-60  w-20 md:w-36"/>
        <div className="flex flex-col top-64 ">
        <p className=" text-3xl font-bold mt-48 ">Start Your 2-Month Free Trail</p>
        <Link to="/Add">
         <button className=" border-2 bg-purple-900 p-4 px-10 md:mx-24 my-2 md:my-5 text-gray-300 text-xl font-semibold rounded-full">Try Now</button>
        </Link>
        </div>
        <img src={yahoo} alt="gmail" className="absolute top-24 md:top-40 left-2 xl:left-24 w-20 md:w-36" />
        <img src={gmail} alt="gmail" className=" absolute top-36 md:top-96 left-24 w-20 md:w-36" />
        <img
          src={oulook}
          alt="gmail"
          className="absolute top-96 left-1/2 md:ml-60  w-20 md:w-36"
        />
      </div>
    </div>
  );
};

export default MainIntro;
// absolute md:top-96 md:left-96  left-52 top-80 w-20 md:w-36