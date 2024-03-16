import React from "react";
import MainNavbar from "../components/HomeComp.jsx/MainNavbar";
import MainFooter from "../components/HomeComp.jsx/MainFooter";
import gmail from "../assets/Gmail.png";
import yahoo from "../assets/Yahoo Mail App.png";
import oulook from "../assets/Microsoft Outlook.png";
import footer  from '../assets/Rectangle 17.png'
const AddAccount = () => {
  return (
    <div>
      <MainNavbar />
      <div className="flex flex-col  justify-center items-center">
        <p className="text-3xl font-bold ">ADD ACCOUNT</p>
        <div className="flex my-10 gap-20">
          <img src={gmail} alt="gmail" width={100} className="rotate-12" />
          <img src={yahoo} alt="gmail" width={100} className="-rotate-6" />
          <img src={oulook} alt="gmail" width={100} className="" />
        </div>
      </div>
      <div className='absolute mt-64 w-full'>
      <img src={footer} alt='footer' className="w-full h-96 " />
    </div>
    </div>
  );
};

export default AddAccount;
