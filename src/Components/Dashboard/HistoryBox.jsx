import React, { useEffect, useState } from "react";
import { Box, Text, VStack, Divider, Button, useBreakpointValue } from "@chakra-ui/react";
import { useTheme } from "../../Themes/ThemeContext";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Constants";

const HistoryBox = () => {
  const { theme } = useTheme();
  const [historyData , setHistoryData]= useState([]) 
  
  const navigate = useNavigate()
  // const historyData = [
  //   {
  //     title: "Today",
  //     items: ["Styled Responsive Description"],
  //   },
  //   {
  //     title: "Yesterday",
  //     items: [
  //       "Resume Analysis and Job Search",
  //       "Azure Hands-On Practice Guide",
  //       "MERN Stack AI Backend Structure",
  //       "Presentation Image Creation Help",
  //       "Active Button Gradient Styling",
  //     ],
  //   },
  //   {
  //     title: "Previous 7 Days",
  //     items: [
  //       "BNU Offer Letter Draft",
  //       "MERN Stack AI Backend Structure",
  //       "Presentation Image Creation Help",
  //       "Active Button Gradient Styling",
  //     ],
  //   },
  //   {
  //     title: "Previous 30 Days",
  //     items: ["Repository Branch Structure Guide"],
  //   },
  // ];

  const displayHistory = useBreakpointValue({ base: "none", md: "block" });

  const handleCreateNewChat = () => {
    // Logic for creating a new chat goes here
    console.log("New Chat Created");
  };

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
        setHistoryData(data.chats); // Assuming the response contains an array of chats
      } else if(response.status===403 || response.status==='403') {
        navigate('/auth')
       }
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  useEffect(()=>{fetchChats()},[])

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
        {/* {historyData?.map((section, index) => (
          <VStack key={index} align="start" spacing={3} mb={5}>
            <Text fontSize="sm" fontWeight="bold" color={theme.textColor}>
              {section.title}
            </Text>
            <Divider borderColor="gray.600" />
            <VStack align="start" spacing={2}>
              {section?.items.map((item, idx) => (
                <Text
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
                  color={theme.textColor}
                >
                  {item}
                </Text>
              ))}
            </VStack>
          </VStack>
        ))} */}
      </Box>
    </Box>
  );
};

export default HistoryBox;
