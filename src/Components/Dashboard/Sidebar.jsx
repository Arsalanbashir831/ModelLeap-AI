import React, { useState } from "react";
import {
  Box,
  VStack,
  Button,
  IconButton,
  Image,
  Divider,
  useBreakpointValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { RiProgress1Fill } from "react-icons/ri";
import {
  FaKey,
  FaMoneyBill,
  FaSignOutAlt,
  FaRobot,
  FaChevronLeft,
  FaChevronRight,
  FaFlask,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useTheme } from "../../Themes/ThemeContext";
import { primaryColorOrange } from "../../colorCodes";
import { CgMenuBoxed } from "react-icons/cg";
import { ImMenu } from "react-icons/im";
const MotionBox = motion(Box);

const Sidebar = () => {
  const location = useLocation();
  const { theme } = useTheme();

  // Set sidebar state and determine mobile view
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Determine active state for navigation items
  const isActive = (path) => location.pathname === path;

  // Define sidebar navigation items
  const menuItems = [
    { label: "Playground", icon: FaRobot, path: "/app" },
    { label: "Lab", icon: FaFlask, path: "/app/ailab" },
    { label: "Key Management", icon: FaKey, path: "/app/keymanagement" },
    { label: "Subscription", icon: FaMoneyBill, path: "/app/billing" },
    { label: "Usage", icon: RiProgress1Fill, path: "/app/usage" },
  ];

  // Render navigation items
  const renderMenuItems = () =>
    menuItems.map((item) => (
      <Button
        as={Link}
        to={item.path}
        variant="ghost"
        key={item.label}
        justifyContent={isOpen ? "flex-start" : "center"}
        leftIcon={<item.icon color={theme.iconColor} />}
        _hover={{ bg: primaryColorOrange, color: "white" }}
        fontWeight="normal"
        color={isActive(item.path) ? "white" : theme.textColor}
        bg={isActive(item.path) ? primaryColorOrange : "transparent"}
      >
        {isOpen && item.label}
      </Button>
    ));

  // Sidebar content for Drawer and Desktop
  const sidebarContent = (
    <Box
      className={`flex flex-col items-${isOpen ? "start" : "center"} gap-4`}
      mt={isOpen ? 8 : 4}
      mb={isOpen ? 8 : 4}
    >
      {isOpen ? (
        <Image
          src="/modelLeapsLogo.png"
          alt="Model Leap Logo"
          className="w-4/5 py-5"
          mb={5}
        />
      ) : (
        <Image
          src="/model_leap_favicon.png"
          alt="Model Leap Logo"
          className="w-12"
          mb={5}
        />
      )}
      <VStack spacing={4} align="stretch">
        {renderMenuItems()}
        <Divider borderColor={theme.sideBarDividerColor} my="4" className="w-full" />
        <Button
          as={Link}
          to="/auth"
          variant="ghost"
          justifyContent={isOpen ? "flex-start" : "center"}
          leftIcon={<FaSignOutAlt color={theme.iconColor} />}
          _hover={{ bg: primaryColorOrange, color: "white" }}
          fontWeight="normal"
          color={theme.textColor}
          onClick={() => localStorage.removeItem("authToken")}
        >
          {isOpen && "Sign Out"}
        </Button>
      </VStack>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        // Drawer for mobile view
        <Drawer isOpen={isOpen} placement="left" onClose={toggleSidebar}>
          <DrawerOverlay />
          <DrawerContent bg={theme.background}>
            <DrawerCloseButton color={theme.textColor} onClick={toggleSidebar} />
            {sidebarContent}
          </DrawerContent>
        </Drawer>
      ) : (
        // Sidebar for desktop view
        <MotionBox
          bg={theme.background}
          className="text-white flex flex-col justify-between shadow-lg"
          variants={{ open: { width: "250px" }, closed: { width: "80px" } }}
          initial={false}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.3 }}
          height="100vh"
          p="4"
          position="relative"
        >
          {sidebarContent}

          {/* Sidebar Toggle Button - Hidden on mobile */}
          <IconButton
            icon={isOpen ? <FaChevronLeft /> : <FaChevronRight />}
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
        bg={primaryColorOrange}
            _hover={{ bg: primaryColorOrange }}
          />
        </MotionBox>
      )}

      {/* Toggle Button for Drawer on mobile */}
      {isMobile && (
        <IconButton
          icon={isOpen ?<ImMenu />: <ImMenu />}
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar Drawer"
          position="fixed"
          top="20px"
          left="20px"
          zIndex="overlay"
         bg={primaryColorOrange}
          _hover={{ bg: primaryColorOrange }}
        />
      )}
    </>
  );
};

export default Sidebar;
