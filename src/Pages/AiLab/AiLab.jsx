import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Button,
  Grid,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import Header from "../../Components/Dashboard/Header";
import NewChatButton from "../../Components/Dashboard/NewChatButton";
import ChatListCard from "../../Components/Dashboard/ChatListCard";
import Description from "../../Components/Dashboard/Description";
import { BASE_URL } from "../../Constants";
import { useNavigate } from "react-router-dom";
import ContextModal from "../../Components/Dashboard/ContextModal";
import CreateBotModel from "../../Components/Dashboard/CreateBotModel";

const AiLab = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const [chatName, setChatName] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  // Fetch chats from the API
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("Authorization token is missing.");
          return;
        }

        const response = await fetch(`${BASE_URL}/api/chats`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setChats(data.chats); // Assuming the response contains an array of chats
        } else if (response.status === 403 || response.status === "403") {
          navigate("/auth");
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [navigate]);

  // Function to create a new chat
  const handleNewChat = async () => {
    setIsCreatingChat(true);
    try {
      const token = localStorage.getItem("authToken");
      const apiKey = localStorage.getItem("apiKey");
      if (!token) {
        console.error("Authorization token is missing.");
        return;
      }

      const response = await fetch(`${BASE_URL}/api/chat/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "x-api-key": apiKey,
        },
        body: JSON.stringify({ name: chatName }),
      });

      const data = await response.json();
      if (response.ok) {
        setChats([...chats, { chatId: data.chatId, name: data.name }]);
        onClose(); // Close the modal after successful chat creation
      } else if (response.status === 403 || response.status === "403") {
        navigate("/auth");
      }
    } catch (error) {
      console.error("Error creating chat:", error);
    } finally {
      setIsCreatingChat(false);
    }
  };

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
            <NewChatButton onClick={onOpen} isLoading={isCreatingChat} />
          </Flex>

          <Box p={3} borderRadius="md">
            <Grid
              templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} // Adjusts the number of columns based on screen size
              gap={4}
            >
              {chats?.map((chat) => (
                <ChatListCard key={chat.chatId} chatName={chat.name} chatId={chat.chatId} />
              ))}
            </Grid>
          </Box>
        </Box>
      </Flex>
<CreateBotModel isOpen={isOpen} onClose={onClose}/>
      {/* Modal for entering chat name */}
      {/* <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="chat-name">
              <FormLabel>Chat Name</FormLabel>
              <Input
                placeholder="Enter chat name"
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleNewChat}
              isLoading={isCreatingChat}
              disabled={!chatName}
            >
              Create Chat
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </Box>
  );
};

export default AiLab;
