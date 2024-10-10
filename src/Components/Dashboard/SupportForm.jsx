import React from "react";
import {
  Box,
  Button,
  VStack,
  Input,
  Textarea,
  Text,
  Stack,
  useRadioGroup,
  useRadio,
  FormControl,
} from "@chakra-ui/react";
import { useTheme } from "../../Themes/ThemeContext"; 
import { primaryColorOrange, primaryColorPurple } from "../../colorCodes";


function CustomRadio(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Button
      as="label"
      {...checkbox}
      border="1px solid"
      borderColor={props.isChecked ? primaryColorPurple : primaryColorOrange}
      bg={props.isChecked ? primaryColorPurple : "transparent"}
      color={props.isChecked ? "white" : "gray.500"}
      _hover={{ bg: props.isChecked ? "purple.600" : "gray.100" }}
      _focus={{ boxShadow: "outline" }}
      px={4}
      py={2}
      borderRadius="md"
      cursor="pointer"
      fontWeight="semibold"
    >
      {props.children}
    </Button>
  );
}

const SupportForm = () => {
  const options = ["AI Video Generation", "AI Image Generation", "AI", "Design system", "Other"];
  
  const { theme } = useTheme();
  
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "interest",
    defaultValue: "UI/UX design",
    onChange: console.log,
  });

  const group = getRootProps();

  return (
    <Box
      w={{ base: "90%", md: "400px" }}
      bg={theme.supportFormBg} 
      color={theme.textColor}
      borderRadius="lg"
      boxShadow="lg"
      p={6}
      mx="auto"
      my={10}
      borderColor="gray.200"
      borderWidth="1px"
    >
      <Text fontWeight="bold" mb={2}>
        I'm interested in...
      </Text>
      <Stack direction="row" wrap="wrap" spacing={2} mb={4} {...group}>
        {options.map((value) => {
          const radio = getRadioProps({ value });
          return (
            <CustomRadio key={value} {...radio}>
              {value}
            </CustomRadio>
          );
        })}
      </Stack>

      <VStack spacing={4} align="stretch">
        <FormControl>
          <Input
            variant="flushed"
            placeholder="Your name"
            borderBottomColor="purple.500"
            _placeholder={{ color: theme.textColor }}
            color={theme.textColor}
          />
        </FormControl>

        <FormControl>
          <Input
            variant="flushed"
            placeholder="Your email"
            borderBottomColor="gray.400"
            _placeholder={{ color: theme.textColor }}
            color={theme.textColor}
          />
        </FormControl>

        <FormControl>
          <Textarea
            variant="flushed"
            placeholder="Your message"
            borderBottomColor="gray.400"
            _placeholder={{ color: theme.textColor }}
            color={theme.textColor}
          />
        </FormControl>

        <Button
          w="full"
          bg={primaryColorPurple}
          color="white"
          _hover={{ bg: primaryColorOrange }}
          leftIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path fill="currentColor" d="M2 21l21-9L2 3v7l15 2-15 2z" />
            </svg>
          }
        >
          Send Message
        </Button>
      </VStack>
    </Box>
  );
};

export default SupportForm;
