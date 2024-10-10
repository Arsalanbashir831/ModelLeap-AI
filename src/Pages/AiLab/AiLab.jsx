import React, { useState } from "react";
import { Box, Flex, Button, Grid, Text } from "@chakra-ui/react";
import Header from "../../Components/Dashboard/Header";
import NewChatButton from "../../Components/Dashboard/NewChatButton";
import ChatListCard from "../../Components/Dashboard/ChatListCard";
import { primaryColorOrange } from "../../colorCodes";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import Description from "../../Components/Dashboard/Description";

const AiLab = () => {
  const [chats, setChats] = useState([{ id: 1, name: "Lab" }]);
  // const [activeChat, setActiveChat] = useState(null);

  const handleNewChat = () => {
    const newChatId = chats.length + 1;
    const newChat = { id: newChatId, name: `Chat ${newChatId}` };
    setChats([...chats, newChat]);
    // setActiveChat(newChat);
  };

  // const handleBackToList = () => {
  //   setActiveChat(null);
  // };

  return (
    <Box p={4} w="100%" maxW="100%" mx="auto">
      <Header title={"Lab"} />
      <Box mb={1}>
        <Description description="Create, manage, and test your AI tools and chatbots with ease." />
      </Box>
      <Flex mt={5} direction={{ base: "column", md: "row" }} gap={4}>
        <Box w={{ base: "100%", md: "30%" }}>
          <Flex ml={2} mb={2} justifyContent="flex-start">
            {/* {!activeChat ? ( */}
              <NewChatButton onClick={handleNewChat} />
            {/* // ) : ( */}
            {/* //   <Button onClick={handleBackToList} bg={primaryColorOrange} color="white">
            //     <ArrowBackIcon mr={3} mt={1} /> Chat List
            //   </Button> */}
            {/* // ) */}
            {/* } */}
          </Flex>

          {/* {!activeChat && ( */}
            <Box w={"900px"} p={3} borderRadius="md">
              <Grid
                templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
                gap={3}
              >
                {chats.map((chat) => (
                  <Link to={`/app/ailab/chat/${chat.id}`} key={chat.id}>
                    <ChatListCard chatName={chat.name} />
                  </Link>
                ))}
              </Grid>
            </Box>
          {/* )} */}
        </Box>

        {/* <Box w={{ base: "100%", md: "70%", lg: "70%" }}>
          {activeChat && (
            <>
              <ChatListCard chatName={activeChat.name} />
            </>
          )}
        </Box> */}
      </Flex>
    </Box>
  );
};

export default AiLab;
