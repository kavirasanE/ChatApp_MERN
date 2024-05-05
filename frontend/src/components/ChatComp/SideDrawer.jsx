import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuItem, MenuList, Text, Tooltip, useDisclosure } from '@chakra-ui/react';
import React, { useContext, useState } from 'react'
import { CiBellOn } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";
import { IoIosArrowDropdown } from "react-icons/io";
import { ChatContext } from '../../Context/ChatProvider';
import ProfileModal from './atomsChatCom/ProfileModal';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import ChatLoading from './atomsChatCom/ChatLoading';
import UserListItem from './atomsChatCom/UserListItem';
import {Spinner} from "@chakra-ui/spinner"
const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [loadingChat, setLoadingChat] = useState();

  const navigate = useNavigate()
  const { user, setSelectedChat, chats, setChats } = useContext(ChatContext);
  const username = user.email.substring(0, 2);
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/")
  }

  const handleSearch = async () => {
    if (!search) {
      alert("Enter Something in Search")
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      }
      const { data } = await axios.get(`http://localhost:3000/api/user/?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    }
    catch (err) {
      alert(err.message)
    }
  }

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        }
      }
      const { data } = await axios.post("http://localhost:3000/api/chat",{ userId },config);

      if(!chats.find((c) => c._id === data._id))
        setChats([data,...chats])
      console.log(chats);
      setSelectedChat(data);
      setLoadingChat(false);

    } catch (err) {
      alert("this is not chat")
    }
  }
  return (
    <div>
      <Box className='flex  flex-row justify-between items-center  bg-gray-300 p-5'>
        <Tooltip label="Search Users to chat " hasArrow placement='bottom-end'>
          <Button variant="ghost">
            <i className="fas fa-search"></i>
            <Text className='hidden md:flex px-4' onClick={onOpen}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text> Chat APP</Text>
        <div className='flex justify-between gap-5 items-center'>
          <Menu>
            <MenuButton>
              <CiBellOn size={30} />
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>
          <Menu>
            <MenuButton>
              <Avatar className='cursor-pointer' name={username} />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Search User</DrawerHeader>

          <DrawerBody>
            <Box className='flex p-2 gap-2' >
              <Input placeholder='Search by Name or Email' value={search} onChange={(e) => setSearch(e.target.value)} />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? <ChatLoading /> : (
              searchResult?.map(user => (
                <>
                  <UserListItem key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                </>
              ))
            )}
            {loadingChat && <Spinner/>}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default SideDrawer