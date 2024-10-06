import React from "react";
import Header from "../../Components/Dashboard/Header";
import LabChatBox from "../../Components/Dashboard/LabChatBox";
import { useParams, Link } from "react-router-dom";
import ChatListCard from "../../Components/Dashboard/ChatListCard";
import { Button, Box, Flex, Grid } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { primaryColorOrange } from "../../colorCodes";

const AiLabChat = () => {
  const { chatId } = useParams();

  return (
    <>
      <Header title={`AI Lab Chat`} />

      <Box p={4} w="100%" maxW="1200px" mx="auto">
        <Flex justify="flex-start" mb={4}>
          <Link to="/app/ailab">
            <Button bg={primaryColorOrange} color="white">
              <ArrowBackIcon mr={3} mt={1} /> Back to AI Lab
            </Button>
          </Link>
        </Flex>
        <Flex w={{ base: "100%", md: "100%" }}>
          <ChatListCard chatName={`Chat #${chatId}`} />
        </Flex>

        <Flex
          direction={{ base: "column", md: "row" }}
          justifyContent="space-between"
          gap={4}
        >
          {/* <Box
            w={{ base: "100%", md: "30%" }}
            bg="gray.700"
            p={4}
            borderRadius="md"
            boxShadow="md"
            mb={{ base: 4, md: 0 }}
          >
            <ChatListCard chatName={`Chat #${chatId}`} />
          </Box> */}

          <Box
            w={{ base: "100%", md: "100%" }}
            p={1}
            borderRadius="md"
            boxShadow="md"
            overflowY="auto"
          >
            <LabChatBox />
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default AiLabChat;
