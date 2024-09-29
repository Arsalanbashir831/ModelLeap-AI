import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Icon,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';

const BillingCard = ({ title, price, features, selected, onClick }) => {
  return (
    <Box
      borderWidth={selected ? '3px' : '1px'}
      borderColor={selected ? '#0070BE' : 'gray.200'}
      borderRadius="lg"
      p={6}
      maxW="300px"
      textAlign="center"
      boxShadow={selected ? 'lg' : 'md'}
      position="relative"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      h="100%"
    >
      {selected && (
        <Box
          position="absolute"
          top={-3}
          left="50%"
          transform="translateX(-50%)"
          bg="#0070BE"
          color="white"
          borderRadius="full"
          px={4}
          py={1}
          fontSize="sm"
          fontWeight="bold"
        >
          Current plan
        </Box>
      )}

      <Flex direction="column" flex="1" justify="space-between">
        <Box mb={4}>
          <Heading as="h4" size="md" mb={2} color="gray.700">
            {title}
          </Heading>
          <Heading as="h1" size="2xl" mb={4} color="black">
            {price}
          </Heading>
        </Box>

        <VStack spacing={3} alignItems="start" mb={6}>
          {features.map((feature, index) => (
            <Flex key={index} align="center">
              <Icon as={FaCheckCircle} color="green.400" mr={2} />
              <Text color="gray.600">{feature}</Text>
            </Flex>
          ))}
        </VStack>

        <Spacer />

        <Button
          onClick={onClick}
          colorScheme="blackAlpha"
          variant="outline"
          size="lg"
          mt="auto"
          rightIcon={<Icon as={FaCheckCircle} />}
        >
          View Usage →
        </Button>
      </Flex>
    </Box>
  );
};

export default BillingCard;
