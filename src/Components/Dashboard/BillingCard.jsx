import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Icon,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import { primaryColorOrange, primaryColorPurple } from '../../colorCodes';
import { useTheme } from '../../Themes/ThemeContext';


const BillingCard = ({ title, price, features, selected, onClick }) => {
  const { theme } = useTheme();
  return (
    <Box
      borderWidth={selected ? '3px' : '1px'}
      borderColor={selected ? primaryColorOrange : theme.billingCardBorder}
      borderRadius="lg"
      p={{ base: 4, md: 6 }}
      maxW={{ base: '100%', md: '300px' }} 
      textAlign="center"
      boxShadow={selected ? 'lg' : 'md'}
      position="relative"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      h="100%"
      backdropFilter={'saturate(180%) blur(20px)'}
      // backdropBlur={'white'}
      mx={{ base: 'auto', md: 0 }}
    >
      {selected && (
        <Box
          position="absolute"
          top={-3}
          left="50%"
          transform="translateX(-50%)"
          bg={primaryColorPurple}
          color="white"
          borderRadius="full"
          px={4}
          py={1}
          fontSize={{ base: 'xs', md: 'sm' }}
          fontWeight="bold"
        >
          Current plan
        </Box>
      )}

      <Flex direction="column" flex="1" justify="space-between">
        <Box mb={4}>
          <Heading
            as="h4"
            size="md"
            mb={2}
            color={theme.billingCardText}
            fontSize={{ base: 'lg', md: 'md' }}
          >
            {title}
          </Heading>
          <Heading
            as="h1"
            size="2xl"
            mb={4}
            color={theme.textColor}
            fontSize={{ base: '2xl', md: '2xl' }} 
          >
            {price}
          </Heading>
        </Box>

        <VStack
          spacing={5}
          alignItems="start"
          mb={6}
          fontSize={{ base: 'sm', md: 'md' }} 
        >
          {features.map((feature, index) => (
            <Flex key={index} align="center">
              <Icon as={FaCheckCircle} color="green.400" mr={2} />
              <Text color={theme.billingCardText}>{feature}</Text>
            </Flex>
          ))}
        </VStack>

        <Spacer />

        <Button
          onClick={onClick}
          bg={primaryColorPurple}
          size={{ base: 'sm', md: 'lg' }}
          color="white"
          _hover={{ bg: primaryColorOrange }}
          mt="auto"
          width="100%" 
          rightIcon={<Icon as={FaCheckCircle} />}
        >
        {/* {selected ? :'Cance'} */}
         Subscription
        </Button>
      </Flex>
    </Box>
  );
};

export default BillingCard;
