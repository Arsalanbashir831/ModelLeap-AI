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
import InfoSection from "../../Components/LandingPage/InfoSection";
import SlideShow from "../../Components/LandingPage/SlideShow";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Box
        as="section"
        w={"full"}
        pt={"65px"}
        textAlign="center"
        h="100%"
        bgGradient="linear-gradient(
    300deg,
    hsl(298deg 62% 85%) 0%,
    hsl(298deg 62% 87%) 3%,
    hsl(298deg 62% 90%) 9%,
    hsl(299deg 62% 92%) 20%,
    hsl(299deg 62% 95%) 41%,
    hsl(299deg 62% 97%) 77%,
    hsl(0deg 0% 100%) 100%
  )"
      >
        <Flex
          w={"full"}
          direction="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Hero />
          <InfoSection />
        </Flex>
        <Flex
          w={"full"}
          direction="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <SlideShow/>
        </Flex>
      </Box>
    </>
  );
};

export default LandingPage;
