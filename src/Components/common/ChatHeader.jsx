import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Text,
  Flex,
  Input,
  Tooltip,
  useClipboard,
  useToast,
  Button,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { FaCogs, FaShareAlt } from "react-icons/fa";
import { GoDependabot } from "react-icons/go";
import SettingsModal from "../Dashboard/SettingsModal";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../Themes/ThemeContext";
import { useRecoilValue } from "recoil";
import chatNameState from "../../atoms/ChatNameState";
import { BASE_URL } from "../../Constants";
import ContextModal from "../Dashboard/ContextModal";

const ChatHeader = ({ chatId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isContextModalOpen, setIsContextModalOpen] = useState(false); // Context Modal State

  const { hasCopied, onCopy } = useClipboard(editedName);
  const toast = useToast();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const chatName = useRecoilValue(chatNameState);
  const token = localStorage.getItem("authToken");
  const apiKey = localStorage.getItem("apiKey");

  useEffect(() => {
    setEditedName(chatName);
  }, [chatName]);

  const handleEditClick = () => setIsEditing(true);
  const handleNameChange = (e) => setEditedName(e.target.value);
  
  const handleSaveName = async () => {
    setIsEditing(false);
    if (!editedName.trim()) {
      toast({
        title: "Invalid Chat Name",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/chat/${chatId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "x-api-key": apiKey,
        },
        body: JSON.stringify({ name: editedName }),
      });

      if (response.ok) {
        toast({
          title: "Chat name updated.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/chat/${chatId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": apiKey,
        },
      });

      if (response.ok) {
        navigate("/app/ailab");
        toast({
          title: "Chat deleted.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        throw new Error("Failed to delete chat.");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong while deleting the chat.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Function to save context
  const handleSaveContext = (context) => {
    console.log("Context saved:", context);
  };

  return (
    <Flex align="center" justify="space-between" bg={theme.background} borderRadius="md" px={6} py={4} w="100%" maxW="1000px" my={2} boxShadow="lg">
      <Box flex="1" mr={4}>
        {isEditing ? (
          <Input
            value={editedName}
            onChange={handleNameChange}
            onBlur={handleSaveName}
            size="sm"
            variant="unstyled"
            color={theme.textColor}
          />
        ) : (
          <Flex align="center">
            <Text fontSize="md" color={theme.textColor} fontWeight="bold">
              {editedName}
            </Text>
            <Tooltip label="Edit Chat Name">
              <IconButton aria-label="Edit Chat Name" icon={<EditIcon />} size="xs" ml={2} onClick={handleEditClick} />
            </Tooltip>
          </Flex>
        )}
      </Box>

      <Flex gap={2}>
        <Tooltip label="Delete Chat">
          <IconButton aria-label="Delete Chat" icon={<DeleteIcon />} size="sm" bg="transparent" color="pink.400" onClick={handleDelete} />
        </Tooltip>

        <Tooltip label={hasCopied ? "Copied!" : "Share Chat"}>
          <IconButton aria-label="Share Chat" icon={<FaShareAlt />} size="sm" bg="transparent" color="blue.400" onClick={onCopy} />
        </Tooltip>

        <Tooltip label="Settings">
          <IconButton aria-label="Settings" icon={<FaCogs />} size="sm" bg="transparent" color="orange.400" onClick={() => setIsSettingsOpen(true)} />
        </Tooltip>

        <Tooltip label="AI Context">
          <IconButton aria-label="AI Context" icon={<GoDependabot />} size="sm" bg="transparent" color="green.600" onClick={() => setIsContextModalOpen(true)} />
        </Tooltip>
      </Flex>

      {/* Settings Modal */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      {/* Context Modal */}
      <ContextModal isOpen={isContextModalOpen} onClose={() => setIsContextModalOpen(false)} onSave={handleSaveContext} />
    </Flex>
  );
};

export default ChatHeader;
