import React, { useState } from "react";
import { Box, Flex, Heading, Table, Tbody, Td, Th, Thead, Tr, List, ListItem, Button } from "@chakra-ui/react";

const ChatbotHistory = () => {
  const [chats] = useState([
    { id: 1, name: "Chat 1" },
    { id: 2, name: "Chat 2" },
    { id: 3, name: "Chat 3" },
  ]); // Dummy list of chats

  const [selectedChat, setSelectedChat] = useState(null); // Active selected chat
  const [chatHistory, setChatHistory] = useState([]); // Chat history for the selected chat

  // Dummy chat history data
  const chatHistoryDummyData = {
    1: [
      { content: "Hi, how can I help you?", sender: "ai", timestamp: "2024-10-15T10:30:00Z" },
      { content: "What's the weather today?", sender: "user", timestamp: "2024-10-15T10:31:00Z" },
      { content: "The weather is sunny today.", sender: "ai", timestamp: "2024-10-15T10:32:00Z" }
    ],
    2: [
      { content: "Hello, what is your name?", sender: "user", timestamp: "2024-10-16T09:15:00Z" },
      { content: "I am a chatbot.", sender: "ai", timestamp: "2024-10-16T09:16:00Z" }
    ],
    3: [
      { content: "Can you recommend a good book?", sender: "user", timestamp: "2024-10-17T11:45:00Z" },
      { content: "I recommend 'To Kill a Mockingbird'.", sender: "ai", timestamp: "2024-10-17T11:46:00Z" }
    ],
  };

  // Handle chat selection
  const handleChatSelection = (chat) => {
    setSelectedChat(chat); // Set the selected chat
    setChatHistory(chatHistoryDummyData[chat.id]); // Set the chat history for the selected chat from dummy data
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
          {chatHistory.map((message, index) => (
            <Tr key={index}>
              <Td>{message.content}</Td>
              <Td>{message.sender === "user" ? "User" : "AI"}</Td>
              <Td>{new Date(message.timestamp).toLocaleString()}</Td>
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
          <ListItem key={chat.id}>
            <Button
              width="100%"
              variant={selectedChat?.id === chat.id ? "solid" : "outline"}
              colorScheme="blue"
              onClick={() => handleChatSelection(chat)} // Set active chat on click
            >
              {chat.name}
            </Button>
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <Flex>
      {/* Sidebar for list of chats */}
      <Box width="300px" p={4} bg="gray.100" height="100vh" overflowY="auto">
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
    </Flex>
  );
};

export default ChatbotHistory;
