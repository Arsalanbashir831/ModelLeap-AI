import React, { useState } from "react";
import {
  VStack,
  HStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Box,
  Input,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ModelSelection from "./ModelSelection"; // Import ModelSelection Component
import { useTheme } from "../../Themes/ThemeContext";

const SettingsModal = ({ isOpen, onClose }) => {
  const [model, setModel] = useState(null);
  const [outputLength, setOutputLength] = useState(512);
  const [temperature, setTemperature] = useState(0.7);
  const [topP, setTopP] = useState(0.7);
  const [topK, setTopK] = useState(50);
  const [modelType, setModelType] = useState("chat"); // New state for model type
  const { theme } = useTheme();

  const handleSave = () => {
    // Handle saving settings logic here
    console.log({
      model,
      outputLength,
      temperature,
      topP,
      topK,
      modelType, // Model type will also be logged
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent bg={theme.background} color="white">
        <ModalHeader textColor={theme.textColor}>Model & Settings</ModalHeader>
        <ModalCloseButton color={"red"} />
        <ModalBody>
          <VStack spacing={4} align="start" w="full">
            {/* Radio Buttons for Model Type Selection */}
            <Box w="full">
              <Text fontSize="lg" fontWeight="bold" color={theme.textColor} mb={2}>
                Select Model Type
              </Text>
              <RadioGroup onChange={setModelType} color={theme.textColor} value={modelType}>
                <HStack spacing={5}>
                  <Radio value="chat"  colorScheme="orange">
                Chat Models
                  </Radio>
                  <Radio value="image" colorScheme="orange">
                    Image Models
                  </Radio>
                </HStack>
              </RadioGroup>
            </Box>

            {/* Model Selection and Parameters */}
            <ModelSelection
              type={modelType} // Pass the selected model type (chat or image)
              // model={model}
              // setModel={setModel}
              // outputLength={outputLength}
              // setOutputLength={setOutputLength}
              // temperature={temperature}
              // setTemperature={setTemperature}
              // topP={topP}
              // setTopP={setTopP}
              // topK={topK}
              // setTopK={setTopK}
            />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" colorScheme="red" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="green" onClick={handleSave}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SettingsModal;
