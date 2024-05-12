import React, { useContext } from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatContext } from "../Context/ChatProvider";
import { Avatar, Tooltip } from "@chakra-ui/react";
const ScrollableChat = ({ messages, istyping }) => {
  const { user } = useContext(ChatContext);
  return (
    <div>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {/* {
                         isLastMessage(messages, i, user._id) && (
                            <Tooltip label={m.sender.name} placement='bottom-start' hasArrow>
                                <Avatar name={m.sender.name} cursor="pointer" mt="7px" mr={1} size="sm" />
                            </Tooltip>
                        )
                       
                    } */}
            {/* {
                          isSameSender(messages, m, i, user._id) && (
                            <Tooltip label={m.sender.name} placement='bottom-start' hasArrow>
                                <Avatar name={m.sender.name} cursor="pointer" mt="12px" mr={1} size="sm" />
                            </Tooltip>
                        )
                       
                    } */}

            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginRight: isSameUser(messages, m, i, user._id),
              }}
              className="rounded-md px-2  py-2 m-2 "
            >
              {m.content}
            </span>
          </div>
        ))}
    </div>
  );
};

export default ScrollableChat;
