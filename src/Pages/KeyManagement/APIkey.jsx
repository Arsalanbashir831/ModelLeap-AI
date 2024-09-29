import React from "react";
import Header from "../../Components/Dashboard/Header";
import { Box, Flex } from "@chakra-ui/react";
import KeyGenerate from "../../Components/Dashboard/KeyGenerate";

const APIkey = () => {
  return (
    <Box minH="100vh">
      <Box mt={8} p={3}>
        <Header title={"API Key Management"} />
      </Box>
      <Box borderRadius="lg" p={3} width="100%" maxW="950px">
        <KeyGenerate />
      </Box>
    </Box>
  );
};

export default APIkey;
