import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Button,
  Grid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Header from "../../Components/Dashboard/Header";
import NewChatButton from "../../Components/Dashboard/NewChatButton";
import ChatListCard from "../../Components/Dashboard/ChatListCard";
import Description from "../../Components/Dashboard/Description";
import { BASE_URL } from "../../Constants";
import { useNavigate } from "react-router-dom";
import CreateBotModel from "../../Components/Dashboard/CreateBotModel";

const AiLab = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false); // Ensure refresh is a state here
  const { isOpen, onOpen, onClose } = useDisclosure();
 
  const navigate = useNavigate();

  // Fetch chats from the API
  useEffect(() => {
    const fetchBots = async () => {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${BASE_URL}/api/bot/get-all-bots`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setChats(data);
      } else if (response.status === '403' || response.status === 403) {
        navigate("/auth");
      }
    };
    fetchBots();
  }, [navigate, refresh]); // Use refresh here to trigger a re-fetch

  if (loading) {
    return (
      <Box p={4} w="100%" mx="auto">
        <Text>Loading...</Text>
      </Box>
    );
  }

  return (
    <Box p={[4, 8]} w="100%" maxW="100%" mx="auto">
      <Header title={"Lab"} />
      <Box mb={2}>
        <Description description="Create, manage, and test your AI tools and chatbots with ease." />
      </Box>

      <Flex mt={5} direction={{ base: "column", md: "row" }} gap={4}>
        <Box w={{ base: "100%", md: "30%" }} mb={{ base: 6, md: 0 }}>
          <Flex mb={4} justifyContent={{ base: "center", md: "flex-start" }}>
            <NewChatButton onClick={onOpen} isLoading={loading} />
          </Flex>

          <Box p={3} borderRadius="md">
            <Grid
              templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(2, 1fr)" }} // Adjusts the number of columns based on screen size
              gap={4}
            >
              {chats?.map((chat) => (
                <ChatListCard
                  key={chat.id} 
                  refresh={refresh}
                  setRefresh={setRefresh} 
                  id={chat.id}
                  apiKey={chat.apiKey}
                  kwargs={chat.kwargs}
                  modelName={chat.modelName}
                  botName={chat.botName}
                  systemContext={chat.systemContext}
                  createdAt={chat.createdAt}
                />
              ))}
            </Grid>
          </Box>
        </Box>
      </Flex>

     
      <CreateBotModel refresh={refresh} setRefresh={setRefresh} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default AiLab;
