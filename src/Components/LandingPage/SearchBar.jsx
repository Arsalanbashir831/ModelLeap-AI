import React from 'react';
import { InputGroup, InputLeftElement, Input, Icon } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { primaryColorOrange } from '../../colorCodes';

const SearchBar = ({ value, onChange }) => (
  <InputGroup mb={4}>
    <InputLeftElement pointerEvents="none">
      <Icon as={SearchIcon} color="gray.400" />
    </InputLeftElement>
    <Input
      value={value}
      onChange={onChange}
      placeholder="Search"
      bg="white"
      borderRadius="full"
      shadow="sm"
      w="100%"
      focusBorderColor={primaryColorOrange}
    />
  </InputGroup>
);

export default SearchBar;
