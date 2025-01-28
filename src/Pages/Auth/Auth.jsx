import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import AuthForm from '../../Components/Login/AuthForm';
import { motion } from 'framer-motion';

const MotionText = motion(Text);

const words = [ //words
  "Cut the Cables! Access AI Models to Create Text, Images, & Bots with APIs & Widgets.", 

];
//      
const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    }
  }
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  }
};

const gradientText = {
  backgroundImage: `linear-gradient(
    105deg,
    hsl(0deg 0% 100%) 0%,          /* White */
    hsl(330deg 80% 90%) 33%,       /* Light Pink */
    hsl(270deg 70% 80%) 66%,       /* Light Purple */
    hsl(270deg 50% 60%) 100%       /* Purple */
  )`,
  backgroundClip: 'text',
  textFillColor: 'transparent',
};


const AuthPage = () => {
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      height="100vh"
      width="100vw"
      bg="gray.100"
      position="relative"
     
    >
      <Box
        flex="1"
        display={{ base: 'none', md: 'block' }}
        bgImage="url('/AuthModelLeap.jpg')" 
        bgPosition="center"
        bgSize="cover"
        bgRepeat="no-repeat"
        height="100vh"
        position="relative"


      >

        <Box
          position="absolute"
          top="0"
          left="0" //overlay
          width="100%"
          height="100%"
          bg="rgba(0, 0, 0, 0.5)"
          zIndex="1"
        />

        <Box
          position="absolute"
          top="50%"
          left="11%"
          transform="translate(0, -50%)"
          textAlign="left"
          color="white"
          px={4}
          zIndex="2"
        >
          <MotionText
            fontSize={{ base: '2xl', md: '4xl', lg: '5xl' }}
            fontWeight="bold"
            as="h1"
            sx={gradientText}
            initial="hidden"
            animate="visible"
            variants={textContainerVariants}
          >
            {words.map((word, index) => (
              <MotionText
                key={index}
                variants={wordVariants}
                display="inline-block"
                mr={2}
                sx={gradientText}
              >
                {word}
              </MotionText>
            ))}
          </MotionText>
        </Box>
      </Box>

      <Flex
        flex="1"
        alignItems="center"
        justifyContent="center"
        bg="white"
        height="100%"
      >
      
          <AuthForm />
     
      </Flex>
    </Flex>
  );
};

export default AuthPage;
