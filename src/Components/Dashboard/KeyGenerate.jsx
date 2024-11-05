import {
  Box,
  Button,
  Flex,
  IconButton,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  Divider,
  useClipboard,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaClipboard, FaRegDotCircle } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { primaryColorOrange, primaryColorPurple } from "../../colorCodes";
import { useTheme } from "../../Themes/ThemeContext";
import { BASE_URL } from "../../Constants";
import { useRecoilValue } from "recoil";
import userState from "../../atoms/userState";
import { useNavigate } from "react-router-dom";

const KeyGenerate = () => {
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { hasCopied, onCopy } = useClipboard(apiKey);
  const { theme } = useTheme();
  const userContext = useRecoilValue(userState);
  const navigate = useNavigate();

  const handleCreateApiKey = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("Authorization token is missing.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/auth/generate-api-key`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.status === 403) {
        navigate("/auth");
      }
      if (response.ok) {
        console.log("API Key generated successfully:", data);
        localStorage.setItem("apiKey", data.apiKey);
        setApiKey(data.apiKey);
      } else {
        console.error("Failed to generate API key:", data);
      }
    } catch (error) {
      console.error("Error generating API key:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setApiKey(userContext?.apiKey);
  }, [userContext]);

  return (
    <Box
      mt={6}
      p={{ base: 4, md: 6 }}
      boxShadow="lg"
      backdropFilter={"saturate(190%) blur(20px)"}
      border={theme.keyGenerateBorder}
      borderRadius="md"
      width="100%"
      maxW="800px"
      mx="auto"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" color={theme.textColor}>
          Your API Keys
        </Text>
        <Button
          bg={primaryColorPurple}
          textColor="white"
          leftIcon={<FaPlus />}
          size={{ base: "sm", md: "md" }}
          _hover={{
            backgroundColor: primaryColorOrange,
            color: "white",
          }}
          onClick={handleCreateApiKey}
          isLoading={isLoading}
          mt={{ base: 3, md: 0 }}
        >
          Create API Key
        </Button>
      </Flex>

      <Divider my={4} borderColor={theme.integrationBoxDivider} />

      <Box overflowX="auto">
        <Table variant="unstyled" minWidth="100%">
          <Tbody>
            <Tr>
              <Td>
                <Flex alignItems="center">
                  <FaRegDotCircle color={primaryColorPurple} />
                  <Text ml={2} fontSize="md" color={theme.textColor}>
                    Active
                  </Text>
                </Flex>
              </Td>
              <Td fontSize={{ base: "sm", md: "md" }} color="gray.500">
                MODEL LEAP SECRET KEY
              </Td>
              <Td>
                <Flex alignItems="center">
                  <Text
                    isTruncated
                    maxW={{ base: "100px", md: "200px" }}
                    color="blue.600"
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    {apiKey}
                  </Text>
                  <IconButton
                    aria-label="Copy API Key"
                    bg={primaryColorPurple}
                    icon={<FaClipboard color="white" />}
                    size="sm"
                    ml={2}
                    _hover={{ bg: primaryColorOrange }}
                    onClick={onCopy}
                  />
                  {hasCopied && (
                    <Text fontSize="sm" color="green.500" ml={2}>
                      Copied!
                    </Text>
                  )}
                </Flex>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>

      <Divider my={4} borderColor={theme.integrationBoxDivider} />
    </Box>
  );
};

export default KeyGenerate;
