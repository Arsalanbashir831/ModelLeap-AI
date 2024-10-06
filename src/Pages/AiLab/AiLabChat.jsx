import React from "react";
import Header from "../../Components/Dashboard/Header";
import LabChatBox from "../../Components/Dashboard/LabChatBox";
import { useParams, Link } from "react-router-dom";
import ChatListCard from "../../Components/Dashboard/ChatListCard";
import { Button, Box, Flex } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { primaryColorOrange } from "../../colorCodes";
import { useTheme } from "../../Themes/ThemeContext";

const AiLabChat = () => {
  const { chatId } = useParams();
  const { theme } = useTheme();

  return (
    <Box bg={theme.backgroundAilab} minH="100vh" p={3}>
      <Box mb={1}>
        <Header title="AI Lab" />
      </Box>

      <Box w="100%" maxW="100%" mx="auto">
        <Flex align="center" justify="center" gap={3} mb={0}>
          <Link to="/app/ailab">
            <Button
              size="md"
              bg={primaryColorOrange}
              color="white"
              _hover={{ bg: "#e07c24" }}
              ml={5}
            >
              <ArrowBackIcon mr={2} /> Back
            </Button>
          </Link>

          <Flex flex="1" justify="center">
            <Box maxW="800px" w="100%">
              <ChatListCard chatName={`Chat #${chatId}`} />
            </Box>
          </Flex>
        </Flex>

        <Box
          p={2}
          borderRadius="md"
          boxShadow="md"
          bg={theme.cardBg}
          maxH="800px"
          overflowY="auto"
        >
          <LabChatBox />
        </Box>
      </Box>
    </Box>
  );
};

export default AiLabChat;
