import React from "react";
import { Box, Flex, VStack, Text, Button, Stack } from "@chakra-ui/react";

const Hero = () => {
  return (
    <>
      {/* <Box
      w={"full"}
        as="section"
        textAlign="center"
        h="100vh"
        bg="transparent" 
      > */}
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >

          <VStack spacing={4}>
            <Text
              fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
              fontWeight="bold"
              lineHeight="shorter"
              color="black"
            >
              One API <br /> 200+ AI Models <br /> Uptime 99%
            </Text>
            <Text
              fontSize={{ base: "md", md: "lg", lg: "xl" }}
              color="gray.600"
              maxW="600px"
            >
              Integrate AI features via our secure API
            </Text>

            <Stack direction={{ base: "column", md: "row" }} spacing={4}>
              <Button
                bg={'black'}
                size="lg"
                textColor={"white"}
                variant="solid"
                px={8}
                py={6}
              >
                Get API Key
              </Button>
              <Button
                colorScheme="gray"
                size="lg"
                variant="outline"
                px={8}
                py={6}
              >
                Contact Sales
              </Button>
            </Stack>
          </VStack>
        </Flex>
      {/* </Box> */}
    </>
  );
};

export default Hero;
