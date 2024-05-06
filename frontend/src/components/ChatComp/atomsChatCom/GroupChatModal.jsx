import React, { useContext, useState } from 'react'
import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Text, Input } from "@chakra-ui/react"
import { ChatContext } from '../../../Context/ChatProvider';
import axios from 'axios';
import UserListItem from "../atomsChatCom/UserListItem"
import UserBadgeItem from "../atomsChatCom/UserBadgeItem"


const GroupChatModal = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [groupChatName, setGroupChatName] = useState();
    const [selectedUser, setSelectedUser] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user, chats, setChats } = useContext(ChatContext);

    const handleSearch = async (query) => {
        setSearch(query);

        if (!query) {
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const { data } = await axios.get(`http://localhost:3000/api/user/?search=${search}`, config);
            console.log(data);
            setSearchResults(data);
            setLoading(false)
        }
        catch (err) {
            console.log(err);
        }

    }
    console.log(selectedUser)
    const handleSubmit = async () => {
        if (!groupChatName || !selectedUser) {
            console.log("pls select the user")
        }
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            };
            const { data } = await axios.post("http://localhost:3000/api/chat/group", {
                name: groupChatName,
                users: JSON.stringify(selectedUser.map((u) => u._id)),
            },config);
            setChats([data, ...chats]);
            alert("New Group is Created");
            onClose();
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleGroup = (userToAdd) => {
        if (selectedUser.includes(userToAdd)) {
            console.log("User already Added");
            return;
        }
        setSelectedUser([...selectedUser, userToAdd]);

    }
    const handleDelete = (users) => {
        const filterData = selectedUser.filter((u) => u._id !== users._id);
        setSelectedUser(filterData);
    }

    return (
        <>
            <Text className=" px-4 py-2 cursor-pointer" onClick={onOpen}>{children}</Text>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader> Create Group Chat </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input placeholder='Chat Name' className='m-3' onChange={(e) => setGroupChatName(e.target.value)} />
                        <Input placeholder='Add Users Eg: kavi,john,praveen' className='m-3' onChange={(e) => handleSearch(e.target.value)} />
                        <div className='grid grid-cols-3 gap-4 py-3'>

                            {selectedUser.map((u,index)=> (
                                <UserBadgeItem key={index} user={u} handleFunction={() => handleDelete(u)} />
                            ))}
                        </div>


                        {loading ? <span>loading...</span> : (
                            searchResult?.map((user) => (

                                <UserListItem key={user._id}
                                    user={user}
                                    handleFunction={() => handleGroup(user)}
                                />
                            ))



                        )}

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                            Create Chat
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default GroupChatModal