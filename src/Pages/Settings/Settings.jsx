import React from "react";
import Header from "../../Components/Dashboard/Header";
import { Box, Flex } from "@chakra-ui/react";
import PasswordChange from "../../Components/Dashboard/PasswordChange";

const Settings = () => {
  return (
    <Box minH="100vh">
      <Box mt={8} p={3}>
        <Header title={"Account Settings"} />
      </Box>
      <Box borderRadius="lg" ml={4} p={3} maxW="550px">
        <PasswordChange />
      </Box>
    </Box>
  );
};

export default Settings;
