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
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
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
  const {
    isOpen: isDrawerOpen,
    onOpen: openDrawer,
    onClose: closeDrawer,
  } = useDisclosure();

  const [selectedChatForShare, setSelectedChatForShare] = useState(null);
  const { theme, isDarkMode } = useTheme();
  const { chats, loading } = useFetchChats(botId, apiKey);
  const navigate = useNavigate();

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
      if (response.status === 404) {
        setChatHistory([]);
        return;
      }
      if (response.ok) {
        const data = await response.json();
        const processedMessages = await Promise.all(
          data.messages.map(async (message) => {
            const from = message.role === "user" ? "You" : "AI";
            const time = formatTimestamp(message.timestamp);
            if (message.generation === "dalle") {
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
              const imageUrl = await generateImage(
                imageId,
                apiKey,
                selectedChat.chatId
              );
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
        setChatHistory(processedMessages);
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
    closeDrawer(); // Close drawer on chat selection for mobile
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
        window.location.reload();
      }
    } catch (error) {
      console.error("Error creating new chat:", error);
    }
  };

  const handleShare = (chat) => {
    setSelectedChatForShare(chat);
    onShareOpen();
  };

  return (
    <Box bg={theme.background} minH="100vh">
      <Header title="Chat History" isTitle isGoBack />

      <Flex
        bg={theme.background}
        color={theme.textColor}
        px={5}
        alignItems="start"
      >
        {/* Hamburger Menu for Mobile */}
        <IconButton
          aria-label="Open chat list"
          icon={<HamburgerIcon />}
          display={{ base: "inline-flex", md: "none" }}
          onClick={openDrawer}
          mb={4}
          bg={primaryColorOrange}
        />

        {/* Sidebar for chat list (visible only on desktop) */}
        <Box
          display={{ base: "none", md: "block" }}
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
            width="100%"
          >
            Create Chat
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
        <Box flex="1" p={4}  color={theme.textColor}>
          <Heading size="md" mb={4} color={theme.AiChatBoxHeading}>
            Chat History {selectedChat ? `for ${selectedChat.name}` : ""}
          </Heading>

          {historyLoading ? (
            <Flex justifyContent="center" height="100vh" alignItems="center">
              <Spinner size="xl" />
            </Flex>
          ) : (
            <VStack>
              <HistoryTable selectedChat={selectedChat} chatHistory={chatHistory} />
            </VStack>
          )}
        </Box>
      </Flex>

      {/* Drawer for chat list on mobile */}
      <Drawer  isOpen={isDrawerOpen} placement="left" onClose={closeDrawer}>
        <DrawerOverlay />
        <DrawerContent bg={theme.background}>
          <DrawerCloseButton color={theme.textColor} />
          <DrawerHeader>
          <br></br>
            <Button
              onClick={onOpen}
              colorScheme={isDarkMode ? "orange" : "blue"}
              mb={4}
              bg={theme.historySelectedButton}
              color={theme.historySelectedTextColor}
              width="100%"
            >
              Add New Chat
            </Button>
          </DrawerHeader>

          <DrawerBody>
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Create Chat Modal */}
      <CreateChatModel isOpen={isOpen} onClose={onClose} onSave={handleNewChat} />

      {/* Share Chat Modal */}
      {selectedChatForShare && (
        <ShareModal
          isOpen={isShareOpen}
          onClose={onShareClose}
          modelName={modelName}
          botData={{
            botId,
            apiKey,
            chatId: selectedChatForShare.chatId,
            status: selectedChatForShare.status,
          }}
        />
      )}
    </Box>
  );
};

export default ChatbotHistory;
