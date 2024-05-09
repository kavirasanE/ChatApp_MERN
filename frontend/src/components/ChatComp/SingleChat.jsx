import React, { useContext } from 'react'
import { ChatContext } from '../../Context/ChatProvider'
import { Text, IconButton, Box } from '@chakra-ui/react';
import { MdArrowBack } from "react-icons/md";
import ProfileModal from './atomsChatCom/ProfileModal';
import { getSender, getSenderFull } from '../../config/ChatLogics';
import UpdateGroupChatModal from "./UpdateGroupChatModal";
const SingleChat = ({ fetchAgain, setFetchAgain }) => {

    const { user, selectedChat, setSelectedChat } = useContext(ChatContext);
    return (
        <>
            {selectedChat ? (
                <>
                    <Text fontSize={{ base: "28px", md: "30px" }}
                        pb={3}
                        px={2}
                        w="100%"
                        fontFamily="Work sans"
                        d="flex"
                        justifyContent={{ base: "space-between" }}
                        alignItems="center">


                        {!selectedChat.isGroupChat ? (
                            <>
                                {/* <div className='flex justify-center items-center gap-5'> */}
                                {/* {selectedChat.users[1].name.toUpperCase()} */}
                                {/* {getSender(user,selectedChat.users)}
                                  <ProfileModal user={getSenderFull(user,selectedChat.users)}/> */}
                                {/* </div> */}

                                <div className='flex gap-10 justify-between items-center'>
                                    <IconButton
                                        d={{ base: "flex", md: "none" }}
                                        icon={<MdArrowBack />}
                                        onClick={() => setSelectedChat("")}
                                    />
                                    {getSender(user, selectedChat.users)}
                                    <ProfileModal
                                        user={getSenderFull(user, selectedChat.users)}
                                    />
                                </div>
                                <Box d="flex"
                                    flexDir="column"
                                    alignItems="center"
                                    justifyContent="flex-end"

                                    w="100%"
                                    h="100%"
                                    p={3}
                                    bg="white"
                                    borderRadius="lg"
                                    borderWidth="2px"
                                    overflowY="hidden">

                                </Box>

                            </>
                        ) : (
                            <>
                                {selectedChat.chatName.toUpperCase()}
                                <UpdateGroupChatModal
                                    fetchAgain={fetchAgain}
                                    setFetchAgain={setFetchAgain} />
                            </>
                        )}
                    </Text>
                </>
            ) : (<>
                <div className='flex justify-center items-center h-1/2'>
                    <p className='font-bold text-xl'>Click on a User to Start Chating</p>
                </div>
            </>)}
        </>
    )
}

export default SingleChat