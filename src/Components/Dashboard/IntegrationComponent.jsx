import React from 'react';
import {
  Box,
  Heading,
  Text,
  Flex,
  Icon,
  Code,
  VStack,
  theme,
} from '@chakra-ui/react';
import { primaryColorOrange, primaryColorPurple } from '../../colorCodes';
import { FaCog } from 'react-icons/fa';
import { useTheme } from '../../Themes/ThemeContext';


const IntegrationComponent = () => {

  const {theme} = useTheme();
  return (
    <Box
      bg={theme.integrationBoxBg}
      p={8}
      borderRadius="lg"
      border={theme.integrationBoxBorder}
      boxShadow="lg"
      maxW="600px"
      mx="auto"
      mt={10}
    >
      <Flex alignItems="center" mb={4}>
        <Icon as={FaCog} boxSize={6} color={primaryColorPurple} />
        <Heading size="md" ml={3} color={theme.textColor}>
          Simple Integration
        </Heading>
      </Flex>

      <Text color={theme.textColor} mb={6}>
        Simply change the endpoints in your existing setup, and you're ready to go.
      </Text>

      <Box
        bg="gray.900"
        color="green.300"
        borderRadius="md"
        p={4}
        fontFamily="monospace"
        whiteSpace="pre-wrap"
        overflowX="auto"
      >
        <Code w="100%" colorScheme="white" fontSize="sm">
{`client = OpenAI(
  api_key="YOUR_API_KEY",
  base_url="https://api.aimlapi.com",
)

response = client.chat.completions.create(
  model="mistralai/Mistral-7B-Instruct-v0.2",
  messages=[
    {
      "role": "system",
      "content": "You are an AI assistant who knows everything."
    },
    {
      "role": "user",
      "content": "Tell me, why is the sky blue?"
    },
  ],
)

message = response.choices[0].message.content
print(f"Assistant: {message}")
`}
        </Code>
      </Box>
    </Box>
  );
};

export default IntegrationComponent;
