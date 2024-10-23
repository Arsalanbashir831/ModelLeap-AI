import React from 'react';
import { Box, Heading, Text, Code, IconButton, useClipboard, Flex } from '@chakra-ui/react';
import { FaCog, FaCopy } from 'react-icons/fa';
import { primaryColorOrange, primaryColorPurple } from '../../../colorCodes';

const SimpleIntegrationCard = () => {
  const codeString = `<iframe src="http://localhost:5000/api/bot/{botId}/chat/{chatId}/widget?apiKey={apikey}&modelName={modelName}"
    width={width}
    height={height}
    style="border:none; overflow:hidden"
    scrolling="no"
    frameborder="0"
    allowfullscreen="true">
  </iframe>`;

  const { hasCopied, onCopy } = useClipboard(codeString);

  return (
    <Box
      bg="#F2F4F8"
      backdropBlur={"10px"}
      borderRadius="30px"
      p={6}
      boxShadow="md"
      h="100%"
      textAlign="left"
      position="relative"
      border="1px solid #f0f0f0"
    >
      <Box color={primaryColorOrange} fontSize="2xl" mb={4}>
        <FaCog />
      </Box>
      <Heading size="md" mb={4}>
        Simple Integration
      </Heading>
      <Text fontSize="sm" color="gray.500" mb={4}>
        Simply change the endpoints in your existing setup, and you're ready to go.
      </Text>
      <Box
        bg="blackAlpha.900"
        color="green.200"
        fontFamily="monospace"
        p={4}
        borderRadius="md"
        overflowX="auto"
        position="relative"
      >
        <Code
          whiteSpace="pre-wrap"
          display="block"
          p={2}
          bg="transparent"
          color="green.200"
          fontSize="sm"
        >
          {codeString}
        </Code>

        <IconButton
          aria-label="Copy Code"
          icon={<FaCopy />}
          size="sm"
          position="absolute"
          top={2}
          right={2}
          colorScheme="teal"
          onClick={onCopy}
        />
        {hasCopied && (
          <Text fontSize="xs" color="green.400" position="absolute" top={12} right={4}>
            Copied!
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default SimpleIntegrationCard;
