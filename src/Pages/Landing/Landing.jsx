import React from "react";
import {
  Box,
  Flex,
  VStack,
  Text,
  Button,
  Stack,
  Image,
} from "@chakra-ui/react";
import Navbar from "../../Components/LandingPage/Navbar";
import Hero from "../../Components/LandingPage/Hero";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Box
        as="section"
        w={"full"}
        pt={'65px'}
        textAlign="center"
        h="100%"
        bgGradient="linear-gradient(
    305deg,
    hsl(297deg 79% 77%) 0%,
    hsl(318deg 100% 81%) 0%,
    hsl(331deg 100% 84%) 1%,
    hsl(344deg 100% 86%) 2%,
    hsl(359deg 100% 90%) 6%,
    hsl(11deg 100% 91%) 30%,
    hsl(19deg 100% 94%) 73%,
    hsl(23deg 100% 97%) 100%
  )" 
      >
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
        <Hero />
        </Flex>
      </Box>
    </>
  );
};

export default LandingPage;
