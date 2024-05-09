import React from 'react'
import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Text } from "@chakra-ui/react"
import { FaRegEye } from "react-icons/fa";
const ProfileModal = ({ user, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <div>
            {children ? (
                <>
                <span onClick={onOpen}>{children}</span>

                </> ):(
                   <>
                   <Text className=" px-4 py-2 cursor-pointer" onClick={onOpen}><FaRegEye /></Text>
                   </>
                )}
                   
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>{user.name}</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Text> Email : {user.email}</Text>
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme='blue' mr={3} onClick={onClose}>
                                    Close
                                </Button>
                                <Button variant='ghost'>Secondary Action</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
        </div>
    )
}

export default ProfileModal