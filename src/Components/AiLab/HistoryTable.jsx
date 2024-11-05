import React, { useState } from "react";
import {
  Box,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Image,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useTheme } from "../../Themes/ThemeContext";
import { FaEye } from "react-icons/fa";

export const HistoryTable = ({ selectedChat, chatHistory }) => {
  const { theme } = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [previewContent, setPreviewContent] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate pagination indices
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = chatHistory.slice(indexOfFirstItem, indexOfLastItem);

  // Handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to handle preview
  const handlePreview = (content) => {
    setPreviewContent(content);
    onOpen();
  };

  // Handle case where there's no chat history
  if (!selectedChat || chatHistory.length === 0) {
    return <Box>No chat history available for this selection</Box>;
  }

  return (
    <>
      {/* Wrap table in a scrollable container */}
      <Box overflowX="auto" borderRadius="lg" boxShadow="lg" mb={4} width="300px">
        <Table
          variant="simple"
          size="md"
          bg={theme.AiChatbg}
          color={theme.textColor}
          minWidth="600px"
        >
          <Thead
            bg={theme.background}
            boxShadow="sm"
            borderBottom={`2px solid ${theme.iconColor}`}
          >
            <Tr>
              <Th color={theme.textColor} fontSize="md">
                Message
              </Th>
              <Th color={theme.textColor} fontSize="md">
                Sender
              </Th>
              <Th color={theme.textColor} fontSize="md">
                Timestamp
              </Th>
              <Th color={theme.textColor} fontSize="md">
                Preview
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentItems?.map((message, index) => (
              <Tr
                key={message.id || index}
                _hover={{ bg: "none" }}
                transition="background-color 0.3s ease"
              >
                <Td maxWidth="200px" isTruncated>
                  {message?.content ? (
                    message?.content?.startsWith("https://") ? (
                      <Image
                        src={message.content}
                        alt="Generated Image"
                        maxWidth="150px"
                        borderRadius="md"
                        border={`2px solid ${theme.iconColor}`}
                      />
                    ) : (
                      message.content
                    )
                  ) : (
                    "No content available"
                  )}
                </Td>

                <Td fontWeight="bold" color={theme.textColor}>
                  {message.from === "You" ? "User" : "AI"}
                </Td>
                <Td color={theme.textColor}>{message.time}</Td>
                <Td>
                  <IconButton
                    colorScheme="orange"
                    icon={<FaEye />}
                    size="sm"
                    onClick={() => handlePreview(message.content)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Modal for Preview */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent bg={theme.background}>
          <ModalHeader color={theme.textColor}>Preview</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {previewContent.startsWith("https://") ? (
              <Image
                src={previewContent}
                alt="Preview Image"
                width="100%"
                borderRadius="md"
              />
            ) : (
              <Text color={theme.textColor} whiteSpace="pre-wrap">
                {previewContent}
              </Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Pagination Controls */}
      <Flex justifyContent="center" alignItems="center" mt={4}>
        <IconButton
          aria-label="Previous Page"
          icon={<ChevronLeftIcon />}
          isDisabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
          colorScheme="orange"
          variant="outline"
          mx={2}
        />
        <Box color={theme.textColor} mx={2}>
          Page {currentPage}
        </Box>
        <IconButton
          aria-label="Next Page"
          icon={<ChevronRightIcon />}
          isDisabled={indexOfLastItem >= chatHistory.length}
          onClick={() => paginate(currentPage + 1)}
          colorScheme="orange"
          variant="outline"
          mx={2}
        />
      </Flex>
    </>
  );
};
