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
  Avatar,
} from "@chakra-ui/react";
import { FaEdit, FaRobot, FaShareAlt, FaTable, FaTrash } from "react-icons/fa";
import EditBotModal from "./EditBotModalBox";
import ShareModal from "./ShareModal";
import DeleteConfirmationModal from "./DeleteModal";
import { BASE_URL } from "../../Constants";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../Themes/ThemeContext";

const ChatListCard = ({ id, botName, systemContext, createdAt, modelName, kwargs, apiKey, refresh, setRefresh }) => {
  const { hasCopied, onCopy } = useClipboard(botName);
  const toast = useToast();
  const navigate = useNavigate();
const {theme}=useTheme()
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
        onDeleteClose(); 
        setRefresh(!refresh);
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
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(updatedDetails),
      });

      if (response.ok) {
        setBotDetails(updatedDetails);
        toast({
          title: "Bot updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setRefresh(!refresh);
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

  // Format creation date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp._seconds * 1000);
    return date.toLocaleDateString();
  };

  // Bot data for sharing
  const botData = {
    botId: id,
    apiKey: apiKey,
  };

  return (
    <Flex
      direction="column"
      justify="space-between"
    bg={theme.AiChatbg} // Adds a subtle gradient background
      borderRadius="2xl"
      px={6}
      py={5}
      w="100%"
      maxW="600px"
      my={4}
      boxShadow="lg"
      transition="all 0.3s ease-in-out"
      _hover={{
        boxShadow: "xl",
        transform: "scale(1.03)", // Slight hover effect to give more emphasis
      }}
     
      borderColor="gray.200"
    >
      <Flex justify="space-between" alignItems="center">
        {/* Bot Icon and Details */}
        <Flex align="center">
          <Avatar
            size="lg"
            bg="purple.500"
            name={botName}
            color="white"
            mr={4}
          />
          <Box>
            <Text fontSize="2xl" fontWeight="bold" color={theme.textColor}>
              {botName}
            </Text>
            <Badge colorScheme="purple" mt={2} fontSize="sm" maxW="250px" isTruncated>
              {systemContext}
            </Badge>
          </Box>
        </Flex>
        {/* Created Date */}
        <Box textAlign="right">
          <Text fontSize="sm" color={theme.textColor}>
            Created: {formatDate(createdAt)}
          </Text>
        </Box>
      </Flex>

      {/* Action Buttons */}
      <Flex mt={6} justify="flex-end" alignItems="center" gap={4}>
        <Tooltip label="Test Bot" placement="top">
          <IconButton
            icon={<FaRobot />}
            size="lg"
            bg="green.100"
            color="green.500"
            _hover={{ bg: "green.200", color: "green.600" }}
            onClick={() => navigate(`/app/ailab/chat/${id}`, { state: { apiKey: apiKey, modelName: modelName } })}
          />
        </Tooltip>
        <Tooltip label="Bot Chat History" placement="top">
          <IconButton
            icon={<FaTable />}
            size="lg"
            bg="blue.100"
            color="blue.500"
            _hover={{ bg: "blue.200", color: "blue.600" }}
            onClick={() => navigate(`/app/ailab/history/${id}`, { state: { apiKey: apiKey, modelName: modelName } })}
          />
        </Tooltip>
        <Tooltip label="Edit Bot" placement="top">
          <IconButton
            icon={<FaEdit />}
            size="lg"
            bg="gray.100"
            color="gray.600"
            _hover={{ bg: "gray.200", color: "gray.700" }}
            onClick={onEditOpen}
          />
        </Tooltip>
        <Tooltip label="Delete Bot" placement="top">
          <IconButton
            icon={<FaTrash />}
            size="lg"
            bg="red.100"
            color="red.500"
            _hover={{ bg: "red.200", color: "red.600" }}
            onClick={onDeleteOpen}
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
          botData={botData}
        />
      )}

      {isDeleteOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteOpen}
          onClose={onDeleteClose}
          onDelete={handleDeleteBot}
        />
      )}
    </Flex>
  );
};

export default ChatListCard;
