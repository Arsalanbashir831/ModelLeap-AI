import React, { useState } from "react";
import {
  Box,
  VStack,
  Button,
  IconButton,
  Image,
  Divider,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { RiProgress1Fill } from "react-icons/ri";
import {
  FaKey,
  FaMoneyBill,
  FaCog,
  FaSignOutAlt,
  FaRobot,
  FaChevronLeft,
  FaChevronRight,
  FaFlask,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useTheme } from "../../Themes/ThemeContext";
import { primaryColorOrange } from "../../colorCodes";

const MotionBox = motion(Box);

const Sidebar = () => {
  const location = useLocation();
  const { theme } = useTheme();

  // Set sidebar state and determine mobile view
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Auto-close sidebar on mobile
  React.useEffect(() => {
    if (isMobile) setIsOpen(false);
  }, [isMobile]);

  // Determine active state for navigation items
  const isActive = (path) => location.pathname === path;

  // Define sidebar navigation items
  const menuItems = [
    { label: "Playground", icon: FaRobot, path: "/app" },
    { label: "Lab", icon: FaFlask, path: "/app/ailab" },
    { label: "Key Management", icon: FaKey, path: "/app/keymanagement" },
    { label: "Subscription", icon: FaMoneyBill, path: "/app/billing" },
    { label: "Usage", icon: RiProgress1Fill, path: "/app/usage" },
    // { label: "Settings", icon: FaCog, path: "/app/settings" },
  ];

  // Sidebar variants for opening and closing
  const sidebarVariants = {
    open: { width: "250px" },
    closed: { width: "80px" },
  };

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
       _hover={{bg:primaryColorOrange , color:'white'}}
        fontWeight="normal"
        color={  isActive(item.path) ? 'white' :theme.textColor}

        bg={
          isActive(item.path)
            ? primaryColorOrange
            : "transparent"
        }
      >
        {isOpen && item.label}
      </Button>
    ));

  return (
    <MotionBox
      bg={theme.background}
      className={`text-white flex flex-col justify-between shadow-lg`}
      variants={sidebarVariants}
      initial={false}
      animate={isOpen ? "open" : "closed"}
      transition={{ duration: 0.3 }}
      height="100vh"
      p="4"
      position="relative"
    >
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
          <Divider
            borderColor={theme.sideBarDividerColor}
            my="4"
            className="w-full"
          />
          <Button
            as={Link}
            to="/auth"
            variant="ghost"
            justifyContent={isOpen ? "flex-start" : "center"}
            leftIcon={<FaSignOutAlt color={theme.iconColor} />}
            _hover={{bg:primaryColorOrange , color:'white'}}
            fontWeight="normal"
            color={theme.textColor}
            onClick={() => localStorage.removeItem("authToken")}
          >
            {isOpen && "Sign Out"}
          </Button>
        </VStack>
      </Box>

      {/* Sidebar Toggle Button - Hidden on mobile */}
      {!isMobile && (
        <IconButton
          icon={isOpen ? <FaChevronLeft /> : <FaChevronRight />}
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        colorScheme="pink"
          _hover={{bg:primaryColorOrange}}
          // className="absolute right-[-17px] top-1/4 bg-purple-600 hover:bg-orange-500 text-white rounded-full shadow-lg"
        />
      )}
    </MotionBox>
  );
};

export default Sidebar;
