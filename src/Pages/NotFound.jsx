import React from 'react';
import { Box, Heading, Text, Button, Container, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container maxW="container.lg" py={10}>
      <VStack spacing={6} textAlign="center">
        <Heading
          fontSize="9xl"
          bgGradient="linear(to-l, #0f3dbd,#0d1b40)"
          bgClip="text"
          fontWeight="extrabold"
        >
          404
        </Heading>
        <Heading size="lg">Page Not Ready Yet</Heading>
        <Text fontSize="xl">
          Sorry,We are working on this page 
        </Text>
        <Box>
          <Link to="/app">
            <Button colorScheme="blue" size="lg" mt={6}>
              Go Back to Home
            </Button>
          </Link>
        </Box>
      </VStack>
    </Container>
  );
};

export default NotFound;
