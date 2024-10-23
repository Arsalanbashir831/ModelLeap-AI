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
      borderColor="gray.300"
      borderRadius="lg"
      p={[4, 5]}
      shadow="md"
      w={["100%", "320px"]} // Responsive width for better scaling
      transition="all 0.3s ease"
      _hover={{ shadow: "lg", transform: "translateY(-8px)" }} // Increase hover elevation
      cursor="pointer"
      bg="white"
      maxW="full"
      overflow="hidden"
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mb={[3, 5]} // Adjust margin for better spacing
        h={["auto", "120px"]} // Set height responsive
      >
        <Image
          boxSize={["50px", "60px"]} // Slightly increase size for desktop
          src={model.image}
          alt={model.name}
        />
        <Flex
          flexDir="column"
          ml={4} // Ensure spacing
          maxW="calc(100% - 70px)" // Make text content responsive
        >
          <Text
            fontSize={["md", "xl"]} // Responsive font sizes
            fontWeight="bold"
            isTruncated // Truncate for long names
            lineHeight="short"
            textAlign={"left"}
          >
            {model.name}
          </Text>
          <Text fontSize={["sm", "md"]} color="gray.500" textAlign={"left"}>
            {model.brand}
          </Text>
        </Flex>
      </Flex>

      <Flex
        direction={["column", "row"]}
        justifyContent="space-between"
        alignItems="center"
        mt={[4, 0]} // Adjust top margin
      >
        <Box>
          <Text fontSize="xs" fontWeight="medium" color="gray.600">
            Model Type
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
            textAlign="center"
          >
            {model.type}
          </Badge>
        </Box>

        <Box mt={[3, 0]}>
          <Text fontSize="xs" fontWeight="medium" color="gray.600">
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
            textAlign="center"
          >
            {model.context}
          </Badge>
        </Box>

        <Flex
          justifyContent="flex-end"
          alignItems="center"
          mt={[4, 0]}
        >
          <Button onClick={()=>{window.location.href='/auth'}}
            rightIcon={<ArrowForwardIcon />}
            variant="solid"
            borderRadius="full"
            w="40px"
            h="40px"
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
