import React, { useState } from 'react';
import { Box, Button, HStack } from '@chakra-ui/react';
import { primaryColorOrange, primaryColorPurple } from '../../colorCodes';

const MenuTabs = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('Chat');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab); 
    }
  };

  return (
    <HStack
      spacing={["2", "4"]}
      mt="4"
      flexWrap={["wrap", "nowrap"]}
      justify={["center", "start"]}
    >
      {['Chat', 'Code', 'Language', 'Image'].map((tab) => (
        <Button
          key={tab}
          onClick={() => handleTabClick(tab)}
          border={'none'}
          variant={activeTab === tab ? 'solid' : 'outline'}
          colorScheme={activeTab === tab ? "black" : "white"}
          bg={activeTab === tab ? primaryColorOrange : 'white'}
          color={activeTab === tab ? 'white' : 'black'}
          borderRadius="full"
          boxShadow={'lg'}

          w={["full", "auto"]}
          mb={["2", "0"]}
        >
          {tab}
        </Button>
      ))}
    </HStack>
  );
};

export default MenuTabs;
