import React from "react";
import Header from "../../Components/Dashboard/Header";
import { Box } from "@chakra-ui/react";
import KeyGenerate from "../../Components/Dashboard/KeyGenerate";

const APIkey = () => {
  return (
    <>
      <Box mt={8} p={"3"}>
        <Header title={"API Key Management"} />
      </Box>
      <Box>
        <KeyGenerate />
      </Box>
    </>
  );
};

export default APIkey;
