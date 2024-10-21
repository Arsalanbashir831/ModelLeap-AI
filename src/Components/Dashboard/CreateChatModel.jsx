import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';

const CreateChatModel = ({ isOpen, onClose, onSave }) => {
  const [chatTitle, setChatTitle] = useState(''); 
  const toast = useToast();



  const handleSave = () => {
    if (chatTitle.trim() === '') {
      toast({
        title: 'Error',
        description: 'Chat title is required.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    // Call the onSave function passed via props with the new chat title
    onSave(chatTitle);

    toast({
      title: 'Success',
      description: `Chat "${chatTitle}" created successfully.`,
      status: 'success',
      duration: 2000,
      isClosable: true,
    });

    setChatTitle(''); // Clear the input field after saving
    onClose(); // Close the modal
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Chat</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Chat Title</FormLabel>
            <Input
              placeholder="Enter chat title"
              value={chatTitle}
              onChange={(e) => setChatTitle(e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateChatModel;
