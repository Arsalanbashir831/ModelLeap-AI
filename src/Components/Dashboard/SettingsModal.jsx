import React from "react";
import {
  VStack,
  HStack,
  Button,
  RadioGroup,
  Radio,
  Link,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
} from "@chakra-ui/react";

const SettingsModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="#24303f" color="white">
        <ModalHeader>Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="start">
            {/* Radio Buttons for Model Selection */}
            <RadioGroup defaultValue="OpenAI">
              <HStack spacing={4}>
                <Radio value="OpenAI">OpenAI</Radio>
                <Radio value="Mistral">Mistral</Radio>
                <Radio value="Meta">Meta</Radio>
              </HStack>
            </RadioGroup>

            {/* API Key Input Field */}
            <Text fontSize="sm" color="gray.300">
              OpenAI API key
            </Text>
            <Input
              placeholder="Enter your API key"
              bg="pink"
              _placeholder={{ color: "gray.500" }}
              focusBorderColor="pink.400"
            />

            {/* Link to get API Key */}
            <Link href="https://your-api-link.com" isExternal color="teal.400">
              Get yours
            </Link>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="green" onClick={onClose}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SettingsModal;
