import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      navigate("/chat")
    }
  }, [navigate])

  return (
    <div>
      Home
    </div>

  )
}

export default Home;



// import React from "react";
// import MainNavbar from "../components/HomeComp.jsx/MainNavbar";
// import MainIntro from "../components/HomeComp.jsx/MainIntro";
// import MainBox from "../components/HomeComp.jsx/MainBox";
// import footer from "../assets/Rectangle 17.png"
// const Home = () => {
//   return (
//     <div>
//       <MainNavbar />
//       <div className="flex justify-center items-center ">
//         <MainIntro />
//       </div>
//       <div className="mt-20 ">
//         <p className="text-center font-bold text-2xl border-b-2 md:mx-20 border-gray-500 mx-2 p-10">
//           Subscription
//         </p>
//       </div>
//       <div className="relative">
//       <div className="grid md:grid-cols-3 g relative justify-center justify-items-center z-10">
//         <MainBox />
//         <MainBox />
//         <MainBox />
//         <MainBox />
//         <MainBox />
//         <MainBox />
//       </div>
//       <div className='absolute bottom-1 w-full'>
//       <img src={footer} alt='footer' className='w-full'/>
//     </div>
//       </div>
//     </div>
//   );
// };

// export default Home;