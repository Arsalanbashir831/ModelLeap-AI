import React from 'react';
import { 
  Menu, 
  MenuButton, 
  MenuList, 
  MenuItem, 
  Button, 
  Badge, 
  Flex, 
  Text, 
  Box, 
  Tooltip 
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useTheme } from '../../Themes/ThemeContext';
import { primaryColorOrange } from '../../colorCodes';

const SelectBox = ({
  selectedOption,
  onChange,
  options,
  placeholder,
  size = 'lg',
  bgColor = 'gray.800',
  borderColor = 'gray.600',
  textColor = 'white',
  badgeBg = 'linear-gradient(90deg, #00C9FF, #92FE9D)',
}) => {
  const { theme } = useTheme();

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            bg={theme.background}
            borderColor={borderColor}
            size={size}
            color={isOpen ? 'black' : theme?.textColor}
            borderWidth="2px"
            width="100%"
            textAlign="start"
            fontSize={16}
            fontWeight="medium"
            _hover={{
              color: theme.textColor,
              bg: theme.background,
              borderColor: 'blue.400',
              transform: 'scale(1.02)',
              background: theme.background,
            }}
            _focus={{
              borderColor: 'blue.400',
              boxShadow: '0 0 0 2px blue.200',
            }}
            transition="all 0.3s ease-in-out"
            borderRadius="lg"
            boxShadow="md"
            p={4}
          >
            <Flex gap={4} >
              {selectedOption?.label || placeholder}
              {selectedOption?.isPro && (
                <Badge
                  ml="auto"
                  bg={badgeBg}
                  color="white"
                  borderRadius="md"
                  px="2"
                  py="1"
                  fontSize="xs"
                >
                  PRO
                </Badge>
              )}
            </Flex>
          </MenuButton>

          <MenuList
            css={{
              '&::-webkit-scrollbar': {
                width: '2px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: primaryColorOrange,
                borderRadius: '10px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: '#f1f1f1',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: primaryColorOrange,
              },
            }}
            height={250}
            overflowY="scroll"
            zIndex={10}
            bg={theme.background}
            borderColor={borderColor}
            borderRadius="lg"
            boxShadow="lg"
            p={2}
          >
            {options?.map((group) => (
              <Box key={group.label} my={2}>
                <Text
                  ml={3}
                  fontWeight="bolder"
                  color={theme.textColor}
                  fontSize="sm"
                  letterSpacing="wide"
                >
                  {group.label} Models
                </Text>
                {group.options.map((option) => (
                  <Tooltip
                    key={option?.value}
                    label={option.isLocked ? 'Available on Pro plans' : ''}
                    placement="top"
                    hasArrow
                    isDisabled={!option.isLocked} // Tooltip only for locked items
                  >
                    <MenuItem
                      onClick={() => !option.isLocked && onChange(option)} // Only allow clicking unlocked options
                      isDisabled={option.isLocked} // Disable locked options
                      bg="transparent"
                      marginTop={3}
                      borderRadius="md"
                      p={3}
                      _hover={
                        !option.isLocked
                          ? { bg: 'gray.100', transform: 'scale(1.01)' }
                          : {}
                      }
                      _focus={{ bg: 'gray.100' }}
                      transition="all 0.2s ease-in-out"
                    >
                      <Flex align="center" justify="space-between" width="100%">
                        <Text
                          color={option.isLocked ? 'gray.500' : theme.textColor}
                          fontSize="sm"
                          fontWeight="normal"
                        >
                          {option.label}
                        </Text>
                        {option.isPro && (
                          <Badge
                            ml="auto"
                            bg={badgeBg}
                            color="white"
                            borderRadius="md"
                            px="2"
                            py="1"
                            fontSize="xs"
                          >
                            PRO
                          </Badge>
                        )}
                      </Flex>
                    </MenuItem>
                  </Tooltip>
                ))}
              </Box>
            ))}
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default SelectBox;
