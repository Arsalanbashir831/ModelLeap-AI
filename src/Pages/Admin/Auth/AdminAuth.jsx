import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import AdminAuthForm from '../../../Components/Admin/Auth/AuthForm';


const MotionText = motion(Text);

const words = [ 
  "Admin", "Functions", "For", "User Analytics", "via", "Single", "Dashboard", "Solution", 
  "Subscriptions,", "User Access,",  "Complaints,", 
  "All", "Management", "Functions"
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

const AdminAuth = () => {
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
        bgImage="url('https://img.freepik.com/free-photo/software-developers-data-center-running-system-diagnostic-tests-pc_482257-105399.jpg?t=st=1729925400~exp=1729929000~hmac=1d84a1853617dcbef4301d61cf3302ff7242ef0a47205d2402e78a4220e6029b&w=740')" 
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
          <AdminAuthForm />
        </Box>
      </Flex>
    </Flex>
  );
};

export default AdminAuth;
