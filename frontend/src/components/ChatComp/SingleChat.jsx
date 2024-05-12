import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../Context/ChatProvider";
import {
  Text,
  IconButton,
  Box,
  Spinner,
  FormControl,
  Input,
  useEditable,
} from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md";
import ProfileModal from "./atomsChatCom/ProfileModal";
import { getSender, getSenderFull } from "../../config/ChatLogics";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import axios from "axios";
import ScrollableChat from "../ScrollableChat";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:3000";

var socket, selectedChatCompare;
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = useContext(ChatContext);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIstyping] = useState(false);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setTyping(true));
    socket.on("Stop typing", () => setTyping(false));
  }, []);

  const fetchMessages = async (req, res) => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:3000/api/message/${selectedChat._id}`,
        config
      );
      console.log(data);
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
      console.log(data);
    } catch (err) {
      alert("Failed to Load the Message");
    }
  };

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        //give Notification
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      socket.emit("stop Typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.post(
          "http://localhost:3000/api/message/",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        console.log(data);
        socket.emit("new Message", data);
        setMessages((prevMessages) => [...prevMessages, data]);
        setNewMessage("");
      } catch (err) {
        console.error("Failed to send the message", err);
        alert("Failed to send the message");
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if (!socketConnected) return;

    if (!typing) {
      setTyping(false);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    console.log("ffff");
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("Stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };
  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            
            px={2}
            w="100%"
            fontFamily="Work sans"
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            {!selectedChat.isGroupChat ? (
              <>
                <div className="flex justify-between items-center">
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
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </Text>

          {loading ? (
            <Spinner alignSelf="center" margin="auto" w={20} h={20} size="xl" />
          ) : (
            <div className="h-80 w-full overflow-y-auto">
              <ScrollableChat messages={messages} />
            </div>
          )}
          <div >
            <FormControl>
              {istyping ? <div>Loading...</div> : <></>}
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a Message"
                onKeyDown={sendMessage}
                onChange={typingHandler}
                value={newMessage}
                istyping={istyping}
              />
            </FormControl>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-center items-center h-1/2">
            <p className="font-bold text-xl">
              Click on a User to Start Chating
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default SingleChat;
