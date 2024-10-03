import React, { useState } from "react";
import {
  Box,
  Select,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  FormControl,
  FormLabel,
  Badge,
  VStack,
  HStack,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { FcApproval } from "react-icons/fc";
import { primaryColorOrange, primaryColorPurple } from "../../colorCodes";

const ModelSelection = () => {
  const [model, setModel] = useState("GPT 4o mini");
  const [outputLength, setOutputLength] = useState(512);
  const [temperature, setTemperature] = useState(0.7);
  const [topP, setTopP] = useState(0.7);
  const [topK, setTopK] = useState(50);

  return (
    <Box
      p="6"
      borderRadius="lg"
      bg="transparent"
      width="full"
      maxW="lg"
      height="400px"
      margin="auto"
      overflowY="auto"
      boxShadow="lg"
      css={{
        "&::-webkit-scrollbar": {
          width: "3px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: primaryColorOrange,
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#f1f1f1",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: primaryColorOrange,
        },
      }}
    >
      <FormControl mb="4">
        <FormLabel fontWeight="bold" fontSize="lg">
          Model
        </FormLabel>
        <Select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          bg="white"
          borderColor="gray.300"
          placeholder="Start typing to search..."
          iconSize="16px"
          _hover={{ borderColor: primaryColorOrange }}
          _focus={{ borderColor: primaryColorOrange }}
          size="lg"
        >
          <optgroup label="OpenAI">
            <option value="GPT 4o mini">
              <Flex gap={3}>
                <Text>GPT 4o mini</Text>
                <Badge
                  ml="5px"
                  bg="blue.300"
                  color="white"
                  borderRadius="md"
                  px="1"
                >
                  PRO
                </Badge>
              </Flex>
            </option>
            <option value="GPT 4">
              GPT 4
              <Badge
                ml="2"
                bg="blue.300"
                color="white"
                borderRadius="md"
                px="1"
              >
                PRO
              </Badge>
            </option>
            <option value="GPT 3.5">
              GPT 3.5
              <Badge
                ml="2"
                bg="blue.300"
                color="white"
                borderRadius="md"
                px="1"
              >
                PRO
              </Badge>
            </option>
          </optgroup>
          <optgroup label="Anthropic">
            <option value="Claude 3 Haiku">
              Claude 3 Haiku
              <Badge
                ml="2"
                bg="blue.300"
                color="white"
                borderRadius="md"
                px="1"
              >
                PRO
              </Badge>
            </option>
            <option value="Claude 3.5 Sonnet">
              Claude 3.5 Sonnet
              <Badge
                ml="2"
                bg="blue.300"
                color="white"
                borderRadius="md"
                px="1"
              >
                PRO
              </Badge>
            </option>
          </optgroup>
        </Select>

        <VStack mt="4" spacing="4" align="stretch">
          <FormLabel fontWeight="bold" fontSize="lg">
            Parameters
          </FormLabel>
          <Box w="full">
            <Text mb="2" fontWeight="semibold">
              Output length
            </Text>
            <Slider
              value={outputLength}
              min={1}
              max={1000}
              step={1}
              onChange={(val) => setOutputLength(val)}
            >
              <SliderTrack bg="gray.200" borderRadius="full">
                <SliderFilledTrack bg={primaryColorOrange} />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text mt="2" fontSize="sm" textAlign="right">
              {outputLength}
            </Text>
          </Box>

          <Box w="full">
            <Text mb="2" fontWeight="semibold">
              Temperature
            </Text>
            <Slider
              value={temperature}
              min={0}
              max={1}
              step={0.1}
              onChange={(val) => setTemperature(val)}
            >
              <SliderTrack bg="gray.200" borderRadius="full">
                <SliderFilledTrack bg={primaryColorOrange} />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text mt="2" fontSize="sm" textAlign="right">
              {temperature}
            </Text>
          </Box>

          <Box w="full">
            <Text mb="2" fontWeight="semibold">
              Top-P
            </Text>
            <Slider
              value={topP}
              min={0}
              max={1}
              step={0.1}
              onChange={(val) => setTopP(val)}
            >
              <SliderTrack bg="gray.200" borderRadius="full">
                <SliderFilledTrack bg={primaryColorOrange} />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text mt="2" fontSize="sm" textAlign="right">
              {topP}
            </Text>
          </Box>

          <Box w="full">
            <Text mb="2" fontWeight="semibold">
              Top-K
            </Text>
            <Slider
              value={topK}
              min={0}
              max={100}
              step={1}
              onChange={(val) => setTopK(val)}
            >
              <SliderTrack bg="gray.200" borderRadius="full">
                <SliderFilledTrack bg={primaryColorOrange} />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text mt="2" fontSize="sm" textAlign="right">
              {topK}
            </Text>
          </Box>
        </VStack>
      </FormControl>
    </Box>
  );
};

export default ModelSelection;
