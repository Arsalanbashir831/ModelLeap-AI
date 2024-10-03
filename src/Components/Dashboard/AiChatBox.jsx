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
          { type: "ai", text: "Hello! How can I assist you today?" },
        ]);
      }, 1000);

      setInput("");
    }
  };

  return (
    <Flex direction="column" h={["300px", "400px"]} w="100%">
      <VStack spacing="1" align="start" w="full" h="full">
        <Text fontSize={["lg", "xl"]} fontWeight="bold">
          Try It Out
        </Text>
        <Text fontSize={["sm", "md"]} color={primaryColorOrange}>
          Use the toolbar on the right to apply various settings and manage the results.
        </Text>

        <Box flex="1" w="full" overflowY="auto">
          {initState ? (
            <HStack justify="space-between" w="full" h="100%" flexDirection={["column", "row"]}>
              <VStack
                align="start"
                spacing="2"
                border="1px solid"
                borderColor="gray.200"
                p="4"
                bg="gray.50"
                borderRadius="md"
                w={["full", "48%"]}
              >
                <Text
                  fontSize={["sm", "md"]}
                  fontWeight="bold"
                  color={primaryColorOrange}
                >
                  Learn how to incorporate our AI models into your app
                </Text>
                <Link href="#" _hover={{ textDecoration: "none" }}>
                  <Text fontSize="sm" _hover={{ color: primaryColorPurple }}>
                  API Documentation
                  </Text>
                </Link>
                <Link href="#" _hover={{ textDecoration: "none" }}>
                  <Text fontSize="sm" _hover={{ color: primaryColorPurple }}>
                  Ask your question
                  </Text>
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
                w={["full", "48%"]}
                mt={["4", "0"]}
              >
                <Text
                  fontSize={["sm", "md"]}
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
                <Link href="#" _hover={{ textDecoration: "none" }}>
                  <Text fontSize="sm" _hover={{ color: primaryColorPurple }}>
                  Plan a trip
                  </Text>
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
            borderRadius="lg"
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
