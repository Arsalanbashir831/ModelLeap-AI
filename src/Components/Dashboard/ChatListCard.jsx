import React, { useState } from "react";
import {
  Box,
  IconButton,
  Text,
  Flex,
  Tooltip,
  useClipboard,
  useToast,
  Badge,
  useDisclosure,
} from "@chakra-ui/react";
import { FaEdit, FaShareAlt, FaTable, FaTrash } from "react-icons/fa";
import EditBotModal from "./EditBotModalBox";
import ShareModal from "./ShareModal";
import DeleteConfirmationModal from "./DeleteModal"; // Import delete modal
import { BASE_URL } from "../../Constants";
import { useNavigate } from "react-router-dom";

const ChatListCard = ({ id, botName, systemContext, createdAt, modelName, kwargs, apiKey ,refresh ,setRefresh }) => {
  const { hasCopied, onCopy } = useClipboard(botName);
  const toast = useToast();
const navigate = useNavigate()
  // Modal controls
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isShareOpen, onOpen: onShareOpen, onClose: onShareClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  const [botDetails, setBotDetails] = useState({
    botName,
    systemContext,
    modelName,
    kwargs,
  });

  // Function to delete the bot
  const handleDeleteBot = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${BASE_URL}/api/bot/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast({
          title: "Bot deleted successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        
        onDeleteClose(); // Close the delete modal after success
        // Optionally, remove the card from UI or refresh the list
        setRefresh(!refresh)
      } else {
        throw new Error("Failed to delete bot.");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong while deleting the bot.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const handleSave = async (updatedDetails) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${BASE_URL}/api/bot/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Properly use string interpolation for the token
        },
        body: JSON.stringify(updatedDetails), // Convert updated details to JSON
      });
  
      if (response.ok) {
        const data = await response.json();
        setBotDetails(updatedDetails); // Update the bot details after a successful save
        toast({
          title: "Bot updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setRefresh(!refresh)
      } else {
        throw new Error("Failed to update bot.");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong while updating the bot.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  
  const truncateText = (text, maxWords) => {
    const wordsArray = text.split(" ");
    if (wordsArray.length > maxWords) {
      return wordsArray.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  };

  // Format creation date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp._seconds * 1000);
    return date.toLocaleDateString();
  };

  // Bot data for sharing
  const botData = {
    botId: id,
    apiKey: apiKey, // Assuming you're using the token as an API key
  };

  return (
    <Flex
      direction="column"
      justify="space-between"
      bg="white"
      borderRadius="lg"
      px={6}
      py={5}
      w="500px"
      maxW="800px"
      my={4}
      boxShadow="lg"
      transition="background-color 0.3s ease"
      _hover={{
        bg: "gray.50",
      }}
      border="1px solid"
      borderColor="gray.200"
    >
      {/* Top section: Bot details */}
      <Flex justify="space-between" alignItems="center">
        <Box>
          <Text fontSize="xl" fontWeight="bold" color="gray.700" mb={2}>
            {botName}
          </Text>
          <Badge maxW={'300px'}  colorScheme="purple" mb={2}>
        <Text isTruncated >
        {systemContext}
        </Text>
          </Badge>
        </Box>

        {/* Created date */}
        <Box textAlign="right">
          <Text fontSize="sm" color="gray.500">
            Created: {formatDate(createdAt)}
          </Text>
        </Box>
      </Flex>

      {/* Bottom section: Actions */}
      <Flex mt={4} justify="flex-end" alignItems="center" gap={3}>
        <Tooltip label={ "Bot Chat History"}>
          <IconButton
            icon={<FaTable />}
            size="md"
            bg="pink.100"
            color="pink.500"
            _hover={{ bg: "pink.100", color: "pink.600" }}
            onClick={()=>navigate(`/app/ailab/history/${id}`,{state:{apiKey:apiKey , modelName:modelName}})} // Add functionality for chat history
          />
        </Tooltip>

        {/* <Tooltip label={"Share Bot"} aria-label="Share Bot">
          <IconButton
            aria-label="Share Bot"
            icon={<FaShareAlt />}
            size="md"
            bg="green.100"
            color="green.500"
            _hover={{ bg: "green.100", color: "green.600" }}
            onClick={onShareOpen} // Trigger Share Modal
          />
        </Tooltip> */}

        <Tooltip label="Edit Bot" aria-label="Edit Bot">
          <IconButton
            aria-label="Edit Bot"
            icon={<FaEdit />}
            size="md"
            bg="gray.100"
            color="blue.500"
            _hover={{ bg: "blue.100", color: "blue.600" }}
            onClick={onEditOpen} // Trigger Edit Modal
          />
        </Tooltip>

        <Tooltip label="Delete Bot" aria-label="Delete Bot">
          <IconButton
            aria-label="Delete Bot"
            icon={<FaTrash />}
            size="md"
            bg="red.100"
            color="red.500"
            _hover={{ bg: "red.100", color: "red.600" }}
            onClick={onDeleteOpen} // Trigger Delete Confirmation Modal
          />
        </Tooltip>
      </Flex>

      {/* Modals */}
      {isEditOpen && (
        <EditBotModal
          isOpen={isEditOpen}
          onClose={onEditClose}
          botDetails={botDetails}
          onSave={handleSave}
        />
      )}

      {isShareOpen && (
        <ShareModal
          isOpen={isShareOpen}
          onClose={onShareClose}
          botData={botData} // Pass botData (botId, apiKey)
        />
      )}

      {isDeleteOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteOpen}
          onClose={onDeleteClose}
          onDelete={handleDeleteBot} // Pass the delete handler
        />
      )}
    </Flex>
  );
};

export default ChatListCard;
