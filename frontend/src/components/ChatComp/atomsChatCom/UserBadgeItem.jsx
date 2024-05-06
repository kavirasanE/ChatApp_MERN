import React from 'react'
import { FaClosedCaptioning } from 'react-icons/fa'
import {Box} from "@chakra-ui/react"

const UserBadgeItem = ({user,handleFunction}) => {
  return (
    <Box className='flex justify-center items-center bg-purple-700  text-white p-2 rounded-md gap-2'>
          {user.name}
        <p   onClick={handleFunction} >x</p>
    </Box>
  )
}

export default UserBadgeItem