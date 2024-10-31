import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
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
import { BASE_URL } from "../../../Constants";

const AdminAuthForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = async () => {
    // setIsLoading(true);
    // // Simulate async login process
    // setTimeout(() => {
    //   navigate("/admin/dashboard/users");
    //   setIsLoading(false);
    //   toast({
    //     title: "Login Successful",
    //     status: "success",
    //     duration: 2000,
    //     isClosable: true,
    //   });
    // }, 1000);
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        toast({
          title: "Login Successful",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        localStorage.setItem("adminToken", data.idToken);
       navigate("/admin/dashboard/users");
        console.log(data);
      }
    } catch (error) {
      const data = await response.json();
      toast({
        title: data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }finally{
      setIsLoading(false);
    }

  };

  return (
    <Box
      p={{ base: 4, sm: 6, md: 8 }}
      mx="auto"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      maxW={{ base: "90%", sm: "400px", md: "450px", lg: "500px" }}
      w="full"
      minH={{ base: "60vh", md: "70vh" }}
      borderColor="gray.200"
      borderRadius="lg"
      boxShadow="2xl"
      bg="white"
      my={{ base: 8, md: 12 }}
      _hover={{ boxShadow: "lg" }}
      transition="box-shadow 0.2s ease-in-out"
    >
      <Box mb={6} display="flex" justifyContent="center">
        <img
          src="/modelLeapsLogo.png"
          alt="ModelLeaps"
          style={{ maxWidth: "150px", height: "auto" }}
        />
      </Box>

      <Text
        fontSize={{ base: "lg", sm: "xl", md: "2xl" }}
        fontWeight="bold"
        color="black"
        mb={2}
        textAlign="center"
      >
        Admin Login
      </Text>
      <Divider mb={6} />

      <VStack spacing={5} w="full" px={{ base: 4, md: 6 }}>
        <FormControl id="email" isRequired>
          <FormLabel
            fontWeight="bold"
            color="gray.700"
            fontSize={{ base: "sm", sm: "md" }}
          >
            Email
          </FormLabel>
          <Input
            type="email"
            color="black"
            bg="gray.100"
            borderColor="gray.300"
            focusBorderColor={primaryColorPurple}
            borderRadius="full"
            size="lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            _hover={{ bg: "gray.200" }}
            boxShadow="sm"
            p={5}
          />
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel
            fontWeight="bold"
            color="gray.700"
            fontSize={{ base: "sm", sm: "md" }}
          >
            Password
          </FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              color="black"
              bg="gray.100"
              borderColor="gray.300"
              focusBorderColor={primaryColorPurple}
              borderRadius="full"
              size="lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              _hover={{ bg: "gray.200" }}
              boxShadow="sm"
              p={5}
            />
            <InputRightElement>
              <IconButton
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                onClick={toggleShowPassword}
                variant="ghost"
                aria-label="Toggle Password Visibility"
                color="gray.600"
                _hover={{ color: primaryColorPurple }}
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
          py={{ base: 5, md: 6 }}
          fontSize={{ base: "md", sm: "lg" }}
          _hover={{ bg: primaryColorOrange }}
          onClick={handleLogin}
          isDisabled={isLoading}
          boxShadow="md"
          transition="background-color 0.3s ease"
        >
          {isLoading ? <Spinner size="md" color="white" /> : "Sign In"}
        </Button>

        <Text
          color="gray.700"
          fontSize={{ base: "sm", md: "md" }}
          mt={4}
          textAlign="center"
        >
          <Link to={"/"} style={{ textDecoration: "underline" }}>
            Return to Homepage
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};

export default AdminAuthForm;
