import React, { useState } from "react";
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
  Link,
  Flex,
} from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";
import { primaryColorOrange, primaryColorPurple } from "../../colorCodes";

const AiChatBox = ({ aiLogo }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [initState, setInitState] = useState(true);

  const handleSend = () => {
    if (input.trim()) {
      setInitState(false);

      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "user", text: input },
      ]);

      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "user", text: input },
          { type: "ai", text: "Hello! How can I assist you today?" },
        ]);
      }, 1000);

      setInput("");
    }
  };

  return (
    <Flex direction="column" h="400px" w="100%">
      <VStack spacing="1" align="start" w="full" h="full">
        <Text fontSize="xl" fontWeight="bold">
          Try It Out
        </Text>
        <Text fontSize="md" color="gray.600">
          Use the toolbar on the right to apply various settings and manage the
          results.
        </Text>

        <Box flex="1" w="full" overflowY="auto">
          {initState ? (
            <HStack justify="space-between" w="full" h="100%">
              <VStack
                align="start"
                spacing="2"
                border="1px solid"
                borderColor="gray.200"
                p="4"
                bg="gray.50"
                borderRadius="md"
              >
                <Text
                  fontSize="md"
                  fontWeight="bold"
                  color={primaryColorOrange}
                >
                  Learn how to incorporate our AI models into your app
                </Text>
                <Link color="blue.400" href="#">
                  API Documentation
                </Link>
                <Link color="blue.400" href="#">
                  Ask your question
                </Link>
              </VStack>
              <VStack
                align="start"
                spacing="2"
                border="1px solid"
                borderColor="gray.200"
                p="4"
                bg="gray.50"
                borderRadius="md"
              >
                <Text
                  fontSize="md"
                  fontWeight="bold"
                  color={primaryColorOrange}
                >
                  Type a prompt or try out the examples
                </Text>
                <Link href="#" _hover={{ textDecoration: "none" }}>
                  <Text fontSize="sm" _hover={{ color: primaryColorPurple }}>
                    Draft an Email
                  </Text>
                </Link>
                <Link color="blue.400" href="#">
                  Plan a trip
                </Link>
              </VStack>
            </HStack>
          ) : (
            <VStack
              spacing="4"
              w="full"
              align="stretch"
              overflowY="auto"
              border="1px solid"
              borderColor="gray.200"
              p="4"
              bg="gray.50"
              borderRadius="md"
              flex="1"
            >
              {messages.map((message, index) => (
                <HStack
                  key={index}
                  alignSelf={
                    message.type === "user" ? "flex-end" : "flex-start"
                  }
                >
                  {message.type === "user" ? (
                    <>
                      <Avatar name="You" bg="yellow.400" size="sm" />
                      <Box bg="gray.100" p="2" borderRadius="md">
                        <Text>{message.text}</Text>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Avatar src={aiLogo} name="AI" bg="black" size="sm" />
                      <Box bg="gray.100" p="2" borderRadius="md">
                        <Text>{message.text}</Text>
                      </Box>
                    </>
                  )}
                </HStack>
              ))}
            </VStack>
          )}
        </Box>

        <InputGroup size="lg">
          <Input
            placeholder="Type your prompt here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            borderRadius="md"
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            _focus={{ borderColor: "#29ABE3" }}
          />
          <InputRightElement>
            <IconButton
              aria-label="Send"
              icon={<FaPaperPlane />}
              onClick={handleSend}
              bg="#29ABE3"
              color="white"
              _hover={{ bg: "#0070BC" }}
            />
          </InputRightElement>
        </InputGroup>
      </VStack>
    </Flex>
  );
};

export default AiChatBox;
