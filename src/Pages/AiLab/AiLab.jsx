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
import { primaryColorOrange } from "../../colorCodes";
import { Link, useNavigate } from "react-router-dom";
import Description from "../../Components/Dashboard/Description";
import { BASE_URL } from "../../Constants";

const AiLab = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreatingChat, setIsCreatingChat] = useState(false); // For managing chat creation state
  const [chatName, setChatName] = useState(""); // For storing chat name
  const { isOpen, onOpen, onClose } = useDisclosure(); // For controlling the modal
const navigate= useNavigate()
  // Fetch chats from the API on component mount
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
        } else if(response.status===403 || response.status==='403') {
          navigate('/auth')
         }
      } catch (error) {
        console.error("Error fetching chats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  // Function to create a new chat
  const handleNewChat = async () => {
    setIsCreatingChat(true);
    try {
      const token = localStorage.getItem("authToken");
      const apiKey = localStorage.getItem('apiKey');
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
        body: JSON.stringify({ name: chatName }), // Pass the chat name from the input
      });

      const data = await response.json();
      if (response.ok) {
        // Update the chat list with the new chat
        setChats([...chats, { chatId: data.chatId, name: data.name }]);
        onClose(); // Close the modal after successful chat creation
      }else if(response.status===403 || response.status==='403') {
        navigate('/auth')
       }
    } catch (error) {
      console.error("Error creating chat:", error);
    } finally {
      setIsCreatingChat(false); // End the chat creation state
    }
  };

  if (loading) {
    return (
      <Box p={4} w="100%" maxW="100%" mx="auto">
        <Text>Loading...</Text>
      </Box>
    );
  }

  return (
    <Box p={4} w="100%" maxW="100%" mx="auto">
      <Header title={"Lab"} />
      <Box mb={1}>
        <Description description="Create, manage, and test your AI tools and chatbots with ease." />
      </Box>
      <Flex mt={5} direction={{ base: "column", md: "row" }} gap={4}>
        <Box w={{ base: "100%", md: "30%" }}>
          <Flex ml={2} mb={2} justifyContent="flex-start">
            <NewChatButton onClick={onOpen} isLoading={isCreatingChat} />
          </Flex>

          <Box w={"900px"} p={3} borderRadius="md">
            <Grid
              templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
              gap={3}
            >
              {chats?.map((chat) => (
               
                  <ChatListCard chatName={chat.name} chatId={chat.chatId} />
               
              ))}
            </Grid>
          </Box>
        </Box>
      </Flex>
 {/* <Link to={`/app/ailab/chat/${chat.chatId}`} key={chat.chatId}> */}
      {/* Modal for entering chat name */}
      <Modal isOpen={isOpen} onClose={onClose}>
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
              disabled={!chatName} // Disable if chat name is empty
            >
              Create Chat
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AiLab;
