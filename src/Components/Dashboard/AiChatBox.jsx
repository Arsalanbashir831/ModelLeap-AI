import React, { useState, useEffect } from "react"; 
import {
  Box,
  Text,
  VStack,
  HStack,
  Avatar,
  Input,
  IconButton,
  InputGroup,
  InputRightElement,
  Flex,
} from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";
import { primaryColorOrange, primaryColorPurple } from "../../colorCodes";
import { useTheme } from "../../Themes/ThemeContext.jsx";

const AiChatBox = ({ aiLogo , type}) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { theme } = useTheme();

  const initialMessages = [
    { type: "ai", text: "Welcome to the AI Chat! How can I help you today? Feel free to ask me anything!" },
  ];

  // Set initial message on component mount
  useEffect(() => {
    setMessages(initialMessages);
  }, []);

  const handleSend = () => {
    if (input.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "user", text: input },
      ]);

      setInput("");
      // Simulate AI response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "ai", text: "Hello! How can I assist you today?" },
        ]);
      }, 1000);
    }
  };

  const renderMessage = (message, index) => (
    <HStack key={index} alignSelf={message.type === "user" ? "flex-end" : "flex-start"}>
      <Avatar
        name={message.type === "user" ? "You" : "AI"}
        bg={message.type === "user" ? "yellow.400" : "black"}
        size="sm"
      />
      <Box bg={theme.AiChatbg} color={theme.textColor} p="2" borderRadius="md">
        <Text>{message.text}</Text>
      </Box>
    </HStack>
  );

  return (
    <Flex direction="column" h={["300px", "400px"]} w="100%">
      <VStack spacing="1" align="start" w="full" h="full">
        <Text fontSize={["lg", "xl"]} fontWeight="bold" color={theme.AiChatBoxHeading}>
          Try It Out
        </Text>
        <Text fontSize={["sm", "md"]} color={theme.textColor}>
          Use the toolbar on the right to apply various settings and manage the results.
        </Text>

        <Box flex="1" w="full" overflowY="auto">
          <VStack
            spacing="4"
            w="full"
            align="stretch"
            overflowY="auto"
            p="4"
            // bg={theme.AiChatbg}
            borderRadius="md"
            flex="1"
          >
            {messages.map(renderMessage)}
          </VStack>
        </Box>

        <InputGroup size="lg">
          <Input
            placeholder="Type your prompt here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            borderRadius="lg"
            color={theme.textColor}
            bg="transparent"
            border="0.5px solid"
            borderColor={primaryColorOrange}
            _focus={{ borderColor: primaryColorOrange }}
            _hover={{ borderColor: primaryColorOrange }}
            fontSize={["sm", "md"]}
          />
          <InputRightElement>
            <IconButton
              aria-label="Send"
              icon={<FaPaperPlane />}
              onClick={handleSend}
              bg={primaryColorOrange}
              color="white"
              _hover={{ bg: primaryColorPurple }}
            />
          </InputRightElement>
        </InputGroup>
      </VStack>
    </Flex>
  );
};

export default AiChatBox;
