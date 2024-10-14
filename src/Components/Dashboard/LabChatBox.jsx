import React, { useState, useRef, useEffect } from "react";
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
  useToast,
  Spinner,
  Image,
} from "@chakra-ui/react";
import { FiSend } from "react-icons/fi";
import { BsClock, BsClipboard } from "react-icons/bs";
import { EditIcon } from "@chakra-ui/icons";
import { useTheme } from "../../Themes/ThemeContext";
import { BASE_URL } from "../../Constants";
import { useRecoilValue } from "recoil";
import modelState from "../../atoms/modelState";
import modelStateParameter from "../../atoms/modelParameterState";

const LabChatBox = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const { theme } = useTheme();
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const buttonSize = useBreakpointValue({ base: "md", md: "md" });
  const selectedModel = useRecoilValue(modelState);
  const modelParams = useRecoilValue(modelStateParameter);

  const handleSendMessage = async () => {
    const token = localStorage.getItem("authToken");
    const apiKey = localStorage.getItem("apiKey");

    if (inputValue.trim()) {
      // Local variable to keep track of messages
      let updatedMessages = [];
      // Add the user's message to the chat
      const userMessage = {
        from: "You",
        text: inputValue,
        time: new Date().toLocaleTimeString(),
        type: "text", // Add a type to differentiate message types
      };
      updatedMessages = [...messages, userMessage];

      setMessages(updatedMessages);

      // Clear the input field
      setInputValue("");

      try {
        // Determine if the selected model is for image generation
        const isImageModel = selectedModel.value.startsWith('imagegen:');

        if (isImageModel) {
          // Image Generation Flow
          const imageResponse = await fetch(`${BASE_URL}/api/chat/${chatId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              "x-api-key": apiKey,
            },
            body: JSON.stringify({
              modelName: selectedModel.value,
              message: inputValue,
            }),
          });

          if (imageResponse.ok) {
            const imageData = await imageResponse.json();
            const requestId = imageData.response || imageData.id;

            // Show loading message
            const loadingMessage = {
              from: "AI",
              text: "",
              time: new Date().toLocaleTimeString(),
              type: "image",
              status: "loading",
            };
            updatedMessages = [...updatedMessages, loadingMessage];
            setMessages(updatedMessages);

            // Poll for the image generation result
            let imageStatus = "pending";
            let imageResult = null;

            while (imageStatus === "pending" || imageStatus === "processing") {
              await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait 3 seconds before polling again

              const statusResponse = await fetch(`${BASE_URL}/api/get_images`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                  "x-api-key": apiKey,
                },
                body: JSON.stringify({
                  request_id: requestId.toString(),
                }),
              });

              if (statusResponse.ok) {
                const statusData = await statusResponse.json();
                imageStatus = statusData.status;

                if (imageStatus === "success") {
                  imageResult = statusData.output[0]; // Assuming output is an array of image URLs
                  break;
                } else if (imageStatus === "failed") {
                  throw new Error("Image generation failed.");
                }
              } else {
                throw new Error("Failed to get image status.");
              }
            }

            // Update the message with the image URL
            const aiImageMessage = {
              from: "AI",
              imageUrl: imageResult,
              time: new Date().toLocaleTimeString(),
              type: "image",
              status: "complete",
            };
            updatedMessages[updatedMessages.length - 1] = aiImageMessage;
            setMessages([...updatedMessages]);
          } else {
            const data = await imageResponse.json();
            throw new Error(data.error || "Failed to generate image.");
          }
        } else {
          // Text Generation Flow
          const response = await fetch(`${BASE_URL}/api/stream/${chatId}`, {
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
          });

          if (response.ok) {
            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");

            let aiMessage = {
              from: "AI",
              text: "",
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
                aiMessage.text += chunk;
                updatedMessages[updatedMessages.length - 1] = { ...aiMessage };
                setMessages([...updatedMessages]);
              }
            }
          } else {
            const data = await response.json();
            throw new Error(data.error || "Failed to get a response from AI");
          }
        }
      } catch (error) {
        // Show an error message in the chat if the API call fails
        toast({
          title: "Error",
          description: error.message || "Something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        updatedMessages = [
          ...updatedMessages,
          {
            from: "AI",
            text: "Sorry, something went wrong. Please try again.",
            time: new Date().toLocaleTimeString(),
            type: "text",
          },
        ];
        setMessages(updatedMessages);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box w="100%" maxW="1000px" mx="auto" p={4} borderRadius="lg">
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
          <>
            {/* You can add a welcome message or instructions here */}
          </>
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
                  {message.type === "text" && (
                    <Text color="white" fontWeight="bold">
                      {message.from}: {message.text}
                    </Text>
                  )}
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
                        <>
                          <Text color="white" fontWeight="bold" mb={2}>
                            {message.from}:
                          </Text>
                          <Image
                            src={message.imageUrl}
                            alt="Generated Image"
                            borderRadius="md"
                            maxH="300px"
                            objectFit="contain"
                          />
                        </>
                      )}
                    </>
                  )}
                  <Flex
                    mt={2}
                    align="center"
                    justify="flex-end"
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
                        navigator.clipboard.writeText(
                          message.text || message.imageUrl
                        );
                        toast({
                          title: "Copied to clipboard!",
                          status: "success",
                          duration: 2000,
                          isClosable: true,
                        });
                      }}
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
                    transform={
                      message.from === "You"
                        ? "rotate(45deg)"
                        : "rotate(-45deg)"
                    }
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
      </Flex>
    </Box>
  );
};

export default LabChatBox;
