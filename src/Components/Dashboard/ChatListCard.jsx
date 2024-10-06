import React, { useState } from "react";
import { Box, IconButton, Text, Flex, Input } from "@chakra-ui/react";
import { DeleteIcon, SettingsIcon, ExternalLinkIcon, EditIcon, CloseIcon } from "@chakra-ui/icons";
import { FaShareAlt } from "react-icons/fa";
import SettingsModal from "./SettingsModal";

const ChatListCard = ({ chatName, onClick, onNameChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(chatName);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleSaveName = () => {
    setIsEditing(false);
    if (onNameChange) {
      onNameChange(editedName);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSaveName();
    }
  };

  const handleSettingsOpen = (e) => {
    e.stopPropagation();
    setIsSettingsOpen(true);
  };

  const handleSettingsClose = () => {
    setIsSettingsOpen(false);
  };

  return (
    <Flex
      align="center"
      justify="space-between"
      bg="linear-gradient(90deg, #1F2A37 0%, #2E3442 100%)"
      borderRadius="full"
      px={6}
      py={4}
      w="100%"
      maxW="1000px"
      my={2}
      boxShadow="lg"
      _hover={{ bg: "linear-gradient(90deg, #1B2733 0%, #2B3241 100%)", cursor: "pointer" }}
      onClick={onClick}
    >

      <Box flex="1" mr={4}>
        {isEditing ? (
          <Input
            value={editedName}
            onChange={handleNameChange}
            onBlur={handleSaveName}
            onKeyPress={handleKeyPress}
            size="sm"
            variant="unstyled"
            _focus={{ outline: "none", borderColor: "transparent" }}
            color="white"
            bg="transparent"
          />
        ) : (
          <Flex align="center">
            <Text fontSize="md" color="white" fontWeight="bold">
              {editedName}
            </Text>
            <IconButton
              aria-label="Edit Chat Name"
              icon={<EditIcon />}
              size="xs"
              ml={2}
              bg="transparent"
              color="whiteAlpha.800"
              _hover={{ color: "white", bg: "transparent" }}
              onClick={(e) => {
                e.stopPropagation();
                handleEditClick();
              }}
            />
          </Flex>
        )}
      </Box>

      {/* Action Icons */}
      <Flex gap={2}>
        <IconButton
          aria-label="Delete Chat"
          icon={<DeleteIcon />}
          size="sm"
          bg="transparent"
          color="pink.400"
          _hover={{ color: "white", bg: "transparent" }}
        />
        <IconButton
          aria-label="Settings"
          icon={<SettingsIcon />}
          size="sm"
          bg="transparent"
          color="orange.400"
          _hover={{ color: "white", bg: "transparent" }}
          onClick={handleSettingsOpen}
        />
        <IconButton
          aria-label="Share Chat"
          icon={<FaShareAlt />}
          size="sm"
          bg="transparent"
          color="blue.400"
          _hover={{ color: "white", bg: "transparent" }}
        />
        <IconButton
          aria-label="Close Chat"
          icon={<CloseIcon />}
          size="sm"
          bg="transparent"
          color="whiteAlpha.800"
          _hover={{ color: "white", bg: "transparent" }}
        />
      </Flex>

      <SettingsModal isOpen={isSettingsOpen} onClose={handleSettingsClose} />
    </Flex>
  );
};

export default ChatListCard;
