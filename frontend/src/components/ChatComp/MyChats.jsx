import React, { useContext } from 'react'
import { ChatContext } from '../../Context/ChatProvider';
const MyChats = () => {
  const { user, selectedChat, setSelectedChat, chats, setChats } = useContext(ChatContext);

  
  return (
    <div>MyChats</div>
  )
}

export default MyChats