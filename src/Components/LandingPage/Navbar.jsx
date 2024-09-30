import React from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  Stack,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import logo from "../../../public/model_leap_favicon.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      position="fixed"
      w="100%"
      backdropFilter="blur(10px)"
      zIndex="9999"
      boxShadow="lg"
    >
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        px={6}
        maxW="1200px"
        mx="auto"
      >
        <HStack spacing={8} alignItems="center">
          <Box>
            <Image src={logo} alt="Logo" boxSize="40px" />
          </Box>
          <Box fontWeight="bold" fontSize="lg">
            Model Leap AI
          </Box>
        </HStack>

        <HStack
          as="nav"
          spacing={6}
          display={{ base: "none", md: "flex" }}
          fontWeight="500"
          fontSize="sm"
        >
          <Menu>
            <MenuButton
              as={Button}
              variant="link"
              fontWeight="normal"
              rightIcon={<ChevronDownIcon />}
            >
              AI APIs
            </MenuButton>
            <MenuList>
              <MenuItem>API 1</MenuItem>
              <MenuItem>API 2</MenuItem>
            </MenuList>
          </Menu>
          <Link to="#" >Enterprise</Link>
          <Link to="#">Pricing</Link>

          <Menu>
            <MenuButton
              as={Button}
              variant="link"
              fontWeight="normal"
              rightIcon={<ChevronDownIcon />}
            >
              Developer
            </MenuButton>
            <MenuList>
              <MenuItem>Docs</MenuItem>
              <MenuItem>Community</MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton
              as={Button}
              variant="link"
              fontWeight="normal"
              rightIcon={<ChevronDownIcon />}
            >
              Resources
            </MenuButton>
            <MenuList>
              <MenuItem>Blog</MenuItem>
              <MenuItem>Guides</MenuItem>
            </MenuList>
          </Menu>
        </HStack>

        <HStack spacing={6}>
          <Link to="/app">
            <Button
              bg="black"
              color="white"
              _hover={{ bg: "gray.700" }}
              borderRadius="md"
              px={5}
            >
              AI Playground
            </Button>
          </Link>
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
        </HStack>
      </Flex>
      {isOpen ? (
        <Box pb={4} display={"flex"} bg="white" justifyContent={'center'}>
          <Stack as="nav" spacing={4}>
            <Link to="#">AI APIs</Link>
            <Link to="#">Enterprise</Link>
            <Link to="#">Pricing</Link>
            <Menu>
              <MenuButton as={Link}>Developer</MenuButton>
              <MenuList>
                <MenuItem>Docs</MenuItem>
                <MenuItem>Community</MenuItem>
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton as={Link}>Resources</MenuButton>
              <MenuList>
                <MenuItem>Blog</MenuItem>
                <MenuItem>Guides</MenuItem>
              </MenuList>
            </Menu>
            <Link to="/app">
              <Button
                bg="black"
                color="white"
                _hover={{ bg: "gray.700" }}
                borderRadius="md"
              >
                AI Playground
              </Button>
            </Link>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
