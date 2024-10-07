import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FcGoogle } from "react-icons/fc";
import { primaryColorPurple, primaryColorOrange } from "../../colorCodes";
import { Link } from "react-router-dom";

const AuthForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const inputBg = "gray.100";

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <Box
      p={{ base: 10, md: 12 }}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      maxW="600px"
      w={"100%"}
      border="1px solid"
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
        Sign In with Google
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
              >
                <Link w="full" to={"/app"}>
                  Sign In
                </Link>
              </Button>

              <Text color="gray.600" cursor="pointer" fontSize="sm">
                <Link w="full" to={"/"}>
                  explore us?
                </Link>
              </Text>
            </VStack>
          </TabPanel>

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
                    type={showPassword ? "text" : "confirm-password"}
                    bg={inputBg}
                    borderColor="gray.100"
                    focusBorderColor={primaryColorPurple}
                    placeholder="Confirm Password"
                    borderRadius="full"
                    size="md"
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
              >
                Sign Up
              </Button>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AuthForm;
