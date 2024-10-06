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
import { primaryColorOrange, primaryColorPurple } from "../../colorCodes";
import { useTheme } from "../../Themes/ThemeContext";


const PasswordChange = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const {theme} = useTheme();
  const toggleShowOldPassword = () => setShowOldPassword(!showOldPassword);
  const toggleShowNewPassword = () => setShowNewPassword(!showNewPassword);

  return (
    <Flex justify="center" align="center">
      <Box
        bg={theme.passwordChangeBoxBg}
        p={8}
        backdropFilter={"saturate(190%) blur(20px)"}
        rounded="lg"
        border={theme.passwordChangeBoxBorder}
        shadow="lg"
        maxW="600px"
        w="100%"
        mx="auto"
      >
        <FormControl id="old-password" mb={4}>
          <FormLabel fontWeight="bold" color={theme.textColor}>
            Old password
          </FormLabel>
          <InputGroup>
            <InputRightElement>
              <Icon as={FaLock} color={primaryColorPurple} />
            </InputRightElement>
            <Input
              type={showOldPassword ? "text" : "password"}
              placeholder="Enter your old password"
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                mr={2}
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
          <FormLabel fontWeight="bold" color={theme.textColor}>
            New password
          </FormLabel>
          <InputGroup>
            <InputRightElement>
              <Icon as={FaLock} color={primaryColorPurple} />
            </InputRightElement>
            <Input
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter your new password"
            />
            <InputRightElement width="4.5rem">
              <Button
                mr={2}
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

        <Button
          bg={primaryColorPurple}
          textColor={"white"}
          w="100%"
          mt={4}
          _hover={{
            backgroundColor: primaryColorOrange,
            color: "white",
          }}
        >
          Save Changes
        </Button>
      </Box>
    </Flex>
  );
};

export default PasswordChange;
