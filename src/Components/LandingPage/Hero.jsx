import React from "react";
import { Box, Flex, VStack, Text, Button, Stack } from "@chakra-ui/react";
import { primaryColorOrange, primaryColorPurple } from "../../colorCodes";
import { motion } from "framer-motion"; 

const textVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 2 } },
};

const buttonVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 2,
      delay: 1, 
    },
  },
};

const Hero = () => {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
      p={5}
    >
      <VStack spacing={4}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={textVariant}
        >
          <Text
            fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
            fontWeight="bold"
            lineHeight="shorter"
            color="black"
          >
            One API <br /> 200+ AI Models <br /> Uptime 99%
          </Text>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={textVariant}
          transition={{ delay: 0.5 }}
        >
          <Text
            fontSize={{ base: "md", md: "lg", lg: "xl" }}
            color={primaryColorOrange}
            maxW="600px"
          >
            Integrate AI features via our secure API
          </Text>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={buttonVariant}
        >
          <Stack direction={{ base: "column", md: "row" }} spacing={4}>
            <Button
              bg={primaryColorPurple}
              size="lg"
              borderRadius={"full"}
              textColor={"white"}
              variant="solid"
              px={10}
              py={8}
              _hover={{ bg: primaryColorOrange, color: "white" }}
            >
              Get API Key
            </Button>
            <Button
              // border={"1px solid gray"}
              borderRadius={"full"}
              colorScheme="gray"
              size="lg"
              boxShadow={"md"}
              variant="outline"
              px={10}
              py={8}
              _hover={{ bg: primaryColorOrange, color: "white", border: "none" }}
            >
              Contact Sales
            </Button>
          </Stack>
        </motion.div>
      </VStack>
    </Flex>
  );
};

export default Hero;
