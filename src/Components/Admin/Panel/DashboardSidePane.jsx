import React from "react";
import {
  Box,
  VStack,
  Button,
  IconButton,
  Image,
  Divider,
  Text,
  Heading,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { RiProgress1Fill } from "react-icons/ri";
import {
  FaKey,
  FaMoneyBill,
  FaCog,
  FaQuestionCircle,
  FaBook,
  FaSignOutAlt,
  FaRobot,
  FaChevronLeft,
  FaChevronRight,
  FaFlask,
  FaChartBar, FaUserFriends, FaCheckCircle,
} from "react-icons/fa";
import { primaryColorOrange, primaryColorPurple } from "../../../colorCodes";
import { useTheme } from "../../../Themes/ThemeContext";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const DashboardSidePane = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const { theme } = useTheme();

  const isActive = (path) => location.pathname === path;

  // Define menu items in a dynamic array
  const menuItems = [
    // { label: "Statistics", icon: FaChartBar, path: "/admin/dashboard" },
    { label: "Users", icon: FaUserFriends, path: "/admin/dashboard/users" },
    { label: "Approval Requests", icon: FaCheckCircle, path: "/admin/dashboard/approvals" },
  ];

  const sidebarVariants = {
    open: {
      width: "250px",
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
    closed: {
      width: "80px",
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  const renderMenuItems = () =>
    menuItems.map((item) => (
      <Button
        as={Link}
        to={item.path}
        variant="ghost"
        key={item.label}
        justifyContent={isOpen ? "flex-start" : "center"}
        leftIcon={<item.icon color={theme.iconColor} />}
        fontWeight="normal"
        bg={
          isActive(item.path)
            ? "linear-gradient(90deg, hsl(297deg 63% 46%) 0%, hsl(309deg 64% 49%) 0%, hsl(318deg 72% 53%) -1%, hsl(326deg 80% 58%) -1%, hsl(333deg 88% 62%) -1%, hsl(340deg 94% 66%) 0%, hsl(347deg 99% 70%) 0%, hsl(354deg 100% 73%) 1%, hsl(2deg 100% 75%) 4%, hsl(8deg 100% 75%) 8%, hsl(14deg 100% 75%) 17%, hsl(19deg 100% 76%) 49%, hsl(23deg 98% 77%) 100%)"
            : "transparent"
        }
        color={theme.textColor}
        _hover={{
          bg: "linear-gradient(90deg, hsl(297deg 63% 46%) 0%, hsl(309deg 64% 49%) 0%, hsl(318deg 72% 53%) -1%, hsl(326deg 80% 58%) -1%, hsl(333deg 88% 62%) -1%, hsl(340deg 94% 66%) 0%, hsl(347deg 99% 70%) 0%, hsl(354deg 100% 73%) 1%, hsl(2deg 100% 75%) 4%, hsl(8deg 100% 75%) 8%, hsl(14deg 100% 75%) 17%, hsl(19deg 100% 76%) 49%, hsl(23deg 98% 77%) 100%)",
          color: "white",
        }}
      >
        {isOpen && item.label}
      </Button>
    ));

  return (
    <MotionBox
      variants={sidebarVariants}
      w={isOpen ? "250px" : "80px"}
      p="4"
      animate={isOpen ? "open" : "closed"}
      initial={false}
      boxShadow="md"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      transition="width 0.3s ease"
      position={"relative"}
    >
      <Box
        height={"100vh"}
        display="flex"
        flexDirection="column"
        alignItems={isOpen ? "flex-start" : "center"}
      >
        {isOpen ? (
          <Image
            src="/modelLeapsLogo.png"
            alt="Model Leap Logo"
            width={"80%"}
            py={5}
          />
        ) : (
          <Image
            mt={3}
            src="/model_leap_favicon.png"
            alt="Model Leap Logo"
            width={"100%"}
            mb={5}
          />
        )}

        {isOpen && (
          <Text mt={3} ml={5} fontSize="md" fontWeight="bold" color={theme.textColor} mb={4}>
            Admin Dashboard
          </Text>
        )}

        <VStack gap={1} mt={"2"} spacing="1" align="stretch">
          {renderMenuItems()}
          <Divider my="4" borderColor={theme.sideBarDividerColor} />
          {/* {isOpen && (
            <Text fontSize="sm" color={theme.textColor} pl={isOpen ? "4" : "0"} textAlign={isOpen ? "left" : "center"}>
              More
            </Text>
          )} */}

          <Button
            as={Link}
            variant="ghost"
            to="/admin/auth"
            color={theme.textColor}
            justifyContent={isOpen ? "flex-start" : "center"}
            leftIcon={<FaSignOutAlt color={theme.iconColor} />}
            fontWeight="normal"
            onClick={() => {
              localStorage.removeItem("authToken");
            }}
            _hover={{
              bg: "linear-gradient(90deg, hsl(297deg 63% 46%) 0%, hsl(309deg 64% 49%) 0%, hsl(318deg 72% 53%) -1%, hsl(326deg 80% 58%) -1%, hsl(333deg 88% 62%) -1%, hsl(340deg 94% 66%) 0%, hsl(347deg 99% 70%) 0%, hsl(354deg 100% 73%) 1%, hsl(2deg 100% 75%) 4%, hsl(8deg 100% 75%) 8%, hsl(14deg 100% 75%) 17%, hsl(19deg 100% 76%) 49%, hsl(23deg 98% 77%) 100%)",
              color: "white",
            }}
          >
            {isOpen && "Sign Out"}
          </Button>
        </VStack>
      </Box>

      <IconButton
        icon={
          isOpen ? (
            <FaChevronLeft color={theme.sideBarIconColor} />
          ) : (
            <FaChevronRight color={theme.sideBarIconColor} />
          )
        }
        onClick={onToggle}
        aria-label="Toggle Sidebar"
        size="sm"
        _hover={{ bg: primaryColorOrange, color: "white" }}
        bg={primaryColorPurple}
        borderRadius={"full"}
        position="absolute"
        right="-17px"
        top="8%"
        transform="translateY(-50%)"
        boxShadow="lg"
      />
    </MotionBox>
  );
};

export default DashboardSidePane;
