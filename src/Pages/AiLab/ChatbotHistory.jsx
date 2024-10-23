import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  List,
  Spinner,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../Constants";
import CreateChatModel from "../../Components/Dashboard/CreateChatModel";
import ShareModal from "../../Components/Dashboard/ShareModal";
import { formatTimestamp } from "../../helper/FormatTimeStamp";
import useFetchChats from "../../hooks/useFetchChats";
import { isInteger } from "../../helper/isIntegerType";
import { generateImage } from "../../helper/GenerateImage";
import { HistoryTable } from "../../Components/AiLab/HistoryTable";
import ChatListItem from "../../Components/AiLab/ChatListItem";
import { useTheme } from "../../Themes/ThemeContext";
import Header from "../../Components/Dashboard/Header";
import { primaryColorOrange } from "../../colorCodes";

const ChatbotHistory = () => {
  const { botId } = useParams();
  const location = useLocation();
  const { apiKey, modelName } = location.state;
  const [historyLoading, setHistoryLoading] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isShareOpen,
    onOpen: onShareOpen,
    onClose: onShareClose,
  } = useDisclosure();
  const [selectedChatForShare, setSelectedChatForShare] = useState(null);
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const { chats, loading } = useFetchChats(botId, apiKey);
const navigate = useNavigate()
  const fetchChatHistory = async (chatId) => {
    try {
      setHistoryLoading(true);
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${BASE_URL}/api/bot/${botId}/chat/${chatId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": apiKey,
          },
        }
      );
      if (response.status === 404 || response.status === "404") {
        setChatHistory([]);
        return;
      }
      if (response.ok) {
        const data = await response.json();
        
        
        const processedMessages = await Promise.all(
          data.messages.map(async (message) => {
            const from = message.role === "user" ? "You" : "AI";
            const time = formatTimestamp(message.timestamp);
            if (message.generation==='dalle') {
              return {
                id: message.id,
                from,
                content: message.content,
                time,
                type: "image",
              };
            }
            if (isInteger(message.content)) {
              const imageId = message.content;
              const imageUrl = await generateImage(imageId, apiKey, selectedChat.chatId);
              if (imageUrl) {
                return {
                  id: message.id,
                  from,
                  content: imageUrl,
                  time,
                  type: "image",
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
        const sortedMessages = processedMessages.sort(
          (a, b) => new Date(b.time) - new Date(a.time)
        );
        setChatHistory(sortedMessages);
      } else {
        console.error(
          "Failed to fetch chat history:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleChatSelection = (chat) => {
    setSelectedChat(chat);
    fetchChatHistory(chat.chatId);
  };

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
        window.location.reload();
      } else {
        console.error(
          "Failed to create chat:",
          response.status,
          response.statusText
        );
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

  return (
    <>
       <Button margin={5}
          bg={primaryColorOrange}
          color={"white"}
          onClick={() => navigate("/app/ailab")}
        >
          {" "}
          Back
        </Button>
   
    <Flex bg={theme.background} color={theme.textColor} height="100vh" px={5}>
    {/* Sidebar for chat list */}
   
    <Box
      width="300px"
      p={4}
      bg={theme.background}
      height="100vh"
      overflowY="auto"
      boxShadow="lg"
    >
      <Button
        onClick={onOpen}
        colorScheme={isDarkMode ? "orange" : "blue"}
        mb={4}
        bg={theme.historySelectedButton}
        color={theme.historySelectedTextColor}
      >
        Add New Chat
      </Button>

      <Heading size="md" mb={4} color={theme.textColor}>
        Chats
      </Heading>

      {loading ? (
        <Flex justifyContent="center" height="100vh" alignItems="center">
          <Spinner />
        </Flex>
      ) : (
        <List spacing={4}>
          {chats.map((chat) => (
            <ChatListItem
              key={chat.chatId}
              chat={chat}
              selectedChat={selectedChat}
              handleChatSelection={handleChatSelection}
              handleShare={handleShare}
            />
          ))}
        </List>
      )}
    </Box>

    {/* Main content area for chat history */}
    <Box flex="1" p={4} bg={theme.AiChatbg} color={theme.textColor}>
      <Heading size="md" mb={4} color={theme.AiChatBoxHeading}>
        Chat History {selectedChat ? `for ${selectedChat.name}` : ""}
      </Heading>

      {historyLoading ? (
        <Flex justifyContent="center" height="100vh" alignItems="center">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <VStack>
          <HistoryTable
            selectedChat={selectedChat}
            chatHistory={chatHistory}
          />
        </VStack>
      )}
    </Box>
       {/* Create Chat Modal */}
       <CreateChatModel
        isOpen={isOpen}
        onClose={onClose}
        onSave={handleNewChat}
      />

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
  </>
   
   
  );
};

export default ChatbotHistory;
