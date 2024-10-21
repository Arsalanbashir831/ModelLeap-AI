import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  List,
  ListItem,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { useLocation, useParams } from "react-router-dom";
import { BASE_URL } from "../../Constants";
import CreateChatModel from "../../Components/Dashboard/CreateChatModel";
import { FaShare } from "react-icons/fa";
import ShareModal from "../../Components/Dashboard/ShareModal";

// Function to format Firebase timestamp
const formatTimestamp = (timestamp) => {
  console.log('timestamp',timestamp);
  
  if (timestamp?._seconds) {
    const date = new Date(
      timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000
    );
    return date.toLocaleString(); // Format as a readable date and time string
  }
  return "Invalid Timestamp";
};

const ChatbotHistory = () => {
  const { botId } = useParams();
  const location = useLocation();
  const { apiKey , modelName} = location.state;

  const [chats, setChats] = useState([]); // Store chats fetched from API
  const [selectedChat, setSelectedChat] = useState(null); // Active selected chat
  const [chatHistory, setChatHistory] = useState([]); // Chat history for the selected chat

  const { isOpen, onOpen, onClose } = useDisclosure(); // For managing the modal state for creating a new chat
  const {
    isOpen: isShareOpen,
    onOpen: onShareOpen,
    onClose: onShareClose,
  } = useDisclosure(); // For managing the modal state for sharing
  const [selectedChatForShare, setSelectedChatForShare] = useState(null); // Store selected chat for sharing

  // Fetch chats from the API
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/bot/${botId}/chats`, {
          headers: {
            "x-api-key": apiKey,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setChats(data?.chats); // Update chats with data from API
        } else {
          console.error("Failed to fetch chats");
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };
    fetchChats();
  }, [botId, apiKey]);

  // Fetch chat history from the API
  const fetchChatHistory = async (chatId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${BASE_URL}/api/bot/${botId}/chat/${chatId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": apiKey,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const processedMessages = await Promise.all(
          data.messages.map(async (message) => {
            const from = message.role === "user" ? "You" : "AI";
            const time = formatTimestamp(message.timestamp); // Format timestamp

            // Check if content is an image ID (integer)
            if (Number.isInteger(message.content)) {
              const imageId = message.content;
              try {
                const imageResponse = await fetch(`${BASE_URL}/api/bot/get_images`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "x-api-key": apiKey,
                  },
                  body: JSON.stringify({
                    request_id: imageId.toString(),
                  }),
                });

                if (imageResponse.ok) {
                  const imageData = await imageResponse.json();
                  if (imageData.status === "success") {
                    const imageUrl = imageData.output[0];
                    return {
                      id: message.id,
                      from,
                      content: imageUrl,
                      time,
                      type: "image", // Set type as image
                    };
                  }
                }
                return {
                  id: message.id,
                  from,
                  content: "Image generation failed.",
                  time,
                  type: "text",
                };
              } catch (imageError) {
                console.error("Error fetching image:", imageError);
                return {
                  id: message.id,
                  from,
                  content: "Failed to fetch image.",
                  time,
                  type: "text",
                };
              }
            } else {
              return {
                id: message.id,
                from,
                content: message.content,
                time,
                type: "text",
              };
            }
          })
        );

        setChatHistory(processedMessages); // Update chat history with processed messages
      } else {
        console.error("Failed to fetch chat history:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  // Handle chat selection and fetch history
  const handleChatSelection = (chat) => {
    setSelectedChat(chat); // Set the selected chat
    fetchChatHistory(chat.chatId); // Fetch chat history for the selected chat
  };

  // Handle adding a new chat
  const handleNewChat = async (newChatTitle) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(`${BASE_URL}/api/bot/${botId}/chat/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "x-api-key": apiKey,
        },
        body: JSON.stringify({ name: newChatTitle }),
      });

      if (response.ok) {
        const data = await response.json();
        setChats((prevChats) => [...prevChats, ...data?.chats]);
      } else {
        console.error("Failed to create chat:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error creating new chat:", error);
    }
  };

  // Handle sharing chat
  const handleShare = (chat) => {
    setSelectedChatForShare(chat);
    onShareOpen();
  };

  // Render chat history table
  const renderChatHistoryTable = () => {
    if (!selectedChat || chatHistory.length === 0) {
      return <Box>No chat history available for this selection</Box>;
    }

    return (
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Message</Th>
            <Th>Sender</Th>
            <Th>Timestamp</Th>
          </Tr>
        </Thead>
        <Tbody>
        {console.log(chatHistory)}
          {chatHistory.map((message, index) => (
            <Tr key={message.id || index}>
              <Td>
                {typeof message.content === "string" && message.content.startsWith("https://") ? (
                  <Image src={message.content} alt="Generated Image" maxWidth="200px" />
                ) : (
                  message.content
                )}
              </Td>
              <Td>{message.from === "You" ? "User" : "AI"}</Td>
              <Td>{message.time}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  };

  // Render chat list in the sidebar
  const renderChatList = () => {
    return (
      <List spacing={3}>
        {chats.map((chat) => (
          <ListItem key={chat.chatId}>
            <Flex alignItems={"center"} px={5} rounded={"md"}>
              <Button
                width="100%"
                variant={selectedChat?.chatId === chat.chatId ? "solid" : "outline"}
                colorScheme="blue"
                onClick={() => handleChatSelection(chat)} // Set active chat on click
              >
                {chat.name}
              </Button>
              <FaShare
                onClick={() => handleShare(chat)} // Trigger sharing on click
                cursor={"pointer"}
                style={{ marginLeft: "10px" }}
              />
            </Flex>
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <Flex>
      {/* Sidebar for list of chats */}
      <Box width="300px" p={4} bg="gray.100" height="100vh" overflowY="auto">
        <Button onClick={onOpen} colorScheme="blue" mb={4}>
          Add New Chat
        </Button>

        <Heading size="md" mb={4}>
          Chats
        </Heading>

        {renderChatList()}
      </Box>

      {/* Main content area for chat history */}
      <Box flex="1" p={4}>
        <Heading size="md" mb={4}>
          Chat History {selectedChat ? `for ${selectedChat.name}` : ""}
        </Heading>
        {renderChatHistoryTable()}
      </Box>

      {/* Create Chat Modal */}
      <CreateChatModel isOpen={isOpen} onClose={onClose} onSave={handleNewChat} />

      {/* Share Chat Modal */}
      {selectedChatForShare && (
        <ShareModal
          isOpen={isShareOpen}
          onClose={onShareClose}
          modelName={modelName}
          botData={{ botId, apiKey, chatId: selectedChatForShare.chatId }} // Pass bot ID, API key, and chatId to ShareModal
        />
      )}
    </Flex>
  );
};

export default ChatbotHistory;
