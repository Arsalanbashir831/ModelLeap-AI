import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Text,
  VStack,
  Flex,
  Avatar,
  Input,
  IconButton,
  useBreakpointValue,
  useToast,
  Spinner,
  Image,
  Button,
} from "@chakra-ui/react";
import { FaKey, FaPaperPlane } from "react-icons/fa";
import { BsArrowDown, BsClock, BsClipboard } from "react-icons/bs";
import { primaryColorOrange, primaryColorPurple } from "../../colorCodes";
import { useTheme } from "../../Themes/ThemeContext.jsx";
import { useRecoilValue } from "recoil";
import modelState from "../../atoms/modelState.js";
import modelStateParameter from "../../atoms/modelParameterState.js";
import { BASE_URL } from "../../Constants";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown"; // Markup library for handling text formatting

const AiChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [chatId, setChatId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const { theme } = useTheme();
  const selectedModel = useRecoilValue(modelState);
  const modelParams = useRecoilValue(modelStateParameter);
  const toast = useToast();
  const navigate = useNavigate();
  const buttonSize = useBreakpointValue({ base: "md", md: "md" });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = () => {
    const container = messagesContainerRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollHeight - scrollTop > clientHeight + 100) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    }
  };

  const handleSend = async () => {
    const token = localStorage.getItem("authToken");
    const apiKey = localStorage.getItem("apiKey");

    if (inputValue.trim()) {
      let updatedMessages = [];
      const userMessage = {
        type: "user",
        text: inputValue,
        time: new Date().toLocaleTimeString(),
      };
      updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInputValue("");

      try {
        const isImageModel = selectedModel.value.startsWith("imagegen:");
        setIsLoading(true); // Start loading

        const response = await fetch(`${BASE_URL}/api/chat/message`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            // "x-api-key": apiKey,
          },
          body: JSON.stringify({
            modelName: selectedModel.value,
            message: inputValue,
          }),
        });

        if (!response.ok) throw new Error("Failed to process message.");
        if (response.status === "403" || response.status === 403) {
          navigate("/auth");
        }
        if (isImageModel) {
          // Handle image generation
          const data = await response.json();
          const imageId = data.response;
          let imageStatus = "processing";
          while (imageStatus === "processing") {
            await new Promise((resolve) => setTimeout(resolve, 3000)); // Poll every 3 seconds
            const imageResponse = await fetch(`${BASE_URL}/api/chat/get_images`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                // "x-api-key": apiKey,
              },
              body: JSON.stringify({
                request_id: imageId.toString(),
              }),
            });
            if (imageResponse.status==='403'|| imageResponse.status===403) {
              navigate('/auth')
            }

            const imageData = await imageResponse.json();
            imageStatus = imageData.status;

            if (imageStatus === "success") {
              const imageUrl = imageData.output[0];
              updatedMessages.push({
                type: "ai",
                contentType: "image",
                text: imageUrl,
                time: new Date().toLocaleTimeString(),
              });
              setMessages([...updatedMessages]);
            }
          }
        } else {
          const data = await response.json();
          let aiMessage = {
            type: "ai",
            text: data.response,
            time: new Date().toLocaleTimeString(),
          };
          updatedMessages = [...updatedMessages, aiMessage];
          setMessages(updatedMessages);
        }

        setIsLoading(false); // Stop loading
        scrollToBottom();
      } catch (error) {
        setIsLoading(false); // Stop loading in case of error
        toast({
          title: "Error",
          description: error.message || "Something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderMessage = (message, index) => (
    <Flex
      key={index}
      direction={message.type === "user" ? "row-reverse" : "row"}
      align="flex-start"
      justify="flex-start"
      my={2}
    >
      <Avatar
        name={message.type === "user" ? "You" : "AI"}
        bg={message.type === "user" ? "yellow.400" : "black"}
        size="sm"
        mr={message.type === "user" ? 0 : 4}
        ml={message.type === "user" ? 4 : 0}
      />
      <Box
        color="white"
        borderRadius="lg"
        p={4}
        boxShadow="lg"
        maxW="75%"
        position="relative"
        background={
          message.type === "user"
            ? theme.UserchatBubbleColor
            : theme.aiChatBubbleColor
        }
      >
        {message.contentType === "image" ? (
          <Image
            src={message.text}
            alt="Generated Image"
            borderRadius="md"
            maxH="300px"
            objectFit="contain"
          />
        ) : (
          <>
            {message.status === "loading" ? (
              <Flex align="center" justify="center" minH="100px">
                <Spinner size="md" color="white" />
                <Text ml={3} color="white">
                  AI is thinking...
                </Text>
              </Flex>
            ) : (
              <Text color={message.type === "user" ? theme.textColor : "white"}>
                {message.text}
              </Text>
            )}
          </>
        )}
        <Flex
          mt={2}
          align="center"
          justify={message.type === "user" ? "flex-start" : "flex-end"}
          color="gray.400"
        >
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
            onClick={() => {
              navigator.clipboard.writeText(message.text);
              toast({
                title: "Copied to clipboard!",
                status: "success",
                duration: 2000,
                isClosable: true,
              });
            }}
          />
        </Flex>
      </Box>
    </Flex>
  );

  return (
    <Box
      w="100%"
      maxW="1000px"
      mx="auto"
      p={4}
      borderRadius="lg"
      position="relative"
    >
      <VStack
        ref={messagesContainerRef}
        onScroll={handleScroll}
        spacing={4}
        align="stretch"
        h="500px"
        overflowY="auto"
        p={4}
        bg="rgba(255, 255, 255, 0.04)"
        backdropFilter={"saturate(200%) blur(20px)"}
        borderRadius="md"
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#8e44ad",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#3498db",
          },
        }}
      >
        {messages.length === 0 ? (
          <Flex
            direction="column"
            justify="center"
            align="center"
            h="100%"
            color="gray.300"
            p={4}
            borderRadius="lg"
            boxShadow="xl"
          >
            <Text
              fontSize="2xl"
              fontWeight="extrabold"
              color={theme.textColor}
              mb={4}
              letterSpacing="wide"
              textAlign="center"
            >
              Experience the Power of AI Models
            </Text>
            <Text
              fontSize="lg"
              color={theme.textColor}
              mb={6}
              textAlign="center"
              lineHeight="tall"
              maxW="600px"
            >
              Ask questions, generate images, or run AI-driven queries using our
              models.
            </Text>
            <Button
              onClick={() => navigate("/app/keymanagement")}
              bg={primaryColorOrange}
              color="white"
              marginTop={4}
              marginBottom={4}
              _hover={{ bg: primaryColorPurple }}
            >
              Generate API KEY
            </Button>
          </Flex>
        ) : (
          <>
            {messages.map(renderMessage)}
            <div ref={messagesEndRef} />
          </>
        )}
      </VStack>

      {showScrollButton && (
        <IconButton
          icon={<BsArrowDown />}
          position="absolute"
          bottom="80px"
          right="20px"
          onClick={scrollToBottom}
          colorScheme="teal"
          borderRadius="full"
          zIndex={1}
          aria-label="Scroll to bottom"
        />
      )}

      <Flex mt={4} align="center">
        <Input
          placeholder="Type your prompt here..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          borderRadius="lg"
          color={theme.textColor}
          bg="transparent"
          border="0.5px solid"
          borderColor={primaryColorOrange}
          _focus={{ borderColor: primaryColorOrange }}
          _hover={{ borderColor: primaryColorOrange }}
          fontSize={["sm", "md"]}
          size={buttonSize}
        />
        <IconButton
          aria-label="Send"
          icon={<FaPaperPlane />}
          onClick={handleSend}
          bg={primaryColorOrange}
          color="white"
          _hover={{ bg: primaryColorPurple }}
          ml={2}
          isLoading={isLoading && inputValue.trim() !== ""}
          size={buttonSize}
        />
      </Flex>
    </Box>
  );
};

export default AiChatBox;
