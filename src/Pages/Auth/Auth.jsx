import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import AuthForm from '../../Components/Login/AuthForm';
import { motion } from 'framer-motion';

const MotionText = motion(Text);

const words = [
  "Access", "Top", "AI", "Models", "via", "Single", "API", "Solution", 
  "Chat,", "Text-to-Image,", "Text-to-Video,", "Music", "Generation,", 
  "Voice,", "Embeddings,", "OCR", "and", "Vision", "models"
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
    45deg,
    hsl(297deg 56% 44%) 0%,
    hsl(310deg 52% 49%) 8%,
    hsl(320deg 57% 55%) 17%,
    hsl(329deg 64% 60%) 25%,
    hsl(337deg 70% 66%) 33%,
    hsl(344deg 75% 71%) 42%,
    hsl(351deg 79% 75%) 50%,
    hsl(358deg 82% 79%) 58%,
    hsl(5deg 85% 82%) 67%,
    hsl(10deg 87% 85%) 75%,
    hsl(15deg 87% 88%) 83%,
    hsl(19deg 85% 91%) 92%,
    hsl(22deg 83% 95%) 100%
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
          top="50%"
          left="11%"
          transform="translate(0, -50%)"
          textAlign="left"
          color="white"
          px={4}
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
        // border={'1px solid red'}
        alignItems="center"
        justifyContent="center"
        bg="white"
        height="100%"
      >
        <Box  width={{ base: '100%', md: '80%', lg: '70%' }} mx="auto">
          <AuthForm />
        </Box>
      </Flex>
    </Flex>
  );
};

export default AuthPage;
