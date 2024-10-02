import React from 'react';
import { Box, Text, Link } from '@chakra-ui/react';

const Footnote = () => {
  return (
    <Box
      as="footer"
      w="100%"
      textAlign="center"
      py={4}
      px={12}
      bg="gray.50"
      borderTop="1px solid"
      borderColor="gray.200"
    >
      <Text fontSize="sm" color="gray.500">
        Developed and Powered by: DotCode <Link href="https://model-leap-ai-vercel.vercel.app/" color="gray" isExternal>model-leap-ai.com</Link> are subject to our{' '}
        <Link href="#" color="gray.500" isExternal>Terms of Service</Link> and{' '}
        <Link href="#" color="gray.500" isExternal>Privacy Policy</Link>. By using our services, you agree to these terms, which may change at our
        discretion. Continued use indicates acceptance of any modifications. We provide services "as is" with no warranties. For inquiries, contact{' '}
        <Link href="#" color="gray.500">hello@modelleapai.com</Link>.
      </Text>
    </Box>
  );
};

export default Footnote;
