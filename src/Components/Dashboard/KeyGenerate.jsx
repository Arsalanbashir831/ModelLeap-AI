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
  useClipboard,
  Link,
  Divider,
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
  const userContext= useRecoilValue(userState)
const navigate = useNavigate()
// const {userData}=useUserData()
// console.log(userData?.apiKey);
  // Function to fetch the API key from the backend

  
  const handleCreateApiKey = async () => {
    setIsLoading(true); // Start loading state
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("Authorization token is missing.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/auth/generate-api-key`, {
        method: "POST", // Assuming it's a POST request
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.status===403|| response.status==='403') {
        navigate('/auth')
      }
      if (response.ok) {
        console.log("API Key generated successfully:", data);
        localStorage.setItem('apiKey' , data.apiKey)
        setApiKey(data.apiKey); // Assuming the API key is in data.apiKey
      } else {
        console.error("Failed to generate API key:", data);
      }
    } catch (error) {
      console.error("Error generating API key:", error);
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  useEffect(()=>{
      setApiKey(userContext?.apiKey)
  },[userContext])

  return (
    <>
      <Box
        mt={6}
        p={6}
        boxShadow="lg"
        backdropFilter={"saturate(190%) blur(20px)"}
        border={theme.keyGenerateBorder}
        borderRadius="md"
        width="100%"
        maxW="800px"
        mx="auto"
      >
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Text fontSize="xl" fontWeight="bold" color={theme.textColor}>
            Your API Keys
          </Text>
          <Button
            bg={primaryColorPurple}
            textColor={"white"}
            leftIcon={<FaPlus />}
            size="md"
            _hover={{
              backgroundColor: primaryColorOrange,
              color: "white",
            }}
            onClick={handleCreateApiKey}
            isLoading={isLoading} // Display a loading spinner when generating the API key
          >
            Create API Key
          </Button>
        </Flex>

        <Divider my={4} borderColor={theme.integrationBoxDivider} />

        <Box overflowX="auto">
          <Table variant="unstyled">
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
                <Td fontSize="md" color="gray.500">
                  MODEL LEAP SECRET KEY 
                </Td>
                <Td>
                  <Flex alignItems="center">
                    <Text isTruncated maxW="150px" color="blue.600">
                      {apiKey}
                    </Text>
                    <IconButton
                      aria-label="Copy API Key"
                      bg={primaryColorPurple}
                      icon={<FaClipboard color={"white"} />}
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
                {/* <Td textAlign="right">
                  <Button
                    size="sm"
                    bg={primaryColorPurple}
                    color="white"
                    _hover={{ bg: primaryColorOrange }}
                  >
                    Disable
                  </Button>
                </Td> */}
              </Tr>
            </Tbody>
          </Table>
        </Box>

        <Divider my={4} borderColor={theme.integrationBoxDivider} />

        {/* <Link
          href="#"
          color={primaryColorPurple}
          fontSize="md"
          textDecoration="underline"
        >
          Activate Subscription
        </Link> */}
      </Box>
    </>
  );
};

export default KeyGenerate;
