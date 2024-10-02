import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Navbar from "../../Components/LandingPage/Navbar";
import Hero from "../../Components/LandingPage/Hero";
import InfoSection from "../../Components/LandingPage/InfoSection";
import SlideShow from "../../Components/LandingPage/SlideShow";
import Features from "../../Components/LandingPage/Features";
import Footer from "../../Components/LandingPage/Footer";
import ModelsSection from "../../Components/LandingPage/ModelsSelection";
import FeaturedPack from "../../Components/LandingPage/FeaturedPack";
import Footnote from "../../Components/LandingPage/Footnote";

const LandingPage = () => {
  return (
    <>
      <Navbar />

      <Box
        as="section"
        w={"full"}
        pt={["50px", "65px", "80px"]} 
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
          minHeight={["80vh", "100vh"]}
        >
          <Hero />
          <InfoSection />
        </Flex>


        <Flex
          w={"full"}
          // border={"1px  solid black"} 
          direction="column"
          justifyContent="center"
          alignItems="center"
          // minHeight={["60vh", "100vh"]} 
        >
          <SlideShow />
        </Flex>
      </Box>


      <Box
        as="section"
        w={"full"}
        pt={"10px"}
        textAlign="center"
        h="100%"
        bgGradient="linear-gradient(
          50deg,
          hsl(298deg 50% 89%) 0%,
          hsl(298deg 50% 90%) 12%,
          hsl(298deg 50% 91%) 21%,
          hsl(298deg 50% 92%) 27%,
          hsl(298deg 50% 93%) 33%,
          hsl(298deg 50% 94%) 39%,
          hsl(299deg 50% 95%) 45%,
          hsl(299deg 50% 95%) 50%,
          hsl(299deg 50% 96%) 56%,
          hsl(299deg 50% 97%) 63%,
          hsl(299deg 50% 98%) 70%,
          hsl(299deg 51% 99%) 81%,
          hsl(0deg 0% 100%) 100%
        )"
      >
        <Features />
      </Box>


      <Box as="section" w={"full"} textAlign="center" h="100%">
        <Flex
          w={"full"}
          direction="column"
          justifyContent="center"
          alignItems="center"
          minHeight={["60vh", "80vh"]}
        >
          <ModelsSection />
        </Flex>
      </Box>


      <Box
        as="section"
        w={"full"}
        textAlign="center"
        h="100%"
        bgGradient="linear-gradient(
          50deg,
          hsl(298deg 50% 89%) 0%,
          hsl(298deg 50% 90%) 12%,
          hsl(298deg 50% 91%) 21%,
          hsl(298deg 50% 92%) 27%,
          hsl(298deg 50% 93%) 33%,
          hsl(298deg 50% 94%) 39%,
          hsl(299deg 50% 95%) 45%,
          hsl(299deg 50% 95%) 50%,
          hsl(299deg 50% 96%) 56%,
          hsl(299deg 50% 97%) 63%,
          hsl(299deg 50% 98%) 70%,
          hsl(299deg 51% 99%) 81%,
          hsl(0deg 0% 100%) 100%
        )"
      >
        <Flex
          w={"full"}
          direction="column"
          justifyContent="center"
          alignItems="center"
          minHeight={["60vh", "80vh"]}
        >
          <FeaturedPack />
        </Flex>
      </Box>

      <Box
        as="section"
        w={"full"}
        textAlign="center"
        h="100%"
        bgGradient="linear-gradient(
          50deg,
          hsl(298deg 50% 89%) 0%,
          hsl(298deg 50% 90%) 12%,
          hsl(298deg 50% 91%) 21%,
          hsl(298deg 50% 92%) 27%,
          hsl(298deg 50% 93%) 33%,
          hsl(298deg 50% 94%) 39%,
          hsl(299deg 50% 95%) 45%,
          hsl(299deg 50% 95%) 50%,
          hsl(299deg 50% 96%) 56%,
          hsl(299deg 50% 97%) 63%,
          hsl(299deg 50% 98%) 70%,
          hsl(299deg 51% 99%) 81%,
          hsl(0deg 0% 100%) 100%
        )"
      >
        <Flex
          w={"full"}
          direction="column"
          justifyContent="center"
          alignItems="center"
          minHeight={["60vh", "80vh"]}
        >
          <Footer />
          <Footnote />
        </Flex>
      </Box>
    </>
  );
};

export default LandingPage;
