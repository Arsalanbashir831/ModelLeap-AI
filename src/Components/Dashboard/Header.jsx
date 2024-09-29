import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

const Header = ({ title }) => {
  return (
    <Box
      as="header"
      w="100%"
      p="4"
      bg="transparent" 
      boxShadow="none" 
    >
      <Heading size="xl" fontWeight="bold" fontFamily="'Lato', sans-serif">
        {title}
      </Heading>
    </Box>
  );
};

export default Header;