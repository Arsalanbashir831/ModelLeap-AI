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
import React, { useState } from "react";
import { FaClipboard, FaRegDotCircle } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { primaryColorOrange, primaryColorPurple } from "../../colorCodes";
import { useTheme } from "../../Themes/ThemeContext";


const generateApiKey = () => {
  const characters =
    "ABCDEFGHIJKLMPQRSVWXYZadefghijklmnoqrstuvwxyz0123456789";
  let result = "";
  const length = 32;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const KeyGenerate = () => {
  const [apiKey, setApiKey] = useState("");
  const { hasCopied, onCopy } = useClipboard(apiKey);
  const handleCreateApiKey = () => {
    const newApiKey = generateApiKey();
    setApiKey(newApiKey);
  };


  const { theme } = useTheme();
  return (
    <>
      <Box
        mt={6}
        p={6}
        boxShadow="lg"
        border={theme.keyGenerateBorder}
        borderRadius="md"
        backdropFilter={theme.keyGenerateBg}
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
                  Today at 3:50 PM
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
                <Td textAlign="right">
                  <Button size="sm" bg={primaryColorPurple} color="white" _hover={{ bg: primaryColorOrange }}>
                    Disable
                  </Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>

        <Divider my={4} borderColor={theme.integrationBoxDivider} />

        <Link href="#" color={primaryColorPurple} fontSize="md" textDecoration="underline">
          Activate Subscription
        </Link>
      </Box>
    </>
  );
};

export default KeyGenerate;
