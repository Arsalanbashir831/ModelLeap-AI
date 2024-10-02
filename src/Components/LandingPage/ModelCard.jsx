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
    >
      <Flex
        justifyContent="flex-start"
        alignItems="center"
        mb={[3, 10]}
        wrap="row"
        h={100}

      >
        <Image boxSize={["40px", "48px"]} src={model.image} alt={model.name} />
        <Flex flexDir="column" ml={[2, 3]} mt={[2, 0]}>
          <Text
            fontSize={["md", "lg"]}
            fontWeight="bold"
            lineHeight="short"
            whiteSpace="wrap"
            align={"left"}
          >
            {model.name}
          </Text>
          <Text fontSize="sm" color="gray.500" align={"left"}>
            {model.brand}
          </Text>
        </Flex>
      </Flex>

      <HStack
        spacing={[2, 4]}
        mb={[1, 1]}
        justifyContent="space-between"
        wrap="none"
      >
        <Flex
          alignItems="left"
          flexDir="column"
          ml={[2, 3]}
          mt={[2, 0]}

        >
          <Text fontSize="xs" fontWeight="medium" color="gray.500">
            Model type
          </Text>
          <Badge
            size={"sm"}
            bg={primaryColorOrange}
            variant="solid"
            borderRadius="full"
            px={1}
            color={"white"}
            py={1}
            mt={1}
            fontSize={["sm", "sm"]}
            alignContent={"left"}
          >
            {model.type}
          </Badge>
        </Flex>

        <Flex
          alignItems="left"
          flexDir="column"
          ml={[2, 3]}
          mt={[0, 0]}

        >
          <Text fontSize="xs" fontWeight="medium" color="gray.500" mr={2}>
            Context
          </Text>
          <Badge size={"sm"}
            bg={primaryColorPurple}
            variant="solid"
            borderRadius="full"
            px={1}
            color={"white"}
            py={1}
            mt={1}
            fontSize={["sm", "sm"]}
            alignContent={"left"}>
            {model.context}
          </Badge>
        </Flex>

        <Flex justifyContent="flex-end">
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
      </HStack>
    </Box>
  );
};

export default ModelCard;
