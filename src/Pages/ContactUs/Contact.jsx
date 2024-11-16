import React, { useState } from "react";
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
import { BASE_URL } from "../../Constants";

const MotionBox = motion(Box);

const Contact = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const toast = useToast();

  // State to store form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // State to track loading status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${BASE_URL}/admin/contact-us`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Message sent successfully.",
          description: "We've received your message and will get back to you soon!",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        setFormData({ name: "", email: "", message: "" }); // Clear form after success
      } else {
        const errorData = await response.json();
        toast({
          title: "Failed to send message.",
          description: errorData.message || "An error occurred while sending your message.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Network error.",
        description: "Unable to send message. Please try again later.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false); // Stop loading indicator
    }
  };

  return (
    <>
      {/* <Navbar />
      <br />
      <br /> */}
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
           Help Support
          </Heading>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl id="name" isRequired>
             
                <Input
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  focusBorderColor="purple.500"
                  _hover={{ borderColor: "gray.300" }}
                  size="lg"
                />
              </FormControl>

              <FormControl id="email" isRequired>
             
                <Input
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  focusBorderColor="purple.500"
                  _hover={{ borderColor: "gray.300" }}
                  size="lg"
                />
                <FormHelperText>We'll never share your email.</FormHelperText>
              </FormControl>

              <FormControl id="message" isRequired>
             
                <Textarea
                  value={formData.message}
                  onChange={handleInputChange}
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
                isLoading={isSubmitting} // Show loading state while submitting
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
