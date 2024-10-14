import React from "react";
import Header from "../../Components/Dashboard/Header";
import LabChatBox from "../../Components/Dashboard/LabChatBox";
import { useParams, Link } from "react-router-dom";
import ChatListCard from "../../Components/Dashboard/ChatListCard";
import { Button, Box, Flex } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { primaryColorOrange } from "../../colorCodes";
import { useTheme } from "../../Themes/ThemeContext";
import Description from "../../Components/Dashboard/Description";
import HistoryBox from "../../Components/Dashboard/HistoryBox";
import ChatHeader from "../../Components/common/ChatHeader";


const AiLabChat = () => {
  const { chatId } = useParams();
  const { theme } = useTheme();

  return (
    <Box bg={theme.background} minH="100vh" p={3}>
      <Box mb={1}>
        <Header isTitle={false}  />
      </Box>

      <Box w="100%" maxW="100%" mx="auto">
        <Flex align="center" justify="center" gap={3} mb={0}>
          {/* <Link to="/app/ailab">
            <Button
              size="md"
              bg={primaryColorOrange}
              color="white"
              _hover={{ bg: "#e07c24" }}
              ml={5}
            >
              <ArrowBackIcon mr={2} /> Back
            </Button>
          </Link> */}

          <Flex flex="1" justify="center">
            {/* <Box maxW="800px" w="100%">
              <ChatListCard chatName={`Chat #${chatId}`} />
            </Box> */}
            {/* <ChatListCard chatName={`Chat #${chatId}`} /> */}
          
          </Flex>
        </Flex>

        {/* <Box
          p={2}
          borderRadius="md"
          boxShadow="md"
          bg={theme.cardBg}
          maxH="800px"
          overflowY="auto"
        >
          <LabChatBox />
        </Box> */}
        <Flex  gap={5}>
         
          <HistoryBox chatId={chatId}/>

          <Box
            p={2}
            borderRadius="md"
            // boxShadow="md"
            bg={theme.cardBg}
            maxH="800px"
            overflowY="auto"
            flex="1"
          >
            <ChatHeader chatId={chatId} chatName={'testing'}/>
            <LabChatBox chatId={chatId}/>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default AiLabChat;
