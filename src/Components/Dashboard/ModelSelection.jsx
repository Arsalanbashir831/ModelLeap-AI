import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  FormControl,
  FormLabel,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useTheme } from "../../Themes/ThemeContext";
import SelectBox from "../common/SelectBox";
import { BASE_URL } from "../../Constants";
import { useRecoilState } from "recoil";
import modelState from "../../atoms/modelState";
import modelStateParameter from "../../atoms/modelParameterState";

const ModelSelection = ({
  type, // either "chat" or "image"
}) => {
  const { theme } = useTheme();
  const toast = useToast();
  const [modelsData, setModelsData] = useState([]);
  const [selectedModel, setSelectedModel] = useRecoilState(modelState); 
  const [selectedModelParams, setSelectedModelParams] = useRecoilState(modelStateParameter); 

  // Fetch models based on the type (chat or image)
  useEffect(() => {
    const fetchModels = async () => {
      const token = localStorage.getItem('authToken')
      try {
        const response = await fetch(`${BASE_URL}/api/model/get-models?model_type=${type}` , {
          headers:{
            "Authorization":`Bearer ${token}`
          }
        });
        const data = await response.json();

        if (response.ok) {
          setModelsData(data); // Use the API response to set the models
        } else {
          throw new Error("Failed to load models.");
        }
      } catch (error) {
        toast({
          title: "Error",
          description: error.message || "Something went wrong while fetching models.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchModels();
  }, [type, toast]);

  // Update model parameters in Recoil state
  const handleSliderChange = (name, value) => {
    setSelectedModelParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(()=>{
    if(type==='chat'){
      setSelectedModel({
        
          "value": "openai:gpt-4-turbo",
          "label": "GPT 4 Turbo",
          "isPro": true,
          "description": "The previous set of high-intelligence models"
      
      })
    }else{
      setSelectedModel({
        "value": "imagegen:midjourney",
        "label": "Midjourney",
        "isPro": false,
        "description": "Mid Journey images"
    })
    }
  },[type])
  
  return (
    <Box
      p="6"
      borderRadius="lg"
      width="full"
      maxW="lg"
      height="auto"
      margin="auto"
      bg={theme.modelSelectionSelectBg}
      border={theme.modelSelectionBorder}
      css={{
        "&::-webkit-scrollbar": {
          width: "3px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: theme.textColor,
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#f1f1f1",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: theme.textColor,
        },
      }}
    >
      <FormControl mb="4">
        <FormLabel fontWeight="bold" fontSize="lg" color={theme.textColor}>
          Model
        </FormLabel>
        <SelectBox
          selectedOption={selectedModel}
          onChange={setSelectedModel} // Recoil state update for the model
          options={modelsData}
          placeholder="Select Model"
          bg={theme.modelSelectionSelectBg}
          borderColor={theme.modelSelectionSelectBorder}
          _hover={{ borderColor: theme.modelSelectionSelectBorder }}
          color={theme.textColor}
        />
      </FormControl>
{type ==='chat'&&(<>
  <VStack mt="4" spacing="4" align="stretch">
        <FormLabel fontWeight="bold" fontSize="lg" color={theme.textColor}>
          Parameters
        </FormLabel>

        {/* Output Length Slider */}
        <Box w="full">
          <Text mb="2" fontWeight="semibold" color={theme.textColor}>
            Output Length
          </Text>
          <Slider
            value={selectedModelParams.outputLength || 512} // Default value if not set
            min={1}
            max={1000}
            step={1}
            onChange={(val) => handleSliderChange("outputLength", val)}
          >
            <SliderTrack bg={theme.AiChatBoxInnerBoxbg} borderRadius="full">
              <SliderFilledTrack bg={theme.textColor} />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Text mt="2" fontSize="sm" textAlign="right" color={theme.textColor}>
            {selectedModelParams.outputLength || 512}
          </Text>
        </Box>

        {/* Temperature Slider */}
        <Box w="full">
          <Text mb="2" fontWeight="semibold" color={theme.textColor}>
            Temperature
          </Text>
          <Slider
            value={selectedModelParams.temperature || 0.7}
            min={0}
            max={1}
            step={0.1}
            onChange={(val) => handleSliderChange("temperature", val)}
          >
            <SliderTrack bg={theme.AiChatBoxInnerBoxbg} borderRadius="full">
              <SliderFilledTrack bg={theme.textColor} />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Text mt="2" fontSize="sm" textAlign="right" color={theme.textColor}>
            {selectedModelParams.temperature || 0.7}
          </Text>
        </Box>

        {/* Top-P Slider */}
        <Box w="full">
          <Text mb="2" fontWeight="semibold" color={theme.textColor}>
            Top-P
          </Text>
          <Slider
            value={selectedModelParams.topP || 0.7}
            min={0}
            max={1}
            step={0.1}
            onChange={(val) => handleSliderChange("topP", val)}
          >
            <SliderTrack bg={theme.AiChatBoxInnerBoxbg} borderRadius="full">
              <SliderFilledTrack bg={theme.textColor} />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Text mt="2" fontSize="sm" textAlign="right" color={theme.textColor}>
            {selectedModelParams.topP || 0.7}
          </Text>
        </Box>

        {/* Top-K Slider */}
        <Box w="full">
          <Text mb="2" fontWeight="semibold" color={theme.textColor}>
            Top-K
          </Text>
          <Slider
            value={selectedModelParams.topK || 50}
            min={0}
            max={100}
            step={1}
            onChange={(val) => handleSliderChange("topK", val)}
          >
            <SliderTrack bg={theme.AiChatBoxInnerBoxbg} borderRadius="full">
              <SliderFilledTrack bg={theme.textColor} />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Text mt="2" fontSize="sm" textAlign="right" color={theme.textColor}>
            {selectedModelParams.topK || 50}
          </Text>
        </Box>
      </VStack>


</>)}
      
    </Box>
  );
};

export default ModelSelection;
