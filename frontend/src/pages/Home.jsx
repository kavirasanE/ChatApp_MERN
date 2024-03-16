import React from "react";
import MainNavbar from "../components/HomeComp.jsx/MainNavbar";
import MainIntro from "../components/HomeComp.jsx/MainIntro";
import MainBox from "../components/HomeComp.jsx/MainBox";
import footer from "../assets/Rectangle 17.png"
const Home = () => {
  return (
    <div>
      <MainNavbar />
      <div>
        <MainIntro />
      </div>
      <div className=" mt-20 ">
        <p className="text-center font-bold text-2xl border-b-2 mx-20 border-black p-10">
          Subscription
        </p>
      </div>
      <div className="relative">
      <div className="grid grid-cols-3 relative justify-center justify-items-center z-10">
        <MainBox />
        <MainBox />
        <MainBox />
        <MainBox />
        <MainBox />
        <MainBox />
      </div>
      <div className='absolute bottom-1 w-full'>
      <img src={footer} alt='footer' className='w-full'/>
    </div>
      </div>
    </div>
  );
};

export default Home;
