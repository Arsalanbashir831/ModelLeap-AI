import React, { useState } from 'react';
import { Box, Button, HStack } from '@chakra-ui/react';

const MenuTabs = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('Chat');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab); 
    }
  };

  return (
    <HStack spacing="4" mt="4">
      {['Chat', 'Code', 'Language', 'Image'].map((tab) => (
        <Button
          key={tab}
          onClick={() => handleTabClick(tab)}
          variant={activeTab === tab ? 'solid' : 'outline'}
          colorScheme={activeTab === tab ? 'blackAlpha' : 'gray'}
          bg={activeTab === tab ? 'black' : 'white'}
          color={activeTab === tab ? 'white' : 'black'}
          borderRadius="md"
        >
          {tab}
        </Button>
      ))}
    </HStack>
  );
};

export default MenuTabs;