import React from 'react';
import { Box, Heading, Flex } from '@chakra-ui/react';
import NightModeToggleBtn from '../Custom/Mode/NightModeToggleBtn';
import { useTheme } from '../../Themes/ThemeContext';

const Header = ({ title }) => {
  const { theme } = useTheme();

  return (
    <Box
      as="header"
      w="100%"
      p="3"
      bg={'transparent'}
      boxShadow="none"
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Heading
          size="xl"
          color={theme.textColor}
          fontWeight="bold"
          fontFamily="'Lato', sans-serif"
        >
          {title}
        </Heading>


        <NightModeToggleBtn />
      </Flex>
    </Box>
  );
};

export default Header;
