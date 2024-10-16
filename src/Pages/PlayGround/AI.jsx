import React, { useState } from "react";
import Header from "../../Components/Dashboard/Header";
import { Box, Flex } from "@chakra-ui/react";
import MenuTabs from "../../Components/Dashboard/MenuTabs";
import AiChatBox from "../../Components/Dashboard/AiChatBox";
import ModelSelection from "../../Components/Dashboard/ModelSelection";
import Description from "../../Components/Dashboard/Description";
import { useTheme } from "../../Themes/ThemeContext";

const AI = () => {
  const [activeTab, setActiveTab] = useState("Chat");
  const { theme } = useTheme();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Box mt={[4, 8]} p={[2, 3]} width="100%">
        <Header title={"Playground"} />
        <Description description={"Use different AI models to chat or create content."} />
        <Box ml={[1, 3]}>
          <MenuTabs onTabChange={handleTabChange} />
        </Box>
      </Box>

      <Flex
        mt={6}
        px={[4, 6, 8]}
        flexDirection={["column", "row"]}
        gap={[6, 4]} 
        justify="space-between"
        align="start"
      >
        {/* Chat Box Section */}
        <Box
          flex="2"
          maxW={["100%", "100%", "60%"]}
          boxShadow="lg"
          border={theme.AiChatBorder}
          p={[4, 5]}
          borderRadius="lg"
          bg={theme.AiChatbg}
          backdropFilter="saturate(100%) blur(10px)"
          borderColor="rgba(255, 255, 255, 0.2)"
          width="100%" // Full width on smaller screens
        >
          {/* Render AiChatBox based on active tab */}
          {activeTab === "Chat" && <AiChatBox />}
          {activeTab === "Image" && <AiChatBox />}
        </Box>

        {/* Model Selection & Parameter Tuning Section */}
        <Box
          flex="1"
          mt={[6, 0]} // Add top margin on smaller screens to create space between sections
          maxW={["100%", "100%", "35%"]}
          boxShadow="lg"
          p={[4, 5]}
          backdropFilter="saturate(100%) blur(10px)"
          borderColor="rgba(255, 255, 255, 0.2)"
          borderRadius="lg"
          bg={theme.AiChatbg}
          width="100%" // Full width on smaller screens
        >
          {/* Render ModelSelection based on active tab */}
          {activeTab === "Chat" && <ModelSelection type={"chat"} />}
          {activeTab === "Image" && <ModelSelection type={"image"} />}
        </Box>
      </Flex>
    </>
  );
};

export default AI;
