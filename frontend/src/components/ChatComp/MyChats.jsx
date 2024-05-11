import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../../Context/ChatProvider';
import axios from 'axios';
import { Box, Button, Stack, Text } from "@chakra-ui/react"
import ChatLoading from './atomsChatCom/ChatLoading';
import { getSender } from '../../config/ChatLogics';
import GroupChatModal from "../ChatComp/atomsChatCom/GroupChatModal";

const MyChats = ({ fetchAgain }) => {
  const { user, selectedChat, setSelectedChat, chats, setChats } = useContext(ChatContext);
  const [loggedUser, setLoggedUser] = useState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
      const { data } = await axios.get("http://localhost:3000/api/chat", config);
      setChats(data);
      console.log(data);
      setLoadingChat()
    } catch (err) {

    }
  }
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("UserInfo")));
    fetchChats();
  }, [fetchAgain])
  // console.log(chats);
  return (
    <>
      <Box d={{ base: selectedChat ? "none" : "flex", md: "flex" }} className='flex flex-col p-2 gap-4 items-center border-2 border-gray-400 rounded-lg'>
        <Box className=' text-xl flex justify-between gap-3 items-center'>
          My Chats
          <GroupChatModal>
            <Button className='flex '> New Group Chat</Button>
          </GroupChatModal>
        </Box>
        <Box className=' overflow-hidden w-full'>
          {chats ? (
            <>
            <div className='overflow-y-auto'>

              <Stack   className='w-40 mx-4'>
                {chats.map((chat) => (
                  <Box onClick={() => setSelectedChat(chat)}
                    cursor="pointer"
                    bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                    color={selectedChat === chat ? "white" : "black"}
                    px={3}
                    py={2}
                    borderRadius="lg"
                    key={chat._id}>
                    <Text>
                      {!chat.isGroupChat ? (getSender(loggedUser, chat.users)) : chat.chatName}
                    </Text>
                  </Box>
                ))}

              </Stack>
            </div>
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