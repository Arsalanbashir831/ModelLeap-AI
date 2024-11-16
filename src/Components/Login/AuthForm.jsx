import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
  InputGroup,
  InputRightElement,
  IconButton,
  Divider,
  Text,
  Spinner,
  useToast,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FcGoogle } from "react-icons/fc";
import { primaryColorPurple, primaryColorOrange } from "../../colorCodes";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Constants";
import { GoogleAuthProvider, signInWithPopup , sendPasswordResetEmail} from "firebase/auth";
import { auth } from "../../firebase";

const AuthForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const inputBg = "gray.100";
  const navigate = useNavigate();
  const toast = useToast();
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleGoogleAuthentication = async (token) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/google-auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type
        },
        body: JSON.stringify({
          googleIdToken: token, // Pass the token as required
        }),
      });

      if (!response.ok) {
        // If the response is not OK, throw an error to catch

        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json(); // Parse the response if needed

      // Navigate to the app if the request is successful
      window.location.href = "/app";
    } catch (error) {
      console.error("Error during Google authentication:", error);
    }
  };

  const handleGoogle = async (e) => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    const token = result._tokenResponse.idToken;
    const localId = result._tokenResponse.localId;
    localStorage.setItem("authToken", token);
    localStorage.setItem("localId", localId);
    // navigate("/app");
    await handleGoogleAuthentication(token);
  };
  const handleSignup = async () => {
    setIsLoading(true);
    try {
      if (password !== confirmPassword) {
        console.log("Passwords do not match");
        setIsLoading(false);
        return;
      }

      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          username,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Signup successful", data);
        localStorage.setItem("authToken", data.idToken);
        localStorage.setItem("localId", data.localId);
        window.location.href = "/app";
      } else {
        console.log("Signup failed", data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Login successful", data);
        localStorage.setItem("authToken", data.idToken);
        localStorage.setItem("localId", data.localId);
        toast({
          title: "Login Successful",
          description: "Welcome back!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        // console.log('auth',userData);
        //  setUserContext(userData);
        // navigate("/app");
        window.location.href = "/app";
      } else {
        console.log("Login failed", data);
        toast({
          title: "Login Failed",
          description: "Invalid Credentials",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };



  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast({
        title: "Password Reset Email Sent",
        description: "Check your email to reset your password.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setIsForgotPasswordOpen(false); // Close modal after sending email
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      p={0}
      display="flex"
      flexDirection="column"
      justifyContent="center"
    
      w={"70%"}
      borderColor="gray.200"
      borderRadius="lg"
      boxShadow="sm"
     
    >
      <Box mb={6} display="flex" justifyContent="center">
        <img
          src="/modelLeapsLogo.png"
          alt="ModelLeaps"
          style={{ maxWidth: "150px" }}
        />
      </Box>

      <Button
        onClick={handleGoogle}
        leftIcon={<FcGoogle />}
        colorScheme="gray"
        variant="outline"
        mb={4}
        borderRadius={"full"}
        w="full"
        border="1px"
        borderColor="gray.300"
        _hover={{ bg: primaryColorOrange, color: "white" }}
      >
      Continue with Google
      </Button>
      <Divider my={4} />

      <Tabs
        index={tabIndex}
        onChange={(index) => setTabIndex(index)}
        variant="soft-rounded"
        isFitted
      >
        <TabList>
          <Tab
            fontWeight="bold"
            _selected={{ bg: primaryColorOrange, color: "white" }}
            borderRadius="full"
          >
            Sign In
          </Tab>
          <Tab
            fontWeight="bold"
            _selected={{ bg: primaryColorOrange, color: "white" }}
            borderRadius="full"
          >
            Sign Up
          </Tab>
        </TabList>
        <TabPanels>
          {/* Login Tab */}
          <TabPanel>
            <VStack spacing={5}>
              <FormControl id="email" isRequired>
                <Input
                  type="email"
                  bg={inputBg}
                  borderColor="gray.300"
                  focusBorderColor={primaryColorPurple}
                  placeholder="Email"
                  borderRadius="full"
                  size="md"
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
                    size="md"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement>
                    <IconButton
                      mt={2}
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
                _hover={{ bg: primaryColorOrange }}
                onClick={handleLogin}
                isDisabled={isLoading}
              >
                {isLoading ? <Spinner /> : "Sign In"}
              </Button>
              <Text
                cursor="pointer"
                color="blue.500"
                fontWeight="semibold"
                textAlign="right"
                my={2}
                onClick={() => setIsForgotPasswordOpen(true)}
              >
                Forget Password?
              </Text>

              <Text color="gray.600" cursor="pointer" fontSize="sm">
                <HStack gap={3}>
                  <Link w="full" onClick={()=>window.location.href='https://modelleap.com/'}>
                  Explore Model Leap ? 
                  </Link>
                  <Link w="full" to={"/admin/auth"}>
                    Admin?
                  </Link>
                </HStack>
              </Text>
            </VStack>
          </TabPanel>

          {/* Signup Tab */}
          <TabPanel>
            <VStack spacing={5}>
              <FormControl id="email" isRequired>
                <Input
                  type="email"
                  bg={inputBg}
                  borderColor="gray.100"
                  focusBorderColor={primaryColorPurple}
                  placeholder="Email"
                  borderRadius="full"
                  size="md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="username" isRequired>
                <Input
                  type="text"
                  bg={inputBg}
                  borderColor="gray.100"
                  focusBorderColor={primaryColorPurple}
                  placeholder="Username"
                  borderRadius="full"
                  size="md"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    bg={inputBg}
                    borderColor="gray.100"
                    focusBorderColor={primaryColorPurple}
                    placeholder="Password"
                    borderRadius="full"
                    size="md"
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
              <FormControl id="confirm-password" isRequired>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    bg={inputBg}
                    borderColor="gray.100"
                    focusBorderColor={primaryColorPurple}
                    placeholder="Confirm Password"
                    borderRadius="full"
                    size="md"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                _hover={{ bg: primaryColorOrange }}
                onClick={handleSignup}
                isDisabled={isLoading}
              >
                {isLoading ? <Spinner /> : "Sign Up"}
              </Button>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Modal isOpen={isForgotPasswordOpen} onClose={() => setIsForgotPasswordOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reset Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="reset-email" isRequired>
              <Input
                type="email"
                bg={inputBg}
                borderColor="gray.300"
                focusBorderColor={primaryColorPurple}
                placeholder="Enter your email"
                borderRadius="full"
                size="md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleForgotPassword}>
              Send Reset Email
            </Button>
            <Button variant="ghost" onClick={() => setIsForgotPasswordOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AuthForm;
