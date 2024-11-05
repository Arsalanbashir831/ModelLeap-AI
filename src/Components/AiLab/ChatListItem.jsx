import React from "react";
import {
  ListItem,
  Flex,
  Stack,
  Avatar,
  Box,
  Text,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { FaShare } from "react-icons/fa";
import { useTheme } from "../../Themes/ThemeContext";
import { primaryColorOrange, primaryColorPurple } from "../../colorCodes";

const ChatListItem = ({ chat, selectedChat, handleChatSelection, handleShare }) => {
  // Access the theme from context
  const { theme } = useTheme();

  return (
    <ListItem key={chat.chatId} w="100%">
      <Flex
        onClick={() => handleChatSelection(chat)}
        alignItems="center"
        px={{ base: 2, md: 4 }}
        py={{ base: 2, md: 3 }}
        borderRadius="lg"
        bg={
          selectedChat?.chatId === chat.chatId
            ? theme.background
            : "transparent"
        }
        boxShadow="md"
        _hover={{
          bg: selectedChat?.chatId === chat.chatId
            ? theme.background
            : "gray.100",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
      >
        <Stack direction="row" align="center" spacing={4} width="100%">
          {/* Avatar */}
          <Avatar
            name={chat.name}
            bg={
              selectedChat?.chatId === chat.chatId
                ? primaryColorOrange
                : primaryColorPurple
            }
            size={{ base: "sm", md: "md" }}
            color={theme.textColor}
          />

          {/* Chat Name */}
          <Box flex="1">
            <Text
              fontWeight="bold"
              fontSize={{ base: "sm", md: "md" }}
              color={theme.textColor}
              noOfLines={1}
            >
              {chat.name}
            </Text>
          </Box>

          {/* Share Button */}
          <Stack direction="row" spacing={1}>
            <Tooltip label="Share Chat" aria-label="Share Chat">
              <IconButton
                icon={<FaShare />}
                size={{ base: "xs", md: "sm" }}
                colorScheme="blue"
                variant="ghost"
                _hover={{
                  color: theme.iconColor,
                }}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click event from triggering chat selection
                  handleShare(chat);
                }}
              />
            </Tooltip>
          </Stack>
        </Stack>
      </Flex>
    </ListItem>
  );
};

export default ChatListItem;
