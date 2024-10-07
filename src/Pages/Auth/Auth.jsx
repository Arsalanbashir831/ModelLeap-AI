import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import AuthForm from '../../Components/Login/AuthForm';
import { motion } from 'framer-motion';

const MotionText = motion(Text);

const words = [ //words
  "Access", "Top", "AI", "Models", "via", "Single", "API", "Solution", 
  "Chat,", "Text-to-Image,",  "Generation,", 
  "OCR", "and", "Vision", "models"
];

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
    hsl(0deg 65% 50%) 0%,
    hsl(315deg 60% 55%) 10%,
    hsl(330deg 70% 60%) 20%,
    hsl(340deg 75% 65%) 30%,
    hsl(350deg 80% 70%) 40%,
    hsl(360deg 85% 75%) 50%,
    hsl(10deg 90% 80%) 60%,
    hsl(20deg 92% 85%) 70%,
    hsl(30deg 94% 90%) 80%,
    hsl(40deg 96% 93%) 90%,
    hsl(50deg 98% 95%) 100%
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
        bgImage="url('/sign-in-sidebar.png')" 
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
        <Box width={{ base: '100%', md: '80%', lg: '70%' }} mx="auto">
          <AuthForm />
        </Box>
      </Flex>
    </Flex>
  );
};

export default AuthPage;
