import React from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import chatImg from "../../../public/chat.png";
import modelsImg from "../../../public/models.png";

const InfoSection = () => {
  return (
    <Box
      as="section"
      w="full"
      py={10}
      bg="transparent"
      textAlign="center"
    >
      <Flex
        direction={{ base: "column", lg: "row" }} 
        justifyContent="center"
        alignItems="center"
        spacing={10}
        w="full"
        gap={3}
        maxW="1100px"
        mx="auto"
        px={{ base: 4, md: 10 }} 
      >

        <Box
          p={7}
          w={{ base: "100%", lg: "60%" }} 
          boxShadow="md"
          borderRadius="lg"
          backdropFilter="blur(50px)"
          bg="transparent" 
          maxW="500px"
        >
          <Image
            src={chatImg}
            alt="Chat Interface"
            borderRadius="md"
            w="full"
            h="auto"
            boxShadow="sm"
          />
        </Box>
        <Box
          p={3}
          w={{ base: "100%", lg: "35%" }}
          boxShadow="md"
          borderRadius="lg"
          backdropFilter="blur(13px)"

          maxW="300px" 
        >
          <Image
            src={modelsImg}
            alt="Model Selector"
            borderRadius="md"
            w="full"
            h="auto"
            boxShadow="sm"
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default InfoSection;
