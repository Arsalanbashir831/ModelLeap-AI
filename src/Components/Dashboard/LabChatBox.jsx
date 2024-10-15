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
} from "@chakra-ui/react";
import { FiSend } from "react-icons/fi";
import { BsClock, BsClipboard, BsArrowDown } from "react-icons/bs";
import { useTheme } from "../../Themes/ThemeContext";
import { BASE_URL } from "../../Constants";
import { useRecoilValue } from "recoil";
import modelState from "../../atoms/modelState";
import modelStateParameter from "../../atoms/modelParameterState";
import { useNavigate } from "react-router-dom";

const LabChatBox = ({ chatId }) => {
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

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const checkIfImageContent = (content) => {
    return Number.isInteger(content);
  };

  const fetchMessages = async () => {
    const token = localStorage.getItem("authToken");
    const apiKey = localStorage.getItem("apiKey");
    try {
      const response = await fetch(`${BASE_URL}/api/chat/${chatId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": apiKey,
        },
      });
      if (response.ok) {
        const data = await response.json();

        const processedMessages = await Promise.all(
          data.messages.map(async (message) => {
            const from = message.role === "user" ? "You" : "AI";
            const time = new Date(
              message.timestamp._seconds * 1000
            ).toLocaleTimeString();

            if (checkIfImageContent(message.content)) {
              const imageId = message.content;
              const imageResponse = await fetch(
                `${BASE_URL}/api/get_images`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    "x-api-key": apiKey,
                  },
                  body: JSON.stringify({
                    request_id: imageId.toString(),
                  }),
                }
              );

              if (imageResponse.ok) {
                const imageData = await imageResponse.json();
                if (imageData.status === "success") {
                  const imageUrl = imageData.output[0];

                  return {
                    id: message.id,
                    from,
                    content: imageUrl,
                    time,
                    type: "image",
                    status: "complete",
                  };
                } else {
                  return {
                    id: message.id,
                    from,
                    content: "Image generation failed.",
                    time,
                    type: "text",
                  };
                }
              } else {
                return {
                  id: message.id,
                  from,
                  content: "Failed to fetch image.",
                  time,
                  type: "text",
                };
              }
            } else {
              return {
                id: message.id,
                from,
                content: message.content,
                time,
                type: "text",
              };
            }
          })
        );

        setMessages(processedMessages);
      } else if (response.status === 403 || response.status === "403") {
        navigate("/auth");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessages();
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

  const handleSendMessage = async () => {
    const token = localStorage.getItem("authToken");
    const apiKey = localStorage.getItem("apiKey");

    if (inputValue.trim()) {
      let updatedMessages = [];
      // Add the user's message to the chat
      const userMessage = {
        from: "You",
        content: inputValue,
        time: new Date().toLocaleTimeString(),
        type: "text",
      };
      updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);

      // Clear the input field
      setInputValue("");

      try {
        const isImageModel = selectedModel.value.startsWith("imagegen:");

        setIsLoading(true); // Start loading

        // Send the message to either the image or text generation endpoint
        const response = await fetch(
          isImageModel
            ? `${BASE_URL}/api/image/${chatId}`
            : `${BASE_URL}/api/stream/${chatId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              "x-api-key": apiKey,
            },
            body: JSON.stringify({
              modelName: selectedModel.value,
              message: inputValue,
              kwargs: {
                topP: parseFloat(modelParams.topP),
                topK: parseInt(modelParams.topK),
                temperature: parseFloat(modelParams.temperature),
                maxOutputTokens: parseInt(modelParams.outputLength),
              },
            }),
          }
        );

        // If it's an image generation request
        if (isImageModel && response.ok) {
          const data = await response.json();
          const imageId = data.response; // Get imageId from response

          // Add a placeholder AI message for loading the image
          let aiMessage = {
            from: "AI",
            content: "Generating image...",
            time: new Date().toLocaleTimeString(),
            type: "image",
            status: "loading",
          };
          updatedMessages = [...updatedMessages, aiMessage];
          setMessages(updatedMessages);

          let imageStatus = "processing";
          while (imageStatus === "processing") {
            await new Promise((resolve) => setTimeout(resolve, 3000)); // Poll every 3 seconds

            const imageResponse = await fetch(
              `${BASE_URL}/api/get_images`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                  "x-api-key": apiKey,
                },
                body: JSON.stringify({
                  request_id: imageId.toString(),
                }),
              }
            );

            if (imageResponse.ok) {
              const imageData = await imageResponse.json();
              imageStatus = imageData.status; // Check status of image generation

              if (imageStatus === "success") {
                const imageUrl = imageData.output[0]; // Get the image URL

                // Update the last message in the array with the image URL
                updatedMessages[updatedMessages.length - 1] = {
                  ...updatedMessages[updatedMessages.length - 1],
                  content: imageUrl,
                  status: "complete",
                };
                setMessages([...updatedMessages]);
                setIsLoading(false); // Stop loading
                scrollToBottom();
              }
            } else {
              throw new Error("Failed to fetch image status.");
            }
          }
        }

        // If it's a text generation request, handle streaming
        if (!isImageModel && response.ok) {
          setIsLoading(false)
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
              updatedMessages[updatedMessages.length - 1] = { ...aiMessage };
              setMessages([...updatedMessages]);
              scrollToBottom();
            }
          }
         
        }
      } catch (error) {
      
        toast({
          title: "Error",
          description: error.message || "Something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }finally{
        setIsLoading(false)
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
        <Text
          key={index}
          color={from === "You" ? theme.textColor : "white"}
        >
          <span dangerouslySetInnerHTML={{ __html: line }} />
        </Text>
      );
    });

    return lines;
  };

  return (
    <Box w="100%" maxW="1000px" mx="auto" p={4} borderRadius="lg" position="relative">
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
        {messages?.length === 0 ? (
          <Text color="gray.300">No messages yet. Start the conversation!</Text>
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
                    (message.from === "AI" && isLoading && index === messages.length - 1 ? (
                      <SkeletonText noOfLines={4} spacing="4" />
                    ) : (
                      renderMessageContent(
                        message.content,
                        message.from,
                        theme
                      )
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
                    justify={
                      message.from === "You" ? "flex-start" : "flex-end"
                    }
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
      </Flex>
    </Box>
  );
};

export default LabChatBox;
