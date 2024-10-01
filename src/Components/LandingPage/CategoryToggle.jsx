import React from 'react';
import { Button, Wrap, WrapItem } from '@chakra-ui/react';
import { primaryColorOrange } from '../../colorCodes'; // Import primary color

const CategoryToggle = ({ categories, selectedCategory, onSelect }) => (
  <Wrap spacing={4} mb={4} justify="center">
    {categories.map((category, index) => (
      <WrapItem key={index}>
        <Button
          variant="outline"
          borderRadius="full"
          w={{ base: '100%', sm: 'auto' }}
          onClick={() => onSelect(category)}
          bg={selectedCategory === category ? primaryColorOrange : 'white'}
          borderColor="gray.200"
          color={selectedCategory === category ? 'white' : 'black'}
          _hover={{
            bg: selectedCategory === category ? primaryColorOrange : 'gray.100',
          }}
        >
          {category}
        </Button>
      </WrapItem>
    ))}
  </Wrap>
);

export default CategoryToggle;
