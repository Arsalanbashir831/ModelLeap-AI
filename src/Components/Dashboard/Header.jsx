import React from 'react';
import { Box, Heading, Flex, Button } from '@chakra-ui/react';
import NightModeToggleBtn from '../Custom/Mode/NightModeToggleBtn';
import { useTheme } from '../../Themes/ThemeContext';
import { primaryColorOrange } from '../../colorCodes';
import { useNavigate } from 'react-router-dom';

const Header = ({ title , isTitle , isGoBack=false }) => {
  const { theme } = useTheme();
const navigate = useNavigate()
  return (
    <Box
      as="header"
      w="100%"
      p="3"
      bg={'transparent'}
      boxShadow="none"
      px={5}
    >
 
    
      <Flex alignItems="center" justifyContent={isTitle ? "space-between":"flex-end"}>
     {isGoBack&&(<>
      <Button margin={5}
          bg={primaryColorOrange}
          color={"white"}
          onClick={() => navigate("/app/ailab")}
        >
          {" "}
          Back
        </Button>
     </>)}
     
       {isTitle&&(<>


        <Heading
          size="xl"
          color={theme.textColor}
          fontWeight="bold"
          fontFamily="'Lato', sans-serif"
        >
          {title}
        </Heading>
       </>)}
        


        <NightModeToggleBtn />
      </Flex>
    </Box>
  );
};

export default Header;
