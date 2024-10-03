import React, { useState } from "react";
import { Box, Flex, Button } from "@chakra-ui/react"; 
import Header from "../../Components/Dashboard/Header";
import NewChatButton from "../../Components/Dashboard/NewChatButton";
import ChatListCard from "../../Components/Dashboard/ChatListCard";
import LabChatBox from "../../Components/Dashboard/LabChatBox";
import { primaryColorOrange } from "../../colorCodes";
import { SmallAddIcon, ArrowBackIcon } from "@chakra-ui/icons";

const AiLab = () => {
  const [chats, setChats] = useState([{ id: 1, name: "AI Lab" }]);
  const [activeChat, setActiveChat] = useState(null);

  const handleNewChat = () => { //to add new chats func
    const newChatId = chats.length + 1;
    const newChat = { id: newChatId, name: `Chat ${newChatId}` };
    setChats([...chats, newChat]);
    setActiveChat(newChat); 
  };


  const handleChatSelect = (chat) => {
    setActiveChat(chat); 
  };

  const handleBackToList = () => {
    setActiveChat(null);
  };

  return (
    <Box p={4} w="100%" maxW="100%" mx="auto">
      <Header title={"AI Lab"} />

      <Flex mt={5} direction={{ base: "column", md: "row" }} gap={4}>
        <Box w={{ base: "100%", md: "30%" }}>
          <>
            {!activeChat ? (
              <NewChatButton onClick={handleNewChat} />
            ) : (
              <Button onClick={handleBackToList} bg={primaryColorOrange} color={"white"}>
                <ArrowBackIcon mr={3} mt={1} /> Chat List
              </Button>
            )}
          </>
        </Box>

        <Box w={{ base: "100%", md: "70%", lg: "70%" }}>
          {activeChat ? (
            <>
              <ChatListCard chatName={activeChat.name} />
              <LabChatBox />
            </>
          ) : (
            <>
              {chats.map((chat) => (
                <ChatListCard
                  key={chat.id}
                  chatName={chat.name}
                  onClick={() => handleChatSelect(chat)}
                />
              ))}
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default AiLab;
