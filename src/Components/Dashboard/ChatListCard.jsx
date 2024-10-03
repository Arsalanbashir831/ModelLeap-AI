import React, { useState } from "react";
import { Box, IconButton, Text, Flex, Input } from "@chakra-ui/react";
import { DeleteIcon, SettingsIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { FaShareAlt } from "react-icons/fa";
import { primaryColorOrange } from "../../colorCodes";

const ChatListCard = ({ chatName, onClick, onNameChange }) => {
  const [isEditing, setIsEditing] = useState(false); 
  const [editedName, setEditedName] = useState(chatName);
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

  return (
    <Flex
      align="center"
      justify="space-between"
      bg="#24303f"
    //   border="2px solid #00BFFF"
      borderRadius="md"
      px={4}
      py={3}
      w="100%"
      maxW="800px"
      my={2}
      _hover={{ bg: "#1e2a39", cursor: "pointer" }}
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
            // autoFocus
            _focus={{ outline: "none", borderColor: primaryColorOrange}}
            color="white"
            bg="#1e2a39"
          />
        ) : (
          <Text
            fontSize={{ base: "sm", md: "md" }}
            color="white"
            fontWeight="bold"
          >
            {editedName}
          </Text>
        )}
      </Box>

      <Flex gap={2}>
        <IconButton
          aria-label="Edit Chat"
          icon={<ExternalLinkIcon />}
          size="sm"
          bg="transparent"
          color="white"
          _hover={{ bg: "#24303f" }}
          onClick={(e) => {
            e.stopPropagation();
            handleEditClick();
          }}
        />
        <IconButton
          aria-label="Delete Chat"
          icon={<DeleteIcon />}
          size="sm"
          bg="transparent"
          color="white"
          _hover={{ bg: "#24303f" }}
        />
        <IconButton
          aria-label="Settings"
          icon={<SettingsIcon />}
          size="sm"
          bg="transparent"
          color="white"
          _hover={{ bg: "#24303f" }}
        />
        <IconButton
          aria-label="Share Chat"
          icon={<FaShareAlt />}
          size="sm"
          bg="transparent"
          color="white"
          _hover={{ bg: "#24303f" }}
        />
      </Flex>
    </Flex>
  );
};

export default ChatListCard;
