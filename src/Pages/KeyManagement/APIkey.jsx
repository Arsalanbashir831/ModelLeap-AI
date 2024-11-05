import React from "react";
import Header from "../../Components/Dashboard/Header";
import { Box } from "@chakra-ui/react";
import KeyGenerate from "../../Components/Dashboard/KeyGenerate";

const APIkey = () => {
  return (
    <Box minH="100vh" p={{ base: 4, md: 8 }}>
      <Header title={"API Key Management"} />
      <Box
        borderRadius="lg"
        p={{ base: 4, md: 6 }}
        width="100%"
        maxW={{ base: "100%", md: "950px" }}
        mx="auto"
      >
        <KeyGenerate />
      </Box>
    </Box>
  );
};

export default APIkey;
