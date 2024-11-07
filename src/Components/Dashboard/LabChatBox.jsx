import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Flex,
  Input,
  Button,
  Text,
  IconButton,
  VStack,
  Avatar,
  useBreakpointValue,
  useToast,
  Spinner,
  Image,
  SkeletonText,
  useDisclosure,
} from "@chakra-ui/react";
import { FiSend } from "react-icons/fi";
import { BsClock, BsClipboard, BsArrowDown } from "react-icons/bs";
import { useTheme } from "../../Themes/ThemeContext";
import { BASE_URL } from "../../Constants";
import { useRecoilValue } from "recoil";
import modelState from "../../atoms/modelState";
import modelStateParameter from "../../atoms/modelParameterState";
import { useNavigate } from "react-router-dom";
import CreateChatModel from "./CreateChatModel";
import { generateImage } from "../../helper/GenerateImage";

const LabChatBox = ({ botId, apiKey, modelName }) => {
  const [messages, setMessages] = useState([]);
  const { theme } = useTheme();
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const buttonSize = useBreakpointValue({ base: "md", md: "md" });
  const selectedModel = useRecoilValue(modelState);
  const modelParams = useRecoilValue(modelStateParameter);
  const [isLoading, setIsLoading] = useState(false); // For loading animation
  const [showScrollButton, setShowScrollButton] = useState(false); // For scroll-to-bottom button
  const { isOpen, onOpen, onClose } = useDisclosure();
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [chatId, setChatId] = useState(null);

  useEffect(() => {
    console.log(modelName);
  }, [chatId]);

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
      // Show scroll button if not at the bottom
      if (scrollHeight - scrollTop > clientHeight + 100) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    }
  };

  const handleNewChat = async (name) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${BASE_URL}/api/bot/${botId}/chat/start`, {
        method: "POST",
        headers: {
      
          Authorization: `Bearer ${token}`,
          "x-api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name }),
      });
      if (response.ok) {
        const data = await response.json();
        setChatId(data.chatId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendMessage = async () => {
    const token = localStorage.getItem("authToken");
    // const apiKey = localStorage.getItem("apiKey");
    const isImageModel = modelName.startsWith("imagegen:");
    const isDalle = modelName.startsWith("dalle:");
    if (inputValue.trim()) {
      let userConversation = [];
      let updatedMessages = [];
      // Add the user's message to the chat
      const userMessage = {
        from: "You",
        content: inputValue,
        time: new Date().toLocaleTimeString(),
        type: "text",
      };
      if (!isImageModel) {
        userConversation.push({ role: "user", content: inputValue });
      }

      updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);

      // Clear the input field
      setInputValue("");

      try {
        let aiMessage = null;
        setIsLoading(true); // Start loading
        if (isImageModel || isDalle) {
          aiMessage = {
            from: "AI",
            content: "Generating image...",
            time: new Date().toLocaleTimeString(),
            type: "image",
            status: "loading",
          };
          updatedMessages = [...updatedMessages, aiMessage];
          setMessages(updatedMessages);
        }

      
          const response = await fetch(
            isImageModel || isDalle
              ? `${BASE_URL}/api/bot/${botId}/chat/${chatId}/image`
              : `${BASE_URL}/api/bot/${botId}/chat/${chatId}/stream`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                "x-api-key": apiKey,
              },
              body: JSON.stringify(
                isImageModel || isDalle
                  ? { message: inputValue }
                  : { messages: userConversation }
              ),
            }
          );
          if (isDalle  && response.ok) {
            const data = await response.json()
            const imageUrl = data.response
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
          }
         else if (isImageModel  && response.ok) {
            const data = await response.json();
            const imageId = data.response; 
            const imageUrl = await generateImage(imageId, apiKey ,chatId );
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
          }

        else {
            setIsLoading(false);
            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");

            let aiMessage = {
              from: "AI",
              content: "",
              time: new Date().toLocaleTimeString(),
              type: "text",
            };
            updatedMessages = [...updatedMessages, aiMessage];
            setMessages(updatedMessages);

            let done = false;
            while (!done) {
              const { value, done: readerDone } = await reader.read();
              done = readerDone;
              if (value) {
                const chunk = decoder.decode(value);
                aiMessage.content += chunk;
                userConversation.push({
                  role: "assistant",
                  content: aiMessage.content,
                });
                updatedMessages[updatedMessages.length - 1] = { ...aiMessage };
                setMessages([...updatedMessages]);
                scrollToBottom();
              }
            }
          }
        }
       catch (error) {
        toast({
          title: "Error",
          description: error.message || "Something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderMessageContent = (content, from, theme) => {
    // Replace **text** with bold
    const formattedContent = content.replace(
      /\*\*(.*?)\*\*/g,
      (match, p1) => `<b>${p1}</b>`
    );

    // Split lines by new line and render accordingly
    const lines = formattedContent.split("\n").map((line, index) => {
      // Handle numbered bullet points
      if (/^\d+\.\s/.test(line)) {
        return (
          <Text
            key={index}
            as="li"
            ml={4}
            color={from === "You" ? theme.textColor : "white"}
          >
            <span dangerouslySetInnerHTML={{ __html: line }} />
          </Text>
        );
      }

      // Handle bold text
      if (/\<b\>(.*?)\<\/b\>/.test(line)) {
        return (
          <Text
            key={index}
            fontWeight="bold"
            color={from === "You" ? theme.textColor : "white"}
          >
            <span dangerouslySetInnerHTML={{ __html: line }} />
          </Text>
        );
      }

      // Regular text
      return (
        <Text key={index} color={from === "You" ? theme.textColor : "white"}>
          <span dangerouslySetInnerHTML={{ __html: line }} />
        </Text>
      );
    });

    return lines;
  };

  return (
    <Box
      w="100%"
      maxW="100%"
      mx="auto"
      p={4}
      borderRadius="lg"
      position="relative"
      shadow={"lg"}
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
        {chatId === null ? (
          <>
            <Flex
              gap={10}
              flexDirection={"column"}
              h={"100vh"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text color="gray.500">
                Click here to start conversation with Bot
              </Text>
              <Button colorScheme="pink" onClick={onOpen}>
                Start Chat
              </Button>
            </Flex>
          </>
        ) : (
          <>
            {messages?.map((message, index) => (
              <Flex
                key={message.id || index}
                direction={message.from === "You" ? "row-reverse" : "row"}
                align="flex-start"
                justify="flex-start"
                my={2}
              >
                <Avatar
                  src={
                    message.from === "You"
                      ? "/user-avatar.png"
                      : "/ai-avatar.png"
                  } // Replace with actual avatar URLs
                  size="md"
                  name={message.from === "You" ? "User" : "AI Assistant"}
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
                  {message.type === "text" &&
                    (message.from === "AI" &&
                    isLoading &&
                    index === messages.length - 1 ? (
                      <SkeletonText noOfLines={4} spacing="4" />
                    ) : (
                      renderMessageContent(message.content, message.from, theme)
                    ))}
                  {message.type === "image" && (
                    <>
                      {message.status === "loading" && (
                        <Flex align="center" justify="center" minH="100px">
                          <Spinner size="xl" color="white" />
                          <Text ml={3} color="white">
                            Generating image...
                          </Text>
                        </Flex>
                      )}
                      {message.status === "complete" && (
                        <Image
                          src={message.content}
                          alt="Generated Image"
                          borderRadius="md"
                          maxH="300px"
                          objectFit="contain"
                        />
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
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </VStack>

      {/* Scroll to Bottom Button */}
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
        {chatId != null && (
          <>
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
              isLoading={isLoading && inputValue.trim() !== ""} // Disable button while loading
            >
              <FiSend />
            </Button>
          </>
        )}
      </Flex>
      <CreateChatModel
        isOpen={isOpen}
        onClose={onClose}
        onSave={handleNewChat}
      />
    </Box>
  );
};

export default LabChatBox;
