import React from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Flex,
  VStack,
  useToast,
  useBreakpointValue,
  FormHelperText,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Navbar from "../../Components/LandingPage/Navbar";

const MotionBox = motion(Box);

const Contact = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement form submission logic here
    toast({
      title: "Message sent.",
      description: "We've received your message and will get back to you soon!",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  return (
    <>

  <Navbar/>
  <br/>
  <br/>
    <MotionBox 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      maxW="100vw"
      p={8}
      bgGradient="linear(to-r, gray.100, white)"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        bg="white"
        p={8}
        borderRadius="lg"
        boxShadow="lg"
        width={isMobile ? "90%" : "50%"}
        maxW="1000px"
      >
        <Heading as="h1" mb={6} fontSize="3xl" textAlign="center" color="gray.700">
          Contact Us
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel>Your Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter your name"
                focusBorderColor="purple.500"
                _hover={{ borderColor: "gray.300" }}
                size="lg"
              />
            </FormControl>

            <FormControl id="email" isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email address"
                focusBorderColor="purple.500"
                _hover={{ borderColor: "gray.300" }}
                size="lg"
              />
              <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>

            <FormControl id="message" isRequired>
              <FormLabel>Your Message</FormLabel>
              <Textarea
                placeholder="Type your message here..."
                focusBorderColor="purple.500"
                _hover={{ borderColor: "gray.300" }}
                size="lg"
                rows={6}
              />
            </FormControl>

            <Button
              size="lg"
              colorScheme="purple"
              type="submit"
              w="full"
              bg="purple.500"
              _hover={{ bg: "purple.600" }}
            >
              Send Message
            </Button>
          </VStack>
        </form>
      </Box>
    </MotionBox>
    </>
  );
};

export default Contact;
