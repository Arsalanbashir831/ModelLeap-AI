import React from "react";
import IntegrationComponent from "../../Components/Dashboard/IntegrationComponent";
import Header from "../../Components/Dashboard/Header";
import { Box, Flex } from "@chakra-ui/react";

const Integration = () => {
  return (
    <>
      <Box minH="100vh" p={6}>
        <Box mb={6}>
          <Header title={"Integration"} />
        </Box>

        <Box maxW="900px" mx="0">
          <IntegrationComponent />
        </Box>
      </Box>
    </>
  );
};

export default Integration;
