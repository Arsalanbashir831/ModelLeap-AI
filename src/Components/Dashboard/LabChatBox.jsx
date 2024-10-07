import React, { useState } from "react";
import {
  Box,
  Flex,
  Input,
  Button,
  Text,
  IconButton,
  VStack,
  HStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FiSend } from "react-icons/fi";
import { AiOutlineCode } from "react-icons/ai";
import { BsClock, BsClipboard, BsDatabase } from "react-icons/bs";
import { EditIcon } from "@chakra-ui/icons";
import { useTheme } from "../../Themes/ThemeContext";

const LabChatBox = () => {
  const [messages, setMessages] = useState([]);
  const { theme } = useTheme();
  const [inputValue, setInputValue] = useState("");
  const [context, setContext] = useState("Context");

  const buttonSize = useBreakpointValue({ base: "md", md: "md" });

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { from: "You", text: inputValue, time: "9" }]);
      setInputValue("");
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { from: "AI", text: "Yes, I'm here. How can I assist you today?", time: "21" },
        ]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); 
      handleSendMessage(); 
    }
  };

  return (
    <Box
      w="100%"
      maxW="1000px"
      mx="auto"
      p={4}
      borderRadius="lg"
    >
      <VStack
        spacing={4}
        align="stretch"
        h="400px"
        overflowY="auto"
        p={4}
        bg="rgba(255, 255, 255, 0.04)"
        backdropFilter={"saturate(200%) blur(20px)"}
        borderRadius="md"
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#8e44ad',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#3498db',
          },
        }}
      >
        {messages.length === 0 ? (
          <Flex
            bg="linear-gradient(90deg, #3c4666, #34405b)"
            borderRadius="md"
            p={4}
            align="center"
            justify="space-between"
            boxShadow="md"
          >
            <Box>
              <Text fontSize="lg" fontWeight="bold" color="white">
                {context}:
              </Text>
              <Text fontSize="sm" color="whiteAlpha.800">
                Tell the AI how to behave and provide it with knowledge to answer your prompt.
              </Text>
            </Box>
            <HStack spacing={2}>
              <BsDatabase color="white" />
              <EditIcon color="white" />
            </HStack>
          </Flex>
        ) : (
          <>
            {messages.map((message, index) => (
              <Flex
                key={index}
                direction={message.from === "You" ? "row-reverse" : "row"}
                align="flex-start"
                justify={message.from === "You" ? "flex-end" : "flex-start"}
                my={2}
              >
                <Box
                  bg={message.from === "You" ? "#2d3e50" : "#1c2833"}
                  borderRadius="lg"
                  p={3}
                  boxShadow="lg"
                  maxW="75%"
                  position="relative"
                >
                  <Text color="white" fontWeight="bold">
                    {message.from === "You" ? "You" : "AI"}: {message.text}
                  </Text>
                  <Flex mt={2} align="center" justify="flex-end" color="gray.400">
                    <BsClock />
                    <Text ml={1} fontSize="xs">
                      {message.time}
                    </Text>
                    <IconButton
                      ml={2}
                      icon={<BsClipboard />}
                      size="xs"
                      bg="transparent"
                      color="gray.400"
                      _hover={{ color: "white", bg: "transparent" }}
                      aria-label="Copy to clipboard"
                    />
                  </Flex>
                  <Box
                    position="absolute"
                    bottom="-6px"
                    right={message.from === "You" ? "-6px" : undefined}
                    left={message.from !== "You" ? "-6px" : undefined}
                    w="12px"
                    h="12px"
                    bg={message.from === "You" ? "#2d3e50" : "#1c2833"}
                    borderRadius="50%"
                    boxShadow="lg"
                    transform={message.from === "You" ? "rotate(45deg)" : "rotate(-45deg)"}
                  />
                </Box>
              </Flex>
            ))}
          </>
        )}
      </VStack>

      <Flex mt={4} align="center">
        <Input
          placeholder="Enter to send, Shift+Enter for newline"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress} 
          size={buttonSize}
          bg="rgba(255, 255, 255, 0.1)"
          color={theme.textColor}
          border="none"
          borderRadius="full"
          _placeholder={{ color: "gray.500" }}
          _focus={{ bg: "rgba(255, 255, 255, 0.15)" }}
        />
        <Button
          ml={2}
          size={buttonSize}
          onClick={handleSendMessage}
          bg="linear-gradient(90deg, #8e44ad, #ff914d)"
          color="white"
          borderRadius="full"
          _hover={{ bg: "#8e44ad" }}
          _active={{ bg: "#8e44ad" }}
        >
          <FiSend />
        </Button>
        {/* <IconButton
          ml={2}
          size={buttonSize}
          icon={<AiOutlineCode />}
          bg="linear-gradient(90deg, #8e44ad, #ff914d)"
          color="white"
          borderRadius="full"
          _hover={{ bg: "#8e44ad" }}
          _active={{ bg: "#8e44ad" }}
          aria-label="Code Button"
        /> */}
      </Flex>
    </Box>
  );
};

export default LabChatBox;
