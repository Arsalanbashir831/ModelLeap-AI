import React, { useEffect, useState } from "react";
import { Box, Text, VStack, Divider, Button, useBreakpointValue, useDisclosure, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useToast } from "@chakra-ui/react";
import { useTheme } from "../../Themes/ThemeContext";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams
import { BASE_URL } from "../../Constants";
import { useRecoilState } from "recoil";
import chatNameState from "../../atoms/ChatNameState";

const HistoryBox = ({ chatId }) => {
  const { theme } = useTheme();
  const [historyData, setHistoryData] = useState({
    today: [],
    yesterday: [],
    past7Days: [],
    past30Days: [],
    older: [],
  });
  const [chatName, setChatName] = useRecoilState(chatNameState);
  const navigate = useNavigate();
  const displayHistory = useBreakpointValue({ base: "none", md: "block" });
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal hooks
  const [newChatName, setNewChatName] = useState(""); // New chat name
  const [loading, setLoading] = useState(false); // Loading state
  const toast = useToast(); // Chakra toast
  const { chatId: activeChatId } = useParams(); // Use useParams to get chatId from URL

  // Fetch chats from the backend
  const fetchChats = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("Authorization token is missing.");
        return;
      }

      const response = await fetch(`${BASE_URL}/api/chats-grouped`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setHistoryData({
          today: data.chats.today || [],
          yesterday: data.chats.yesterday || [],
          past7Days: data.chats.past7Days || [],
          past30Days: data.chats.past30Days || [],
          older: data.chats.older || [],
        });

        // Find the chat name corresponding to the active chatId
        if (activeChatId) {
          const allChats = [...data.chats.today, ...data.chats.yesterday, ...data.chats.past7Days, ...data.chats.past30Days, ...data.chats.older];
          const activeChat = allChats.find(chat => chat.chatId === activeChatId);

          if (activeChat) {
            setChatName(activeChat.name); // Update chat name in Recoil state
          }
        }
      } else if (response.status === 403 || response.status === "403") {
        navigate("/auth");
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [activeChatId]);

  const handleCreateNewChat = async () => {
    if (!newChatName) {
      toast({
        title: "Chat name is required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const apiKey = localStorage.getItem("apiKey");
      const response = await fetch(`${BASE_URL}/api/chat/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "x-api-key": apiKey,
        },
        body: JSON.stringify({
          name: newChatName,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setChatName(data.name);
        navigate(`/app/ailab/chat/${data.chatId}`);
        toast({
          title: "Chat Created",
          description: `Chat "${newChatName}" has been created successfully!`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        fetchChats(); // Refresh chat list
        onClose(); // Close modal
        setNewChatName(""); // Reset chat name input
      } else {
        throw new Error("Failed to create chat.");
      }
    } catch (error) {
      toast({
        title: "Error creating chat",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const renderChatItems = (chats) => {
    return chats.map((chat, idx) => (
      <Text
        onClick={() => {
          setChatName(chat.name);
          navigate(`/app/ailab/chat/${chat.chatId}`);
        }}
        key={idx}
        fontSize="sm"
        _hover={{
          cursor: "pointer",
          textDecoration: "none",
          bg: theme.historySelectedButton,
          color: theme.historySelectedTextColor,
          paddingX: "4",
          paddingY: "2",
          borderRadius: "md",
        }}
        transition="all 0.2s"
        isTruncated
        noOfLines={1}
        bg={"transparent"}
        paddingX="3"
        paddingY="2"
        borderRadius="md"
        w="full"
        background={chatId === chat.chatId ? theme.historySelectedButton : "transparent"}
        color={chatId === chat.chatId ? theme.historySelectedTextColor : theme.textColor}
      >
        {chat.name}
      </Text>
    ));
  };

  return (
    <Box
      w={{ base: "100%", md: "25%" }} // Full width on smaller screens, 25% on larger screens
      p={3}
      bg={theme.background}
      color="white"
      borderRadius="lg"
      boxShadow="2xl"
      display={displayHistory} // Hide on smaller screens
      maxH="600px" // Fixed height
      _hover={{ boxShadow: "dark-lg" }}
      transition="all 0.3s ease"
    >
      {/* Create New Chat Button - Remains fixed at the top */}
      <Button
        onClick={onOpen} // Open modal
        w="full"
        mb={4}
        color={theme.historySelectedTextColor}
        bg={theme.historySelectedButton}
        _hover={{
          bg: theme.historySelectedButtonHover,
        }}
        borderRadius="md"
        py={2}
      >
        + Create New Chat
      </Button>

      {/* Scrollable History List */}
      <Box
        overflowY="auto"
        maxH="500px" // Restrict height to make list scrollable
        css={{
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "gray.600",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "gray.500",
          },
        }}
      >
        {historyData.today.length > 0 && (
          <VStack align="start" spacing={3} mb={5}>
            <Text fontSize="sm" fontWeight="bold" color={theme.textColor}>
              Today
            </Text>
            <Divider borderColor="gray.600" />
            <VStack align="start" spacing={2}>
              {renderChatItems(historyData.today)}
            </VStack>
          </VStack>
        )}

        {historyData.yesterday.length > 0 && (
          <VStack align="start" spacing={3} mb={5}>
            <Text fontSize="sm" fontWeight="bold" color={theme.textColor}>
              Yesterday
            </Text>
            <Divider borderColor="gray.600" />
            <VStack align="start" spacing={2}>
              {renderChatItems(historyData.yesterday)}
            </VStack>
          </VStack>
        )}

        {historyData.past7Days.length > 0 && (
          <VStack align="start" spacing={3} mb={5}>
            <Text fontSize="sm" fontWeight="bold" color={theme.textColor}>
              Past 7 Days
            </Text>
            <Divider borderColor="gray.600" />
            <VStack align="start" spacing={2}>
              {renderChatItems(historyData.past7Days)}
            </VStack>
          </VStack>
        )}

        {historyData.past30Days.length > 0 && (
          <VStack align="start" spacing={3} mb={5}>
            <Text fontSize="sm" fontWeight="bold" color={theme.textColor}>
              Past 30 Days
            </Text>
            <Divider borderColor="gray.600" />
            <VStack align="start" spacing={2}>
              {renderChatItems(historyData.past30Days)}
            </VStack>
          </VStack>
        )}

        {historyData.older.length > 0 && (
          <VStack align="start" spacing={3} mb={5}>
            <Text fontSize="sm" fontWeight="bold" color={theme.textColor}>
              Older
            </Text>
            <Divider borderColor="gray.600" />
            <VStack align="start" spacing={2}>
              {renderChatItems(historyData.older)}
            </VStack>
          </VStack>
        )}
      </Box>

      {/* Modal for entering new chat name */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Enter chat name"
              value={newChatName}
              onChange={(e) => setNewChatName(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleCreateNewChat}
              isLoading={loading}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default HistoryBox;
