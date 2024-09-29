import React from 'react';
import {
  Box,
  Text,
  Heading,
  Container,
  VStack,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Flex,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <Container maxW="container.lg" h="100vh" display="flex" justifyContent="center" alignItems="center">
      <VStack spacing={6} textAlign="center">
        {/* Progress Indicator */}
        {/* <CircularProgress isIndeterminate size="120px" color="blue.500">
          <CircularProgressLabel>Loading</CircularProgressLabel>
        </CircularProgress> */}

        {/* Heading */}
        <Heading
          as="h1"
          fontSize="5xl"
          fontWeight="bold"
          bgGradient="linear(to-r, blue.400, blue.600)"
          bgClip="text"
        >
          Landing Page
        </Heading>

        {/* Description */}
        <Text fontSize="lg" color="gray.500">
          Our landing page is under development. We're working hard to bring something awesome to you!
        </Text>

        {/* Button to navigate elsewhere */}
        <Link to="/app">
          <Button colorScheme="blue" size="lg" mt={4}>
            Go to Dashboard
          </Button>
        </Link>
      </VStack>
    </Container>
  );
};

export default Landing;
