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
  Image,
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
    botId: botDetails.id,
  });
  const [avatar, setAvatar] = useState(botDetails.avatarFile || null); // State for current avatar display
  const [newAvatar, setNewAvatar] = useState(null); // State for new avatar upload
  const [modelsData, setModelsData] = useState([]);
  const [loadingModels, setLoadingModels] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchModels = async () => {
      const token = localStorage.getItem("authToken");
      setLoadingModels(true);
      try {
        const response = await fetch(
          `${BASE_URL}/api/model/get-models?model_type=${formData.modelType}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();

        if (response.ok) {
          setModelsData(data);
        } else {
          console.log("Failed to load models");
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
        setLoadingModels(false);
      }
    };

    fetchModels();
  }, [formData.modelType, toast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleModelTypeChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      modelType: value,
      modelName: "",
    }));
  };

  const handleModelSelectionChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      modelName: e.target.value,
    }));
  };

  const handleAvatarChange = (e) => {
    setNewAvatar(e.target.files[0]);
  };

  const handleSave = async () => {
    if (!formData.botName || !formData.systemContext || !formData.modelName) {
      toast({
        title: "All fields are required.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      if (newAvatar) {
        await addAvatar(newAvatar, botDetails.id); // Upload new avatar if selected
      }

      onSave(formData); // Pass updated form data to the onSave function
      onClose(); // Close modal after saving
    } catch (error) {
      console.error("Error updating avatar:", error);
      toast({
        title: "Error updating avatar",
        description: error.message || "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const addAvatar = async (avatar, botId) => {
    try {
      const token = localStorage.getItem("authToken");
      const formData = new FormData();
      formData.append("avatarFile", avatar);

      const response = await fetch(`${BASE_URL}/api/bot/add-avatar/${botId}`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to upload avatar: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("Avatar upload success:", data);
      return data;
    } catch (error) {
      console.error("Error uploading avatar:", error);
      throw error;
    }
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

          {/* Display current avatar */}
          {avatar && (
            <FormControl mb={4}>
              <FormLabel>Current Avatar</FormLabel>
              <Image src={avatar} alt="Current avatar" borderRadius="md" boxSize="100px" />
            </FormControl>
          )}

          {/* Avatar upload field */}
          <FormControl mb={4}>
            <FormLabel>Upload New Avatar</FormLabel>
            <Input type="file" accept="image/*" onChange={handleAvatarChange} />
          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel>Model Type</FormLabel>
            <RadioGroup onChange={handleModelTypeChange} value={formData.modelType}>
              <Stack direction="row" spacing={5}>
                <Radio value="chat">Chat</Radio>
                <Radio value="image">Image</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel>Select Model</FormLabel>
            <Select
              placeholder={loadingModels ? "Loading models..." : "Select a model"}
              value={formData.modelName}
              onChange={handleModelSelectionChange}
              disabled={loadingModels}
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
