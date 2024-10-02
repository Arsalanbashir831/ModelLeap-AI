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
import { primaryColorOrange, primaryColorPurple } from "../../colorCodes";

const ModelCard = ({ model }) => {
  return (
    <Box
      border="1px solid"
      borderColor="gray.500"
      borderRadius="xl"
      p={[4, 5]}
      shadow="md"
      w={["100%", "300px"]}
      transition="all 0.3s ease"
      _hover={{ shadow: "lg", transform: "translateY(-5px)" }}
      cursor="pointer"
      bg="white"
      maxW="full"
      overflow="hidden"
    >
      <Flex
        justifyContent="flex-start"
        alignItems="center"
        mb={[3, 10]}
        wrap="nowrap"
        h={100}
      >
        <Image boxSize={["40px", "48px"]} src={model.image} alt={model.name} />
        <Flex flexDir="column" ml={[2, 3]} mt={[2, 0]}>
          <Text
            fontSize={["md", "lg"]}
            fontWeight="bold"
            lineHeight="short"
            whiteSpace="nowrap"
            align={"left"}
          >
            {model.name}
          </Text>
          <Text fontSize="sm" color="gray.500" align={"left"}>
            {model.brand}
          </Text>
        </Flex>
      </Flex>

      <Flex
        direction={["row", "row"]}
        justifyContent="space-between"
        alignItems={["flex-start", "center"]}
        mb={[1, 1]}
        wrap="nowrap"
      >
        <Flex
          flexDir="column"
          maxW="50%"
        >
          <Text fontSize="xs" fontWeight="medium" color="gray.500">
            Model type
          </Text>
          <Badge
            bg={primaryColorOrange}
            variant="solid"
            borderRadius="full"
            px={2}
            color={"white"}
            py={1}
            mt={1}
            fontSize="sm"
          >
            {model.type}
          </Badge>
        </Flex>

        <Flex
          flexDir="column"
          maxW="50%"
        >
          <Text fontSize="xs" fontWeight="medium" color="gray.500">
            Context
          </Text>
          <Badge
            bg={primaryColorPurple}
            variant="solid"
            borderRadius="full"
            px={2}
            color={"white"}
            py={1}
            mt={1}
            fontSize="sm"
          >
            {model.context}

          </Badge>
        </Flex>

        <Flex
          justifyContent="flex-end"
          alignItems="center"
          mt={[3, 0]}
        >
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
            _hover={{ bg: "orange.400" }}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default ModelCard;

