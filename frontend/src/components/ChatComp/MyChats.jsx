import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../../Context/ChatProvider';
import axios from 'axios';
import { Box, Button, Stack, Text } from "@chakra-ui/react"
import ChatLoading from './atomsChatCom/ChatLoading';
import { getSender } from '../../config/ChatLogics';
const MyChats = () => {
  const { user, selectedChat, setSelectedChat, chats, setChats } = useContext(ChatContext);
  const [loggedUser, setLoggedUser] = useState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
      const {data } = await axios.get("http://localhost:3000/api/chat", config);
      setChats(data);
      console.log(data);
      setLoadingChat()
    } catch (err) {

    }
  }


  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("UserInfo")));
    fetchChats();
  }, [])



  return (
    <>
      <Box d={{ base: selectedChat ? "none" : "flex", md: "flex" }} className='flex flex-col p-2 gap-4 items-center w-1/4 border-2 border-gray-400 rounded-lg'>
      
        <Box className=' text-xl flex justify-between gap-3 items-center'>
          My Chats
          <Button className='flex '> New Group Chat</Button>
        </Box>
        <Box className=' overflow-hidden w-full'>
          {chats ? (
            <>
              <Stack >
                {chats.map((chat) => (
                  <Box onClick={() => selectedChat(chat)} key={chat._id} className='p-3' bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"} color={selectedChat === chat ? "white" : "black"}>
                    <Text>
                      {!chat.isGroupChat ? (getSender(loggedUser, chat.users)) : chat.chatName}
                    </Text>
                  </Box>
                ))}

              </Stack>
            </>
          ) : (
            <>
              <ChatLoading />
            </>
          )}

        </Box>
      </Box>
    </>
  )
}

export default MyChats