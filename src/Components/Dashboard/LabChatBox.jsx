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
} from "@chakra-ui/react";
import { EditIcon, SettingsIcon } from "@chakra-ui/icons";
import { BsDatabase } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import { AiOutlineCode } from "react-icons/ai";
import { primaryColorOrange, primaryColorPurple } from "../../colorCodes";

const LabChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [context, setContext] = useState("Context");

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { from: "You", text: inputValue }]);
      setContext("You");
      setInputValue("");
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { from: "AI", text: "This is the AI's response." },
        ]);
        setContext("Context");
      }, 1000);
    }
  };

  return (
    <Box
      w="100%"
      maxW={"100%"}
      mx="auto"
      p={4}
      border="2px solid"
      borderColor={primaryColorOrange}
      borderRadius="md"
      // backdropFilter={"saturate(180%) blur(20px)"}
      bg={'gray.700'}
    >
      <VStack
        spacing={4}
        align="stretch"
        h="400px"
        overflowY="auto"
        p={2}
        bg="transparent"
        borderRadius="md"
      >
        {messages.length === 0 ? (
          <Flex
            bg="transparent"
            border="2px solid"
            borderColor={primaryColorOrange}
            borderRadius="md"
            p={4}
            align="center"
            justify="space-between"
          >
            <Text fontSize="md" fontWeight="bold" color="white">
              {context}:
            </Text>
            <Text fontSize="sm" color="white">
              Tell the AI how to behave and provide it with knowledge to answer your prompt.
            </Text>
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
                align="center"
                justify={message.from === "You" ? "flex-end" : "flex-start"}
                bg={message.from === "You" ? primaryColorOrange : primaryColorPurple}
                borderRadius="md"
                p={4}
                my={1}
                w="100%"
                maxW="600px"
              >
                <Text color="white" fontWeight="bold">
                  {message.from === "You" ? "You" : "AI"}: {message.text}
                </Text>
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
          size="lg"
          bg="transparent"
          color="white"
          border="1px solid"
          borderColor={primaryColorPurple}
          _placeholder={{ color: "#B0BEC5" }}
          _focus={{ borderColor: primaryColorOrange }}
        />
        <Button
          ml={4}
          size="lg"
          onClick={handleSendMessage}
          bg={primaryColorPurple}
          color="white"
          _hover={{ bg: primaryColorOrange }}
          _active={{ bg: primaryColorOrange }}
        >
          <FiSend />
        </Button>
        <IconButton
          ml={2}
          size={"lg"}
          icon={<AiOutlineCode />}
          bg={primaryColorPurple}
          color="white"
          _hover={{ color: primaryColorOrange }}
          aria-label="Code Button"
        />
      </Flex>
    </Box>
  );
};

export default LabChatBox;
