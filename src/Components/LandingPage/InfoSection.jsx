import React from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import chatImg from "../../../public/chat.png";
import modelsImg from "../../../public/models.png";

// Convert Chakra Box into a motion component
const MotionBox = motion(Box);

const InfoSection = () => {
  const { ref: chatRef, inView: chatInView } = useInView({ triggerOnce: true });
  const { ref: modelRef, inView: modelInView } = useInView({ triggerOnce: true });

  const chatVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 2 } },
  };

  const modelVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 2 } },
  };

  return (
    <Box as="section" w="full" py={10} bg="transparent" textAlign="center">
      <Flex
        direction={{ base: "column", lg: "row" }}
        justifyContent="center"
        alignItems="center"
        gap={3}
        w="full"
        maxW="1100px"
        mx="auto"
        px={{ base: 4, md: 10 }}
      >
        <MotionBox
          ref={chatRef}
          initial="hidden"
          animate={chatInView ? "visible" : "hidden"}
          variants={chatVariants}
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
        </MotionBox>

        <MotionBox
          ref={modelRef}
          initial="hidden"
          animate={modelInView ? "visible" : "hidden"}
          variants={modelVariants}
          p={3}
          w={{ base: "100%", lg: "35%" }}
          boxShadow="md"
          borderRadius="lg"
          backdropFilter="blur(13px)"
          bg="transparent"
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
        </MotionBox>
      </Flex>
    </Box>
  );
};

export default InfoSection;
