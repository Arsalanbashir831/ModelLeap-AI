import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  RadioGroup,
  Radio,
  Stack,
  Select,
  useToast,
} from "@chakra-ui/react";
import { BASE_URL } from "../../Constants";


const EditBotModal = ({ isOpen, onClose, botDetails, onSave }) => {
  const [formData, setFormData] = useState({
    botName: botDetails.botName || "",
    systemContext: botDetails.systemContext || "",
    modelName: botDetails.modelName || "",
    modelType: botDetails.modelName.startsWith("imagegen:") || botDetails.modelName.startsWith('dalle:') ? "image" :'chat', 
    kwargs: botDetails.kwargs || {},
  });


console.log("Model Name",botDetails.modelName);

  const [modelsData, setModelsData] = useState([]); // Store fetched models
  const [loadingModels, setLoadingModels] = useState(false); // Handle loading state
 
  const toast = useToast();


  // Fetch models based on the selected model type
  useEffect(() => {
    const fetchModels = async () => {
      const token = localStorage.getItem('authToken');
      setLoadingModels(true); // Start loading
      try {
        const response = await fetch(
          `${BASE_URL}/api/model/get-models?model_type=${formData.modelType}`,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();

        if (response.ok) {
          setModelsData(data); // Use the API response to set the models
        } else {
          // throw new Error("Failed to load models.");
          console.log('model load fail');
        }
      } catch (error) {
        toast({
          title: "Error",
          description: error.message || "Something went wrong while fetching models.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoadingModels(false); // Stop loading
      }
    };
// console.log(formData.modelName);


    fetchModels();
  }, [formData.modelType, toast]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle model type change for radio buttons
  const handleModelTypeChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      modelType: value,
      modelName: "", // Reset model name when type changes
    }));
  };

  // Handle model selection change
  const handleModelSelectionChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      modelName: e.target.value,
    }));
  };

  const handleSave = () => {
    if (!formData.botName || !formData.systemContext || !formData.modelName) {
      toast({
        title: "All fields are required.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    onSave(formData); // Pass formData to save function
    onClose(); // Close the modal after saving
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Bot Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl mb={4} isRequired>
            <FormLabel>Bot Name</FormLabel>
            <Input
              name="botName"
              value={formData.botName}
              onChange={handleInputChange}
              placeholder="Enter bot name"
            />
          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel>System Context</FormLabel>
            <Textarea
              name="systemContext"
              value={formData.systemContext}
              onChange={handleInputChange}
              placeholder="Enter system context"
            />
          </FormControl>

          {/* Model Type Selection: Chat or Image */}
          <FormControl mb={4} isRequired>
            <FormLabel>Model Type</FormLabel>
            <RadioGroup
              onChange={handleModelTypeChange}
              value={formData.modelType}
            >
              <Stack direction="row" spacing={5}>
                <Radio value="chat">Chat</Radio>
                <Radio value="image">Image</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
{/* {console.log(formData.modelName)} */}
          {/* Model Selection Dropdown */}
          <FormControl mb={4} isRequired>
            <FormLabel>Select Model</FormLabel>
            <Select
              placeholder={loadingModels ? "Loading models..." : "Select a model"}
              value={formData.modelName}
              onChange={handleModelSelectionChange}
              disabled={loadingModels} // Disable while loading
            >
              {modelsData.map((category) => (
                <optgroup key={category.label} label={category.label}>
                  {category.options.map((model) => (
                    <option key={model.value} value={model.value}>
                      {model.value} - {model.description}
                    </option>
                  ))}
                </optgroup>
              ))}
            </Select>
          </FormControl>

        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditBotModal;
