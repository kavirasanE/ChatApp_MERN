import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-end align-items-center md:p-5 p-2 mx-4 md:gap-10 gap-2'>
      <p>Subscription</p>
      <p className='text-nowrap'>About US</p>
      <p>Help</p>
      <p className='text-nowrap'>Contact Us</p>
    </div>
  )
}

export default Navbar
