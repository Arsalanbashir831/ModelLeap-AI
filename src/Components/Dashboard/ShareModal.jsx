import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Textarea,
  Code,
  useDisclosure,
} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import BotState from "../../atoms/BotState";
import { BASE_URL } from "../../Constants";

const ShareModal = ({ isOpen, onClose ,botData }) => {
  const [tabIndex, setTabIndex] = useState(0); // To manage tab selection
//   const botData = useRecoilValue(BotState);
  const [htmlSnippet, setHtmlSnippet] = useState("");
  const [genCode, setGenCode] = useState("");

  // Array of supported languages
  const languages = [
    { lang: "js", label: "JavaScript" },
    { lang: "php", label: "PHP" },
    { lang: "python", label: "Python" },
    { lang: "curl", label: "cURL" },
  ];

  const fetchHtmlSnippet = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/bot/${botData.botId}/embed`,
        {
          headers: {
            "x-api-key": botData.apiKey,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setHtmlSnippet(data.embedCode);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAPIKit = async (language) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/bot/${botData.botId}/code-snippet/${language}`,
        {
          headers: {
            "x-api-key": botData.apiKey,
          },
        }
      );

      if (response.ok) {
        const data = await response.text();

        const formattedCode = typeof data === "string" ? data : data.toString();

        setGenCode(formattedCode);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHtmlSnippet();
    fetchAPIKit(languages[tabIndex].lang);
  }, [tabIndex , botData]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Share Chatbot Integration</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* HTML Snippet Section */}
          <Box mb={4}>
            <Box fontWeight="bold" mb={2}>
              HTML Snippet
            </Box>
            <Textarea readOnly value={htmlSnippet} size="sm" bg="gray.100" />
          </Box>

          {/* Dynamic Tabbed Language Options */}
          <Tabs
            isFitted
            variant="enclosed"
            index={tabIndex}
            onChange={setTabIndex}
          >
            <TabList>
              {languages.map((language, index) => (
                <Tab key={index}>{language.label}</Tab>
              ))}
            </TabList>

            <TabPanels>
              {languages.map((language, index) => (
                <TabPanel key={index}>
                  <Box>
                    <Code
                      p={3}
                      bg="gray.100"
                      display="block"
                      whiteSpace="pre-wrap"
                    >
                      {genCode || `Loading ${language.label} code...`}
                    </Code>
                  </Box>
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ShareModal;
