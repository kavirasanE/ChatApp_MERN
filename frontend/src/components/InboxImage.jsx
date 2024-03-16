import React from "react";
import gmail from "../assets/Gmail.png";
import Email from "../assets/Email.png";
import Post from "../assets/Post.png";
import Typing from "../assets/Typing.png";
import yahoo from "../assets/Yahoo Mail App.png";
import oulook from "../assets/Microsoft Outlook.png";
import UserTyping from "../assets/User Typing Using Typewriter.png";

const InboxImage = () => {
  return (
    <div className="relative ml-24 w-1/2 h-96">
      <img src={gmail} alt="gmail" className="ml-40 mb-10 top-0 absolute" />
      <img src={yahoo} alt="gmail" className="absolute top-1/4" />
      <img src={UserTyping} alt="gmail" className="absolute top-1/4 left-36" />
      <img src={Typing} alt="gmail" className="absolute top-12 left-96  " />
      <img src={oulook} alt="gmail" className="absolute top-1/2 left-96 ml-9" />
      <img src={Email} alt="gmail" className="absolute top-64 " />
      <img src={Post} alt="gmail"  className="absolute top-80 left-80 "/>
    </div>
  );
};

export default InboxImage;
