import React from 'react';
import { Box, Text, Heading } from '@chakra-ui/react';
import { primaryColorOrange, primaryColorPurple } from '../../../colorCodes';

const FeaturedHeading = () => (
  <Box textAlign="center" mb={10}>
    <Text color={primaryColorPurple} textTransform="uppercase" fontSize="sm">
      Features
    </Text>
    <Heading fontWeight="bold" fontSize={{ base: '3xl', md: '6xl' }} mt={2}>
      Feature Packed
    </Heading>
    <Text fontSize="lg" color="gray.500" mt={2}>
      Advanced AI features for easy integration into your products.
    </Text>
  </Box>
);

export default FeaturedHeading;
