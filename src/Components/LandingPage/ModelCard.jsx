import React from "react";
import {
  Box,
  Image,
  Text,
  Badge,
  HStack,
  Button,
  Flex,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { primaryColorOrange } from "../../colorCodes";

const ModelCard = ({ model }) => {
  return (
    <Box
      border="1px solid"
      borderColor="gray.200"
      borderRadius="xl"
      p={5}
      shadow="md"
      w="100%"
      transition="all 0.3s ease"
      _hover={{ shadow: "lg", transform: "translateY(-5px)" }}
      cursor="pointer"
      bg="white"
    >
      <Flex justifyContent="left" alignItems="center" flexWrap="wrap">
        <Image boxSize="48px" src={model.image} alt={model.name} />
        <Flex flex="1" justify="left" flexDir="column" ml={2}>
          <Text fontSize="lg" fontWeight="bold" mt={3} mb={1} lineHeight="short">
            {model.name}
          </Text>
          <Text fontSize="sm" color="gray.500" mb={3}>
            {model.brand}
          </Text>
        </Flex>
      </Flex>

      <Flex justifyContent="space-between" alignItems="center" mb={4} flexWrap="wrap">
        <HStack spacing={4}>
          <Flex alignItems="center">
            <Text fontSize="xs" fontWeight="medium" color="gray.500" mr={2}>
              Model type
            </Text>
            <Badge
              colorScheme="blue"
              variant="solid"
              borderRadius="full"
              px={2}
              py={1}
            >
              {model.type}
            </Badge>
          </Flex>

          <Flex alignItems="center">
            <Text fontSize="xs" fontWeight="medium" color="gray.500" mr={2}>
              Context
            </Text>
            <Text fontSize="sm" fontWeight="bold" color="black">
              {model.context}
            </Text>
          </Flex>
        </HStack>

        <Button
          rightIcon={<ArrowForwardIcon />}
          colorScheme="black"
          variant="solid"
          borderRadius="full"
          w="40px"
          h="40px"
          p={0}
          bg="black"
          color="white"
          _hover={{ bg: primaryColorOrange }}
        />
      </Flex>
    </Box>
  );
};

export default ModelCard;
