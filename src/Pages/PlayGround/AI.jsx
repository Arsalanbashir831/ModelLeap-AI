import React, { useState } from "react";
import Header from "../../Components/Dashboard/Header";
import { Box, Flex } from "@chakra-ui/react";
import MenuTabs from "../../Components/Dashboard/MenuTabs";
import AiChatBox from "../../Components/Dashboard/AiChatBox";
import logo from "../../../public/model_leap_favicon.png";
import ModelSelection from "../../Components/Dashboard/ModelSelection";
import { useTheme } from "../../Themes/ThemeContext";
import Description from "../../Components/Dashboard/Description";


const AI = () => {
  const [activeTab, setActiveTab] = useState("Chat");
  const { theme } = useTheme();
  

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Box mt={[4, 8]} p={["2", "3"]}>
        <Header title={"Playground"} />
        <Description description={"Use different AI models to chat or create content."} />
        <Box ml={3}>
          <MenuTabs onTabChange={handleTabChange} />
        </Box>
      </Box>

      <Flex
        mt={6}
        mr={8}
        ml={6}
        justify="space-between"
        gap={6}
        align="start"
        flexDirection={["column", "row"]}
      >
        {/* Chat Box Section */}
        <Box
          flex="2"
          maxW={["100%", "60%"]}
          boxShadow="lg"
          border={theme.AiChatBorder}
          p={5}
          borderRadius="lg"
          bg={theme.AiChatbg}
          backdropFilter="saturate(100%) blur(10px)"
          borderColor="rgba(255, 255, 255, 0.2)" // Light border for frosted effect
        >
          {/* Render AiChatBox based on active tab */}
          {activeTab === "Chat" && <AiChatBox  />}
          {activeTab === "Image" && <AiChatBox />}
        </Box>

        {/* Model Selection & Parameter Tuning Section */}
        <Box
          flex="1"
          ml={["0", "2"]}
          mt={["4", "0"]}
          maxW={["100%", "35%"]}
          boxShadow="lg"
          p={5}
          backdropFilter="saturate(100%) blur(10px)"
          borderColor="rgba(255, 255, 255, 0.2)" // Light border for frosted effect
          borderRadius="lg"
          bg={theme.AiChatbg}
        >
          {/* Render ModelSelection based on active tab */}
          {activeTab === "Chat" && (
            <ModelSelection
              type={"chat"}
            
            />
          )}
          {activeTab === "Image" && (
            <ModelSelection
              type={"image"}
             
            />
          )}
        </Box>
      </Flex>
    </>
  );
};

export default AI;
