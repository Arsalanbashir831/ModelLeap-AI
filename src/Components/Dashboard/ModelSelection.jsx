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
import SelectBox from "../common/SelectBox";

const ModelSelection = () => {
  const [model, setModel] = useState(null);
  const { theme } = useTheme();
  const [outputLength, setOutputLength] = useState(512);
  const [temperature, setTemperature] = useState(0.7);
  const [topP, setTopP] = useState(0.7);
  const [topK, setTopK] = useState(50);

  const modelsData = [
    {
      label: "OpenAI",
      options: [
        {
          value: "GPT 4o mini",
          label: "GPT 4o mini",
          isPro: true,
        },
        {
          value: "GPT 4",
          label: "GPT 4",
          isPro: true,
        },
        {
          value: "GPT 3.5",
          label: "GPT 3.5",
          isPro: true,
        },
      ],
    },
    {
      label: "Anthropic",
      options: [
        {
          value: "Claude 3 Haiku",
          label: "Claude 3 Haiku",
          isPro: true,
        },
        {
          value: "Claude 3.5 Sonnet",
          label: "Claude 3.5 Sonnet",
          isPro: true,
        },
      ],
    },
  ];

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
      // boxShadow="lg"
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
        {/* <Select
      value={model}
      onChange={(e) => setModel(e.target.value)}
      bg={theme.modelSelectionSelectBg}
      borderColor={theme.modelSelectionSelectBorder}
      iconSize="16px"
      _hover={{ borderColor: primaryColorOrange }}
      _focus={{ borderColor: primaryColorOrange }}
      size="lg"
      color={theme.textColor}
    >
      {modelsData.map((group) => (
        <optgroup  label={group.label} key={group.label} style={{  color:'black' }}>
          {group.options.map((option) => (
            <option key={option.value} value={option.value} style={{  color: 'black' }}>
              <Flex gap={3}>
                <Text color={theme.textColor}>{option.label}</Text>
                {option.isPro && (
                  <Badge ml="auto" bg="blue.300" color="white" borderRadius="md" px="1">
                      PRO
                    </Badge>
                )}
              </Flex>
            </option>
          ))}
        </optgroup>
      ))}
    </Select> */}
        <SelectBox
          selectedOption={model}
          onChange={setModel}
          options={modelsData}
          placeholder="Select Model"
        />
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
            <Text
              mt="2"
              fontSize="sm"
              textAlign="right"
              color={theme.textColor}
            >
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
            <Text
              mt="2"
              fontSize="sm"
              textAlign="right"
              color={theme.textColor}
            >
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
            <Text
              mt="2"
              fontSize="sm"
              textAlign="right"
              color={theme.textColor}
            >
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
            <Text
              mt="2"
              fontSize="sm"
              textAlign="right"
              color={theme.textColor}
            >
              {topK}
            </Text>
          </Box>
        </VStack>
      </FormControl>
    </Box>
  );
};

export default ModelSelection;
