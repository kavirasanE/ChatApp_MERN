import React, { useContext,useState } from 'react'
import { ChatContext } from '../Context/ChatProvider'
import { Box } from '@chakra-ui/react';
import SideDrawer from '../components/ChatComp/SideDrawer';
import MyChats from '../components/ChatComp/MyChats';
import ChatBox from '../components/ChatComp/ChatBox';
const ChatPage = () => {
    const { user } = useContext(ChatContext);
    const [fetchAgain, setFetchAgain] = useState(false);
    return (
        <div >
            {user && <SideDrawer />}
            <Box className='flex justify-between h-[91.5vh] p-10'>
                {user && <MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
                {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
            </Box>
        </div>
    )
}

export default ChatPage