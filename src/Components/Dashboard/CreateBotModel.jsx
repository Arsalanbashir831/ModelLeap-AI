import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  RadioGroup,
  Radio,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useToast,
} from '@chakra-ui/react';

import ModelSelection from './ModelSelection'; // Assuming ModelSelection component exists
import { BASE_URL } from '../../Constants';
import { useRecoilValue } from 'recoil';
import modelState from '../../atoms/modelState';

const CreateBotModel = ({ isOpen, onClose, refresh, setRefresh }) => {
  const [botName, setBotName] = useState('');
  const [systemContext, setSystemContext] = useState('');
  const [modelType, setModelType] = useState('chat');
  const [avatar, setAvatar] = useState(null); // New state for avatar
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const selectedModel = useRecoilValue(modelState);

  const addAvatar = async (avatar, botId) => {
    try {
      const token = localStorage.getItem('authToken');
      const formData = new FormData();
      formData.append("avatarFile", avatar);

      const response = await fetch(`${BASE_URL}/api/bot/add-avatar/${botId}`, {
        method: "POST",
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`
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

  const handleSubmit = async () => {
    setLoading(true);
    const botData = {
      botName,
      systemContext,
      modelName: selectedModel.value,
    };
    const token = localStorage.getItem('authToken');

    try {
      const response = await fetch(`${BASE_URL}/api/bot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(botData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Bot Created:', data);

      // Call addAvatar if an image was selected
      if (avatar) {
        await addAvatar(avatar, data.botId);
      }

      toast({
        title: 'Bot Created Successfully!',
        description: `Bot "${botName}" has been created.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setRefresh(!refresh);
      onClose();
    } catch (error) {
      console.error('Error creating bot:', error);

      toast({
        title: 'Error Creating Bot',
        description: error.message || 'Something went wrong.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Bot Model</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Bot Name</FormLabel>
            <Input
              placeholder="Enter bot name"
              value={botName}
              onChange={(e) => setBotName(e.target.value)}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>System Context</FormLabel>
            <Textarea
              placeholder="Describe the system context"
              value={systemContext}
              onChange={(e) => setSystemContext(e.target.value)}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Choose Model Type</FormLabel>
            <RadioGroup onChange={setModelType} value={modelType}>
              <Radio value="chat" mr={4}>Chat</Radio>
              <Radio value="image">Image</Radio>
            </RadioGroup>
          </FormControl>

          <ModelSelection type={modelType} />

          {/* New Avatar Upload Field */}
          <FormControl mt={4}>
            <FormLabel>Upload Avatar</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatar(e.target.files[0])}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="purple" onClick={handleSubmit} isLoading={loading}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateBotModel;
