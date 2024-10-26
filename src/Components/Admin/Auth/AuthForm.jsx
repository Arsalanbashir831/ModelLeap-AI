import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  VStack,
  InputGroup,
  InputRightElement,
  IconButton,
  Divider,
  Text,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { primaryColorPurple, primaryColorOrange } from "../../../colorCodes";
import { Link, useNavigate } from "react-router-dom";

const AdminAuthForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputBg = "gray.50";
  const navigate = useNavigate();
  const toast = useToast();

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = async () => {
    navigate("/admin/dashboard");
  };

  return (
    <Box
      p={{ base: 6, md: 8, lg: 10 }}
      m="auto"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      maxW={{ base: "95%", md: "450px", lg: "500px" }}
      w="full"
      minH={{ base: "60vh", md: "70vh" }}
    //   border="1px solid"
      borderColor="gray.200"
      borderRadius="lg"
      boxShadow="lg"
      bg="white"
      my={{ base: 8, md: 12 }}
    >
      <Box mb={6} display="flex" justifyContent="center">
        <img
          src="/modelLeapsLogo.png"
          alt="ModelLeaps"
          style={{ maxWidth: "150px", height: "auto" }}
        />
      </Box>

      <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" color="gray.700" mb={2}>
        Admin Login
      </Text>
      <Divider mb={6} />

      <VStack spacing={5} w="full" px={{ base: 4, md: 6 }}>
        <FormControl id="email" isRequired>
          <Input
            type="email"
            bg={inputBg}
            borderColor="gray.300"
            focusBorderColor={primaryColorPurple}
            placeholder="Email"
            borderRadius="full"
            size="lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              bg={inputBg}
              borderColor="gray.300"
              focusBorderColor={primaryColorPurple}
              placeholder="Password"
              borderRadius="full"
              size="lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement>
              <IconButton
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                onClick={toggleShowPassword}
                variant="ghost"
                aria-label="Toggle Password Visibility"
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button
          bg={primaryColorPurple}
          color="white"
          w="full"
          borderRadius="full"
          size="lg"
          py={{ base: 6, md: 7 }}
          fontSize={{ base: "md", md: "lg" }}
          _hover={{ bg: primaryColorOrange }}
          onClick={handleLogin}
          isDisabled={isLoading}
          boxShadow="sm"
        >
          {isLoading ? <Spinner /> : "Sign In"}
        </Button>

        <Text color="gray.600" fontSize={{ base: "sm", md: "md" }}>
          <Link to={"/"}>Return to Homepage</Link>
        </Text>
      </VStack>
    </Box>
  );
};

export default AdminAuthForm;
