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

  const handleSendMessage = async () => {
    const token = localStorage.getItem("authToken");

    if (inputValue.trim()) {
      let updatedMessages = [];
      // Create the user message
      const userMessage = {
        from: "You",
        content: inputValue,
        time: new Date().toLocaleTimeString(),
        type: "text",
      };
      updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInputValue("");

      try {
        const isImageModel = selectedModel.value.startsWith("imagegen:");
        const isDalle = selectedModel.value.startsWith("dalle:");
        let aiMessage = {};
        if(isDalle || isImageModel){
           aiMessage = {
            from: "AI",
            content: "Generating image...",
            time: new Date().toLocaleTimeString(),
            type: "image",
            status: "loading",
          };
          updatedMessages = [...updatedMessages, aiMessage];
        }
       
        setMessages(updatedMessages);

        setIsLoading(true); // Start loading

        const response = await fetch(`${BASE_URL}/api/chat/message`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            modelName: selectedModel.value,
            message: inputValue,
          }),
        });

        if (!response.ok) {
        const data = await response.json();
          throw new Error(data.error);
        }
        if (response.status === "403" || response.status === 403) {
          navigate("/auth");
        }

        if (isImageModel || isDalle) {
        
        
          const data = await response.json();

          if (isDalle) {
            const imageUrl = data.response;
            if (imageUrl) {
              updatedMessages[updatedMessages.length - 1] = {
                ...updatedMessages[updatedMessages.length - 1],
                content: imageUrl,
                status: "complete",
              };
              setMessages([...updatedMessages]);
              setIsLoading(false);
              scrollToBottom();
            }
          } else if (isImageModel) {
            const imageId = data.response;
            let imageStatus = "processing";
            while (imageStatus === "processing") {
              await new Promise((resolve) => setTimeout(resolve, 3000)); // Poll every 3 seconds
              const imageResponse = await fetch(`${BASE_URL}/api/chat/get_images`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  request_id: imageId.toString(),
                }),
              });
              if (imageResponse.status === "403" || imageResponse.status === 403) {
                navigate("/auth");
              }

              const imageData = await imageResponse.json();
              imageStatus = imageData.status;

              if (imageStatus === "success") {
                const imageUrl = imageData.output[0];
                updatedMessages[updatedMessages.length - 1] = {
                  ...updatedMessages[updatedMessages.length - 1],
                  content: imageUrl,
                  status: "complete",
                };
                setMessages([...updatedMessages]);
                setIsLoading(false);
                scrollToBottom();
              }
            }
          }
        } else {
          // Handle text response
          const data = await response.json();
          let aiMessage = {
            from: "AI",
            content: data.response,
            time: new Date().toLocaleTimeString(),
            type: "text",
          };
          updatedMessages = [...updatedMessages, aiMessage];
          setMessages(updatedMessages);
          setIsLoading(false); // Stop loading
          scrollToBottom();
        }
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
      handleSendMessage();
    }
  };

  const renderMessage = (message, index) => (
    <Flex
      key={index}
      direction={message.from === "You" ? "row-reverse" : "row"}
      align="flex-start"
      justify="flex-start"
      my={2}
    >
      <Avatar
        name={message.from}
        bg={message.from === "You" ? "yellow.400" : "black"}
        size="sm"
        mr={message.from === "You" ? 0 : 4}
        ml={message.from === "You" ? 4 : 0}
      />
      <Box
        color="white"
        borderRadius="lg"
        p={4}
        boxShadow="lg"
        maxW="75%"
        position="relative"
        background={
          message.from === "You"
            ? theme.UserchatBubbleColor
            : theme.aiChatBubbleColor
        }
      >
        {message.type === "image" && message.status === "complete" ? (
          <Image
            src={message.content}
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
                  {message.content}
                </Text>
              </Flex>
            ) : (
              <Text color={message.from === "You" ? theme.textColor : "white"}>
                {message.content}
              </Text>
            )}
          </>
        )}
        <Flex
          mt={2}
          align="center"
          justify={message.from === "You" ? "flex-start" : "flex-end"}
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
              navigator.clipboard.writeText(message.content);
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
              Get started with AI by generating your playground API key.
            </Text>
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
          onClick={handleSendMessage}
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
