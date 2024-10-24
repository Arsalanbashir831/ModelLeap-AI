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
  useColorModeValue,
} from "@chakra-ui/react";
import { FaShare } from "react-icons/fa";
import { useTheme } from "../../Themes/ThemeContext";
import { primaryColorOrange, primaryColorPurple } from "../../colorCodes";


const ChatListItem = ({ chat, selectedChat, handleChatSelection, handleShare }) => {
  // Access the theme from context
  const { theme } = useTheme();

  return (
    <ListItem key={chat.chatId}>
      <Flex 
        onClick={() => handleChatSelection(chat)}
        alignItems="center"
        px={4}
        py={3}
        borderRadius="lg"
        
        bg={
          selectedChat?.chatId === chat.chatId
            ? theme.background
            : 'transparent'
        }
        boxShadow="md"
        _hover={{
        //   bg: useColorModeValue("gray.100", "gray.700"),
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
      >
        <Stack direction="row" align="center" spacing={4} width="100%">
          {/* Avatar */}
          <Avatar
            name={chat.name}
            bg={selectedChat?.chatId === chat.chatId ? primaryColorOrange : primaryColorPurple}
            size="md"
            color={theme.textColor}
          />

          {/* Chat Name */}
          <Box flex="1">
            <Text
              fontWeight="bold"
              fontSize="md"
              color={selectedChat?.chatId === chat.chatId ? theme.textColor : theme.textColor}
              noOfLines={1}
            >
              {chat.name}
            </Text>
          </Box>

          {/* Share Button */}
          <Stack direction="row" spacing={2}>
            <Tooltip label="Share Chat" aria-label="Share Chat">
              <IconButton
                icon={<FaShare />}
                size="sm"
                colorScheme={selectedChat?.chatId === chat.chatId ? "black" : "blue"}
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
