import React, { useState } from "react";
import Header from "../../Components/Dashboard/Header";
import { Container, Box, Flex } from "@chakra-ui/react";
import MenuTabs from "../../Components/Dashboard/MenuTabs";
import AiChatBox from "../../Components/Dashboard/AiChatBox";
import logo from "../../../public/model_leap_favicon.png";
import ModelSelection from "../../Components/Dashboard/ModelSelection";

const AI = () => {
  const [activeTab, setActiveTab] = useState("Chat");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>

      <Box mt={8} p={"3"}>
        <Header title={"AI Playground"} />
        <Box ml={3}>
          <MenuTabs onTabChange={handleTabChange} />
        </Box>
      </Box>

      <Flex mt={6} mr={8} ml={6} justify="space-between" gap={6} align="start">
        <Box flex="2" maxW="60%" boxShadow="lg" p={5} borderRadius="lg" bg="white">
          {activeTab === "Chat" && <AiChatBox aiLogo={logo} />}
          {activeTab === "Code" && <AiChatBox aiLogo={logo} />}
          {activeTab === "Language" && <AiChatBox aiLogo={logo} />}
          {activeTab === "Image" && <AiChatBox aiLogo={logo} />}
        </Box>

        <Box flex="1" ml="2" maxW="35%" boxShadow="lg" p={5} borderRadius="lg" bg="white">
          {activeTab === "Chat" && <ModelSelection />}
          {activeTab === "Code" && <ModelSelection />}
          {activeTab === "Language" && <ModelSelection />}
          {activeTab === "Image" && <ModelSelection />}
        </Box>
      </Flex>
    </>
  );
};

export default AI;
