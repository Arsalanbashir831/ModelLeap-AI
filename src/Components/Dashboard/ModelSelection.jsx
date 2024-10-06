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
import { useTheme } from "../../Themes/ThemeContext";



const ModelSelection = () => {
  const [model, setModel] = useState("GPT 4o mini");
  const { theme } = useTheme();
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
        <FormLabel fontWeight="bold" fontSize="lg" color={theme.textColor}>
          Model
        </FormLabel>
        <Select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          bg={theme.modelSelectionSelectBg}
          borderColor={theme.modelSelectionSelectBorder}
          placeholder="Start typing to search..."
          iconSize="16px"
          _hover={{ borderColor: primaryColorOrange }}
          _focus={{ borderColor: primaryColorOrange }}
          size="lg"
        >
          <optgroup label="OpenAI" bg={theme.modelSelectionSelectBg}>
            <option value="GPT 4o mini" color={theme.textColor}>
              <Flex gap={3}>
                <Text color={theme.textColor}>GPT 4o mini</Text>
                <Badge
                  ml="5px"
                  bg="blue.300"
                  color={theme.textColor}
                  borderRadius="md"
                  px="1"
                >
                  PRO
                </Badge>
              </Flex>
            </option>
            <option value="GPT 4">
              <Text color={theme.textColor}>

              GPT 4
              </Text>
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
              <Text color={theme.textColor}>

              GPT 3.5
              </Text>
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
              <Text color={theme.textColor}>

              Claude 3 Haiku
              </Text>
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
              <Text color={theme.textColor}>Claude 3.5 Sonnet</Text>
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
          <FormLabel fontWeight="bold" fontSize="lg" color={theme.textColor}>
            Parameters
          </FormLabel>
          <Box w="full">
            <Text mb="2" fontWeight="semibold" color={theme.textColor}>
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
            <Text mt="2" fontSize="sm" textAlign="right" color={theme.textColor}>
              {outputLength}
            </Text>
          </Box>

          <Box w="full">
            <Text mb="2" fontWeight="semibold" color={theme.textColor}>
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
            <Text mt="2" fontSize="sm" textAlign="right" color={theme.textColor}>
              {temperature}
            </Text>
          </Box>

          <Box w="full">
            <Text mb="2" fontWeight="semibold" color={theme.textColor}>
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
            <Text mt="2" fontSize="sm" textAlign="right" color={theme.textColor}>
              {topP}
            </Text>
          </Box>

          <Box w="full">
            <Text mb="2" fontWeight="semibold" color={theme.textColor}>
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
            <Text mt="2" fontSize="sm" textAlign="right" color={theme.textColor}>
              {topK}
            </Text>
          </Box>
        </VStack>
      </FormControl>
    </Box>
  );
};

export default ModelSelection;
