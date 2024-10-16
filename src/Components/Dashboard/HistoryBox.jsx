import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  VStack,
  Divider,
  Button,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  useBreakpointValue,
  useDisclosure,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons"; // Import HamburgerIcon for the button
import { useTheme } from "../../Themes/ThemeContext";
import { useNavigate, useParams } from "react-router-dom";
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
  const displayHistory = useBreakpointValue({ base: "none", md: "block" }); // Sidebar for larger screens
  const { isOpen, onOpen, onClose } = useDisclosure(); // Drawer for mobile screens
  const { isOpen: isModalOpen, onOpen: openModal, onClose: closeModal } = useDisclosure(); // Modal hooks
  const [newChatName, setNewChatName] = useState(""); // New chat name
  const [loading, setLoading] = useState(false); // Loading state
  const toast = useToast();
  const { chatId: activeChatId } = useParams();

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

      if (response.status === 403 || response.status === "403") {
        navigate("/auth");
      }
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
          const allChats = [
            ...data.chats.today,
            ...data.chats.yesterday,
            ...data.chats.past7Days,
            ...data.chats.past30Days,
            ...data.chats.older,
          ];
          const activeChat = allChats.find((chat) => chat.chatId === activeChatId);

          if (activeChat) {
            setChatName(activeChat.name);
          }
        }
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
        fetchChats();
        closeModal();
        setNewChatName("");
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
          onClose(); // Close drawer on chat selection in mobile view
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
    <>
      {/* Hamburger button for mobile screens */}
      <IconButton
        icon={<HamburgerIcon />}
        onClick={onOpen}
        display={{ base: "block", md: "none" }} // Only show on mobile
        aria-label="Open Chat History"
        mb={4}
      />

      {/* Drawer for mobile view */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Chat History</DrawerHeader>
          <DrawerBody>
            {/* Scrollable Chat History */}
            {renderChatItems([...historyData.today, ...historyData.yesterday, ...historyData.past7Days, ...historyData.past30Days, ...historyData.older])}
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Chat history for desktop view */}
      <Box
        w={{ base: "100%", md: "25%" }}
        p={3}
        bg={theme.background}
        color="white"
        borderRadius="lg"
        boxShadow="2xl"
        display={displayHistory}
        maxH="600px"
        _hover={{ boxShadow: "dark-lg" }}
        transition="all 0.3s ease"
      >
        <Button
          onClick={openModal}
          w="full"
          mb={4}
          color={theme.historySelectedTextColor}
          bg={theme.historySelectedButton}
          _hover={{ bg: theme.historySelectedButtonHover }}
          borderRadius="md"
          py={2}
        >
          + Create New Chat
        </Button>

        <Box
          overflowY="auto"
          maxH="500px"
          css={{
            "&::-webkit-scrollbar": { width: "6px" },
            "&::-webkit-scrollbar-thumb": { background: "gray.600", borderRadius: "10px" },
            "&::-webkit-scrollbar-thumb:hover": { background: "gray.500" },
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

          {/* Render other sections like yesterday, past7Days, etc... */}
        </Box>

        {/* Modal for new chat creation */}
        <Modal isOpen={isModalOpen} onClose={closeModal}>
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
              <Button variant="ghost" onClick={closeModal}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={handleCreateNewChat} isLoading={loading}>
                Create
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default HistoryBox;
