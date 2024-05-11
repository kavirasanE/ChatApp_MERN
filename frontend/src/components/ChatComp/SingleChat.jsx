import React, { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../../Context/ChatProvider';
import { Text, IconButton, Box, Spinner, FormControl, Input } from '@chakra-ui/react';
import { MdArrowBack } from "react-icons/md";
import ProfileModal from './atomsChatCom/ProfileModal';
import { getSender, getSenderFull } from '../../config/ChatLogics';
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import axios from 'axios';
import ScrollableChat from "../ScrollableChat";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const { user, selectedChat, setSelectedChat } = useContext(ChatContext);

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState('');

    const fetchMessages = async (req, res) => {
        if (!selectedChat)
            return;
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
            };
            setLoading(true);
            const { data } = await axios.get(`http://localhost:3000/api/message/${selectedChat._id}`, config)
            console.log(data);
            setMessages(data);
            setLoading(false)
            console.log(data);
        }
        catch (err) {
            alert("Failed to Load the Message")
        }

    }


    useEffect(() => {
        fetchMessages();
    }, [selectedChat])

    const sendMessage = async (e) => {
        if (e.key === "Enter" && newMessage) {
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    }
                };

                const { data } = await axios.post("http://localhost:3000/api/message/", {
                    content: newMessage,
                    chatId: selectedChat._id,
                }, config);
                console.log(data);
                setMessages(prevMessages => [...prevMessages, data]);
                setNewMessage('');
            } catch (err) {
                console.error("Failed to send the message", err);
                alert("Failed to send the message");
            }
        }
    };

    const typingHandler = (e) => {
        setNewMessage(e.target.value);
    };

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
                            </>
                        ) : (
                            <>
                                {selectedChat.chatName.toUpperCase()}
                                <UpdateGroupChatModal
                                    fetchAgain={fetchAgain}
                                    setFetchAgain={setFetchAgain}
                                    fetchMessages={fetchMessages} />
                            </>
                        )}
                    </Text>
                   
                        {loading ? (
                            <Spinner alignSelf="center" margin="auto" w={20} h={20} size="xl" />
                        ) : (
                            <div className='overflow-y-auto max-h-[300px] w-full'>
                                <ScrollableChat messages={messages} />
                            </div>
                        )}
                        <div className='absolute bottom-14 w-[800px]'>
                            <FormControl>
                                <Input variant="filled" bg="#E0E0E0"
                                    placeholder='Enter a Message'
                                    onKeyDown={sendMessage}
                                    onChange={typingHandler}
                                    value={newMessage} />
                            </FormControl>
                        </div>
                    
                </>
            ) : (
                <>
                    <div className='flex justify-center items-center h-1/2'>
                        <p className='font-bold text-xl'>Click on a User to Start Chating</p>
                    </div>
                </>
            )}
        </>
    );
};

export default SingleChat;
