import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
  Textarea,
  Button,
  Checkbox,
  useDisclosure,
  IconButton,
  Collapse,
  Box,
} from "@chakra-ui/react";
import { FaCogs } from "react-icons/fa";
import { useTheme } from "../../Themes/ThemeContext";

const ContextModal = ({ isOpen, onClose, onSave }) => {
  const { theme } = useTheme();
  const [context, setContext] = useState("You are a helpful assistant.");
  const [showExamples, setShowExamples] = useState(false);
//   const [stopSequence, setStopSequence] = useState(false);

  const handleSave = () => {
    onSave(context);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={theme.background}>
        <ModalHeader color={theme.textColor}>Context</ModalHeader>
        <ModalBody>
          <Text fontSize="sm" color={theme.textColor} mb={2}>
            You can give the AI an initial context for your chat, which will change how it behaves during the conversation. You can edit this later.
          </Text>

          <Button
            onClick={() => setShowExamples(!showExamples)}
            size="sm"
            mb={3}
            colorScheme="teal"
            variant="outline"
          >
            Context Examples
          </Button>
          <Collapse in={showExamples}>
            <Box p={3} bg="gray.700" borderRadius="md" mb={3}>
              <Text fontSize="sm" color="gray.300">
                - You are a helpful, pattern-following assistant that translates languages.
              </Text>
              <Text fontSize="sm" color="gray.300">
                - You are a kindergarten teacher, and I'm a child. Explain everything in simple terms.
              </Text>
              <Text fontSize="sm" color="gray.300">
                - You are an employee in a video store, and I'm the customer.
              </Text>
            </Box>
          </Collapse>

          <Textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Enter the initial context for your AI chat..."
            color={theme.textColor}
            bg={theme.AiChatbg}
            borderColor="gray.600"
          />

          {/* <Checkbox
            isChecked={stopSequence}
            onChange={() => setStopSequence(!stopSequence)}
            mt={4}
            colorScheme="green"
            color={theme.textColor}
          >
            Add stop sequence
          </Checkbox> */}
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose} variant="ghost">
            Close
          </Button>
          <Button onClick={handleSave} colorScheme="teal" ml={3}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ContextModal;
