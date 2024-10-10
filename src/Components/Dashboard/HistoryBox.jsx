import React from "react";
import { Box, Text, VStack, Divider, useBreakpointValue } from "@chakra-ui/react";

const HistoryBox = () => {
  const historyData = [
    {
      title: "Today",
      items: ["Styled Responsive Description"],
    },
    {
      title: "Yesterday",
      items: [
        "Resume Analysis and Job Search",
        "Azure Hands-On Practice Guide",
        "MERN Stack AI Backend Structure",
        "Presentation Image Creation Help",
        "Active Button Gradient Styling",
      ],
    },
    {
      title: "Previous 7 Days",
      items: [
        "BNU Offer Letter Draft",
        "MERN Stack AI Backend Structure",
        "Presentation Image Creation Help",
        "Active Button Gradient Styling",
      ],
    },
    {
      title: "Previous 30 Days",
      items: ["Repository Branch Structure Guide"],
    },
  ];

  const displayHistory = useBreakpointValue({ base: "none", md: "block" });

  return (
    <Box
      w={{ base: "100%", md: "25%" }} // Full width on smaller screens, 25% on larger screens
      p={3}
      bg="gray.700"
      color="white"
      borderRadius="md"
      boxShadow="lg"
      display={displayHistory} // Hide on smaller screens
      maxH="600px" // Fixed height
      overflowY="auto" // Enable scrolling when content exceeds height
      _hover={{ boxShadow: "xl" }}
      transition="all 0.3s ease"
      css={{
        '&::-webkit-scrollbar': {
          width: '2px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'gray.500',
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: 'gray.400',
        },
      }} // Custom scroll bar
    >
      {historyData.map((section, index) => (
        <VStack key={index} align="start" spacing={2} mb={4}>
          <Text fontSize="md" fontWeight="semibold" color="orange.200">
            {section.title}
          </Text>
          <Divider borderColor="gray.600" />
          {section.items.map((item, idx) => (
            <Text
              key={idx}
              fontSize="sm" // Reduced font size
              _hover={{
                cursor: "pointer",
                textDecoration: "underline",
                color: "orange.300",
              }}
              transition="all 0.2s"
              isTruncated
              noOfLines={1}
            >
              {item}
            </Text>
          ))}
        </VStack>
      ))}
    </Box>
  );
};

export default HistoryBox;
