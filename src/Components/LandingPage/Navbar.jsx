import React from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Stack,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../../../public/model_leap_favicon.png";
import { primaryColorOrange, primaryColorPurple } from "../../colorCodes";

// Animation wrapper
const MotionBox = motion(Box);

// Navigation data
const NAV_ITEMS = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "Pricing",
    link: "/pricing",
  },
  {
    label: "AI Custom Bot",
    link: "/app",
  },
  {
    label: "Contact Us",
    link: "/contact",
  },
  
];

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box position="fixed" w="100%" backdropFilter="blur(10px)" zIndex="1000" boxShadow="md">
      <Flex h={16} alignItems="center" justifyContent="space-between" px={6} maxW="100%" mx="auto">
        {/* Logo Section */}
        <HStack spacing={4} alignItems="center">
          <Box>
            <Image src={logo} alt="Logo" boxSize="50px" />
          </Box>
          <Box
            fontWeight="bold"
            fontSize="xl"
            mt={1}
            color={primaryColorPurple}
            _hover={{ color: "black" }}
            display={{ base: "none", sm: "block" }}
          >
            Model Leap AI
          </Box>
        </HStack>

        {/* Desktop Navigation */}
        <HStack as="nav" spacing={6} display={{ base: "none", md: "flex" }} fontWeight="500" fontSize="sm">
          {NAV_ITEMS.map((navItem) =>
            navItem.submenu ? (
              <Menu key={navItem.label}>
                <MenuButton
                  as={Button}
                  variant="link"
                  fontWeight="normal"
                  rightIcon={<ChevronDownIcon />}
                  _hover={{ textDecoration: "none", color: "black" }}
                >
                  {navItem.label}
                </MenuButton>
                <MenuList>
                  {navItem.submenu.map((submenuItem, index) => (
                    <MenuItem key={index}>{submenuItem}</MenuItem>
                  ))}
                </MenuList>
              </Menu>
            ) : (
              <Link key={navItem.label} to={navItem.link}>
                <Text mt={1} fontWeight="normal" _hover={{ textDecoration: "none", color: "black" }}>
                  {navItem.label}
                </Text>
              </Link>
            )
          )}
        </HStack>

        {/* Buttons and Hamburger Icon */}
        <HStack spacing={6}>
          <Link to="/app">
            <Button
              bg={primaryColorPurple}
              color="white"
              _hover={{ bg: "black" }}
              borderRadius="md"
              px={5}
            >
              Playground
            </Button>
          </Link>
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon color={primaryColorOrange} /> : <HamburgerIcon color="white" />}
            aria-label="Open Menu"
            bg={isOpen ? "transparent" : primaryColorPurple}
            display={{ md: "none" }}
            onClick={toggleMenu}
            _hover={{ bg: isOpen ? "transparent" : primaryColorPurple }}
          />
        </HStack>
      </Flex>

      {/* Mobile Navigation */}
      <MotionBox
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 2, height: "auto" },
          closed: { opacity: 0, height: 0 },
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        overflow="hidden"
      >
        <Box pb={4} display={{ md: "none" }} backdropFilter="blur(10px)" shadow="lg">
          <Stack as="nav" spacing={4} align="center">
            {NAV_ITEMS.map((navItem) =>
              navItem.submenu ? (
                <Menu key={navItem.label}>
                  <MenuButton as={ChakraLink} _hover={{ textDecoration: "none", color: "gray.500" }}>
                    {navItem.label}
                  </MenuButton>
                  <MenuList>
                    {navItem.submenu.map((submenuItem, index) => (
                      <MenuItem key={index}>{submenuItem}</MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              ) : (
                <Link key={navItem.label} to={navItem.link} _hover={{ textDecoration: "none", color: "gray.500" }}>
                  {navItem.label}
                </Link>
              )
            )}
            <Link to="/app">
              <Button
                bg={primaryColorPurple}
                color="white"
                _hover={{ bg: primaryColorOrange }}
                borderRadius="md"
              >
                Playground
              </Button>
            </Link>
          </Stack>
        </Box>
      </MotionBox>
    </Box>
  );
};

export default Navbar;
