import React, { useEffect } from "react";
import Header from "../../Components/Dashboard/Header";
import LabChatBox from "../../Components/Dashboard/LabChatBox";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import ChatListCard from "../../Components/Dashboard/ChatListCard";
import { Button, Box, Flex } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { primaryColorOrange } from "../../colorCodes";
import { useTheme } from "../../Themes/ThemeContext";
import Description from "../../Components/Dashboard/Description";
import HistoryBox from "../../Components/Dashboard/HistoryBox";
import ChatHeader from "../../Components/common/ChatHeader";

const AiLabChat = () => {
  const { botId } = useParams();
  const { theme } = useTheme();
  const location = useLocation();
  const { apiKey, modelName } = location.state;

  const navigate = useNavigate();
  return (

<Box bg={theme.background} minH="100vh" p={3}>
      <Flex mb={1}>
        <Button
          bg={primaryColorOrange}
          color={"white"}
          onClick={() => navigate("/app/ailab")}
        >
          {" "}
          Back
        </Button>
        <Header isTitle={false}/>
      </Flex>

      <Box w="100%" maxW="100%" mx="auto">
        <Flex width={"100%"} align="center" justify="center" gap={3} mb={0}>
          <Flex flex="1" justify="center"></Flex>
        </Flex>

        <Flex gap={5}>
          <LabChatBox apiKey={apiKey} botId={botId} modelName={modelName} />
        </Flex>
      </Box>
    </Box>
  );
};

export default AiLabChat;
