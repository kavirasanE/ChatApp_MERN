import React, { useContext } from 'react'
import { ChatContext } from '../Context/ChatProvider'
import { Box } from '@chakra-ui/react';
import SideDrawer from '../components/ChatComp/SideDrawer';
import MyChats from '../components/ChatComp/MyChats';
import ChatBox from '../components/ChatComp/ChatBox';
const ChatPage = () => {
    const { user } = useContext(ChatContext);
    return (
        <div >
            {user && <SideDrawer />}
            <Box className='flex justify-between h-[91.5vh] p-10'>
                {user && <MyChats />}
                {user && <ChatBox />}
            </Box>
        </div>
    )
}

export default ChatPage