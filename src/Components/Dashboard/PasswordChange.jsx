import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

const PasswordChange = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const toggleShowOldPassword = () => setShowOldPassword(!showOldPassword);
  const toggleShowNewPassword = () => setShowNewPassword(!showNewPassword);

  return (
    <Flex justify="center" align="center">
      <Box
      bg={"white"}
        p={8}
        rounded="lg"
        shadow="lg"
        maxW="600px"
        w="100%"
        mx="auto"
      >
        <FormControl id="old-password" mb={4}>
          <FormLabel fontWeight="bold" color="gray.700">
            Old password
          </FormLabel>
          <InputGroup>
            <InputRightElement>
              <Icon as={FaLock} color="gray.400" />
            </InputRightElement>
            <Input
              type={showOldPassword ? "text" : "password"}
              placeholder="Enter your old password"
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={toggleShowOldPassword}
                variant="ghost"
              >
                {showOldPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="new-password" mb={6}>
          <FormLabel fontWeight="bold" color="gray.700">
            New password
          </FormLabel>
          <InputGroup>
            <InputRightElement>
              <Icon as={FaLock} color="gray.400" />
            </InputRightElement>
            <Input
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter your new password"
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={toggleShowNewPassword}
                variant="ghost"
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>


        <Button colorScheme="blue" w="100%" mt={4}>
          Save Changes
        </Button>
      </Box>
    </Flex>
  );
};

export default PasswordChange;
