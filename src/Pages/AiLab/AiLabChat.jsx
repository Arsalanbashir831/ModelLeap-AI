import React from "react";
import Header from "../../Components/Dashboard/Header";
import LabChatBox from "../../Components/Dashboard/LabChatBox";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button, Box, Flex } from "@chakra-ui/react";
import { primaryColorOrange } from "../../colorCodes";
import { useTheme } from "../../Themes/ThemeContext";

const AiLabChat = () => {
  const { botId } = useParams();
  const { theme } = useTheme();
  const location = useLocation();
  const { apiKey, modelName } = location.state;
  const navigate = useNavigate();

  return (
    <Box bg={theme.background} minH="100vh" p={{ base: 3, md: 6 }}>
      {/* Back Button and Header */}
      <Flex mb={{ base: 4, md: 6 }} align="center" justify="space-between">
        <Button
          bg={primaryColorOrange}
          color="white"
          onClick={() => navigate("/app/ailab")}
          size={{ base: "sm", md: "md" }}
          _hover={{ bg: "orange.500" }}
        >
          Back
        </Button>
        <Header isTitle={false} />
      </Flex>

      {/* Main Content Area */}
      <Box w="100%" maxW="1200px" mx="auto">
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={{ base: 4, md: 6 }}
          align="flex-start"
          justify="center"
          mb={{ base: 4, md: 6 }}
        >
          {/* Chat Box */}
          <Box flex="1" w="100%">
            <LabChatBox apiKey={apiKey} botId={botId} modelName={modelName} />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default AiLabChat;
