import React, { useEffect, useState } from "react";
import { Box, Text, VStack, Divider, Button, useBreakpointValue } from "@chakra-ui/react";
import { useTheme } from "../../Themes/ThemeContext";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Constants";

const HistoryBox = ({chatId}) => {
  const { theme } = useTheme();
  const [historyData, setHistoryData] = useState({
    today: [],
    yesterday: [],
    past7Days: [],
    past30Days: [],
    older: [],
  });
  const navigate = useNavigate();
  const displayHistory = useBreakpointValue({ base: "none", md: "block" });

  const handleCreateNewChat = () => {
    console.log("New Chat Created");
  };

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
     
        // Set the grouped chats data into state, ensuring all fields are available
        setHistoryData({
          today: data.chats.today || [],
          yesterday: data.chats.yesterday || [],
          past7Days: data.chats.past7Days || [],
          past30Days: data.chats.past30Days || [],
          older: data.chats.older || [],
        });
      } else if (response.status === 403 || response.status === "403") {
        navigate("/auth");
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);
console.log(historyData);
  const renderChatItems = (chats) => {
    return chats.map((chat, idx) => (
      <Text
      onClick={()=>{navigate(`/app/ailab/chat/${chat.chatId}`)}}
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
        bg={'transparent'}
        paddingX="3"
        paddingY="2"
        borderRadius="md"
        w="full"
        background= { chatId===chat.chatId? theme.historySelectedButton:'transparent'}
        color={ chatId===chat.chatId? theme.historySelectedTextColor:theme.textColor}
      
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
        onClick={handleCreateNewChat}
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
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'gray.600',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'gray.500',
          },
        }}
      >
        {/* Render Chat Sections */}
        {historyData.today && historyData.today.length > 0 && (
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

        {historyData.yesterday && historyData.yesterday.length > 0 && (
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

        {historyData.past7Days && historyData.past7Days.length > 0 && (
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

        {historyData.past30Days && historyData.past30Days.length > 0 && (
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

        {historyData.older && historyData.older.length > 0 && (
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
    </Box>
  );
};

export default HistoryBox;
