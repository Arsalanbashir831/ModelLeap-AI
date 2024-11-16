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
import { FaEdit, FaRobot, FaTable, FaTrash } from "react-icons/fa";
import EditBotModal from "./EditBotModalBox";
import ShareModal from "./ShareModal";
import DeleteConfirmationModal from "./DeleteModal";
import { BASE_URL } from "../../Constants";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../Themes/ThemeContext";

const ChatListCard = ({
  id,
  botName,
  systemContext,
  createdAt,
  modelName,
  apiKey,
  refresh,
  setRefresh,
  avatarFile,
}) => {
  const { hasCopied, onCopy } = useClipboard(botName);
  const toast = useToast();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [loading , setLoading] = useState(false)

  // Modal controls
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isShareOpen,
    onOpen: onShareOpen,
    onClose: onShareClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const [botDetails, setBotDetails] = useState({
    botName,
    systemContext,
    modelName,
    avatarFile,
    id,
  });

  const handleDeleteBot = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${BASE_URL}/api/bot/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
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
      setLoading(true)
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${BASE_URL}/api/bot/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
        description:
          error.message || "Something went wrong while updating the bot.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally{
      setLoading(false)
      onEditClose();
    }
  };
  const formatDate = (timestamp) => {
    const date = new Date(timestamp._seconds * 1000);
    return date.toLocaleDateString();
  };

  return (
    <Flex
      direction="column"
      bg={theme.AiChatbg}
      borderRadius="lg"
      p={4}
      w="100%"
      maxW="100%"
      mx="auto"
      my={4}
      boxShadow="lg"
      transition="all 0.3s ease-in-out"
      _hover={{
        boxShadow: "xl",
        transform: "scale(1.02)",
      }}
      overflow="hidden"
    >
      <Flex
        direction="column"
        align="center"
        justify="center"
        mb={4}
        textAlign="center"
      >
        {/* Bot Avatar and Details */}
        <Avatar size="lg" bg="purple.500" name={botName} color="white" src={avatarFile} mb={3} />
        <Text fontSize="lg" fontWeight="bold" color={theme.textColor} isTruncated maxW="80%">
          {botName}
        </Text>
        <Badge color={'purple.800'} px={2} borderRadius={'md'} bg={'purple.100'} mt={1} fontSize="xs" isTruncated maxW="80%">
          {systemContext}
        </Badge>
      </Flex>

      {/* Created Date */}
      <Box textAlign="center" mb={3}>
        <Text fontSize="sm" color="gray.500">
          Created: {formatDate(createdAt)}
        </Text>
      </Box>

      {/* Action Buttons */}
      <Flex justify="flex-end" gap={3} mt={2} wrap="wrap">
        <Tooltip label="Test" placement="top">
          <IconButton
            icon={<FaRobot />}
            size="sm"
            bg="green.100"
            color="green.500"
            _hover={{ bg: "green.200", color: "green.600" }}
            onClick={() =>
              navigate(`/app/ailab/chat/${id}`, {
                state: { apiKey: apiKey, modelName: modelName },
              })
            }
          />
        </Tooltip>
        <Tooltip label=" History" placement="top">
          <IconButton
            icon={<FaTable />}
            size="sm"
            bg="blue.100"
            color="blue.500"
            _hover={{ bg: "blue.200", color: "blue.600" }}
            onClick={() =>
              navigate(`/app/ailab/history/${id}`, {
                state: { apiKey: apiKey, modelName: modelName },
              })
            }
          />
        </Tooltip>
        <Tooltip label="Edit" placement="top">
          <IconButton
            icon={<FaEdit />}
            size="sm"
            bg="gray.100"
            color="gray.600"
            _hover={{ bg: "gray.200", color: "gray.700" }}
            onClick={onEditOpen}
          />
        </Tooltip>
        <Tooltip label="Delete" placement="top">
          <IconButton
            icon={<FaTrash />}
            size="sm"
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
          loading ={loading}
          setLoading={setLoading}
        />
      )}

      {isShareOpen && (
        <ShareModal isOpen={isShareOpen} onClose={onShareClose} botData={{ botId: id, apiKey }} />
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
