import {
  Box,
  VStack,
  Button,
  IconButton,
  Image,
  Divider,
  Text,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
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
} from "react-icons/fa";
import { primaryColorOrange, primaryColorPurple } from "../../colorCodes";
import { useTheme } from "../../Themes/ThemeContext"; 
import {motion} from "framer-motion";
const MotionBox = motion(Box);

const Sidebar = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const { theme } = useTheme(); 

  const isActive = (path) => location.pathname === path;

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

  // const sidebarVariants = {
  //   open: {
  //     width: "250px",
  //     opacity: 1,
  //     transition: { duration: 0.5, ease: "easeInOut" },
  //   },
  //   closed: {
  //     width: "80px",
  //     opacity: 0.8,
  //     transition: { duration: 0.5, ease: "easeInOut" },
  //   },
  // };

  return (

    <MotionBox
    variants={sidebarVariants}
      w={isOpen ? "250px" : "80px"}
      p="4"
      animate={isOpen ? "open" : "closed"}
      initial={false}
      boxShadow="md"
      height="130vh"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      transition="width 0.3s ease"
      position={"relative"}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems={isOpen ? "flex-start" : "center"}
      >
        {isOpen && (
          <Image src="/modelLeapsLogo.png" alt="Model Leap Logo" width={"80%"}  py={5} />
        )}
        {!isOpen && (
          <Image
            mt={3}
            src="/model_leap_favicon.png"
            alt="Model Leap Logo"
            width={"100%"}
            mb={5}
          />
        )}

        <VStack gap={1} mt={"2"} spacing="1" align="stretch">
          <Button
            as={Link}
            to="/app"
            variant="ghost"
            justifyContent={isOpen ? "flex-start" : "center"}
            leftIcon={<FaRobot color={theme.iconColor} />}
            fontWeight="normal"
            bg={
              isActive("/app")
                ? "linear-gradient(90deg, hsl(297deg 63% 46%) 0%, hsl(309deg 64% 49%) 0%, hsl(318deg 72% 53%) -1%, hsl(326deg 80% 58%) -1%, hsl(333deg 88% 62%) -1%, hsl(340deg 94% 66%) 0%, hsl(347deg 99% 70%) 0%, hsl(354deg 100% 73%) 1%, hsl(2deg 100% 75%) 4%, hsl(8deg 100% 75%) 8%, hsl(14deg 100% 75%) 17%, hsl(19deg 100% 76%) 49%, hsl(23deg 98% 77%) 100%)"
                : "transparent"
            }
            color={theme.textColor}
            _hover={{
              bg: "linear-gradient(90deg, hsl(297deg 63% 46%) 0%, hsl(309deg 64% 49%) 0%, hsl(318deg 72% 53%) -1%, hsl(326deg 80% 58%) -1%, hsl(333deg 88% 62%) -1%, hsl(340deg 94% 66%) 0%, hsl(347deg 99% 70%) 0%, hsl(354deg 100% 73%) 1%, hsl(2deg 100% 75%) 4%, hsl(8deg 100% 75%) 8%, hsl(14deg 100% 75%) 17%, hsl(19deg 100% 76%) 49%, hsl(23deg 98% 77%) 100%)",
              color: "white",
            }}
          >
            <Text color={theme.textColor}>{isOpen && "AI Playground"}</Text>
          </Button>
          <Button
            as={Link}
            to="/app/ailab"
            variant="ghost"
            justifyContent={isOpen ? "flex-start" : "center"}
            leftIcon={<FaRobot color={theme.iconColor} />}
            fontWeight="normal"
            bg={
              isActive("/app/ailab")
                ? "linear-gradient(90deg, hsl(297deg 63% 46%) 0%, hsl(309deg 64% 49%) 0%, hsl(318deg 72% 53%) -1%, hsl(326deg 80% 58%) -1%, hsl(333deg 88% 62%) -1%, hsl(340deg 94% 66%) 0%, hsl(347deg 99% 70%) 0%, hsl(354deg 100% 73%) 1%, hsl(2deg 100% 75%) 4%, hsl(8deg 100% 75%) 8%, hsl(14deg 100% 75%) 17%, hsl(19deg 100% 76%) 49%, hsl(23deg 98% 77%) 100%)"
                : "transparent"
            }
            color={theme.textColor}
            _hover={{
              bg: "linear-gradient(90deg, hsl(297deg 63% 46%) 0%, hsl(309deg 64% 49%) 0%, hsl(318deg 72% 53%) -1%, hsl(326deg 80% 58%) -1%, hsl(333deg 88% 62%) -1%, hsl(340deg 94% 66%) 0%, hsl(347deg 99% 70%) 0%, hsl(354deg 100% 73%) 1%, hsl(2deg 100% 75%) 4%, hsl(8deg 100% 75%) 8%, hsl(14deg 100% 75%) 17%, hsl(19deg 100% 76%) 49%, hsl(23deg 98% 77%) 100%)",
              color: "white",
            }}
          >
            {isOpen && "AI Lab"}
          </Button>

          <Button
            as={Link}
            variant="ghost"
            to="/app/keymanagement"
            color={theme.textColor}
            justifyContent={isOpen ? "flex-start" : "center"}
            leftIcon={<FaKey color={theme.iconColor} />}
            fontWeight="normal"
            bg={
              isActive("/app/keymanagement")
                ? "linear-gradient(90deg, hsl(297deg 63% 46%) 0%, hsl(309deg 64% 49%) 0%, hsl(318deg 72% 53%) -1%, hsl(326deg 80% 58%) -1%, hsl(333deg 88% 62%) -1%, hsl(340deg 94% 66%) 0%, hsl(347deg 99% 70%) 0%, hsl(354deg 100% 73%) 1%, hsl(2deg 100% 75%) 4%, hsl(8deg 100% 75%) 8%, hsl(14deg 100% 75%) 17%, hsl(19deg 100% 76%) 49%, hsl(23deg 98% 77%) 100%)"
                : "transparent"
            }
            _hover={{
              bg: "linear-gradient(90deg, hsl(297deg 63% 46%) 0%, hsl(309deg 64% 49%) 0%, hsl(318deg 72% 53%) -1%, hsl(326deg 80% 58%) -1%, hsl(333deg 88% 62%) -1%, hsl(340deg 94% 66%) 0%, hsl(347deg 99% 70%) 0%, hsl(354deg 100% 73%) 1%, hsl(2deg 100% 75%) 4%, hsl(8deg 100% 75%) 8%, hsl(14deg 100% 75%) 17%, hsl(19deg 100% 76%) 49%, hsl(23deg 98% 77%) 100%)",
              color: "white",
            }}
          >
            {isOpen && "Key Management"}
          </Button>

          <Button
            as={Link}
            variant="ghost"
            to="/app/billing"
            color={theme.textColor}
            justifyContent={isOpen ? "flex-start" : "center"}
            leftIcon={<FaMoneyBill color={theme.iconColor} />}
            fontWeight="normal"
            bg={
              isActive("/app/billing")
                ? "linear-gradient(90deg, hsl(297deg 63% 46%) 0%, hsl(309deg 64% 49%) 0%, hsl(318deg 72% 53%) -1%, hsl(326deg 80% 58%) -1%, hsl(333deg 88% 62%) -1%, hsl(340deg 94% 66%) 0%, hsl(347deg 99% 70%) 0%, hsl(354deg 100% 73%) 1%, hsl(2deg 100% 75%) 4%, hsl(8deg 100% 75%) 8%, hsl(14deg 100% 75%) 17%, hsl(19deg 100% 76%) 49%, hsl(23deg 98% 77%) 100%)"
                : "transparent"
            }
            _hover={{
              bg: "linear-gradient(90deg, hsl(297deg 63% 46%) 0%, hsl(309deg 64% 49%) 0%, hsl(318deg 72% 53%) -1%, hsl(326deg 80% 58%) -1%, hsl(333deg 88% 62%) -1%, hsl(340deg 94% 66%) 0%, hsl(347deg 99% 70%) 0%, hsl(354deg 100% 73%) 1%, hsl(2deg 100% 75%) 4%, hsl(8deg 100% 75%) 8%, hsl(14deg 100% 75%) 17%, hsl(19deg 100% 76%) 49%, hsl(23deg 98% 77%) 100%)",
              color: "white",
            }}
          >
            {isOpen && "Billings"}
          </Button>

          <Divider my="4" borderColor={theme.sideBarDividerColor}/>
          {isOpen && (
            <Text
              fontSize="sm"
              color={theme.textColor}
              pl={isOpen ? "4" : "0"}
              textAlign={isOpen ? "left" : "center"}
            >
              More
            </Text>
          )}

          <Button
            as={Link}
            to="/app/settings"
            variant="ghost"
            color={theme.textColor}
            justifyContent={isOpen ? "flex-start" : "center"}
            leftIcon={<FaCog color={theme.iconColor} />}
            fontWeight="normal"
            bg={
              isActive("/app/settings")
                ? "linear-gradient(90deg, hsl(297deg 63% 46%) 0%, hsl(309deg 64% 49%) 0%, hsl(318deg 72% 53%) -1%, hsl(326deg 80% 58%) -1%, hsl(333deg 88% 62%) -1%, hsl(340deg 94% 66%) 0%, hsl(347deg 99% 70%) 0%, hsl(354deg 100% 73%) 1%, hsl(2deg 100% 75%) 4%, hsl(8deg 100% 75%) 8%, hsl(14deg 100% 75%) 17%, hsl(19deg 100% 76%) 49%, hsl(23deg 98% 77%) 100%)"
                : "transparent"
            }
            _hover={{
              bg: "linear-gradient(90deg, hsl(297deg 63% 46%) 0%, hsl(309deg 64% 49%) 0%, hsl(318deg 72% 53%) -1%, hsl(326deg 80% 58%) -1%, hsl(333deg 88% 62%) -1%, hsl(340deg 94% 66%) 0%, hsl(347deg 99% 70%) 0%, hsl(354deg 100% 73%) 1%, hsl(2deg 100% 75%) 4%, hsl(8deg 100% 75%) 8%, hsl(14deg 100% 75%) 17%, hsl(19deg 100% 76%) 49%, hsl(23deg 98% 77%) 100%)",
              color: "white",
            }}
          >
            {isOpen && "Settings"}
          </Button>

          <Button
            as={Link}
            variant="ghost"
            to="/app/helpcenter"
            color={theme.textColor}
            justifyContent={isOpen ? "flex-start" : "center"}
            leftIcon={<FaQuestionCircle color={theme.iconColor} />}
            fontWeight="normal"
            bg={
              isActive("/app/helpcenter")
                ? "linear-gradient(90deg, hsl(297deg 63% 46%) 0%, hsl(309deg 64% 49%) 0%, hsl(318deg 72% 53%) -1%, hsl(326deg 80% 58%) -1%, hsl(333deg 88% 62%) -1%, hsl(340deg 94% 66%) 0%, hsl(347deg 99% 70%) 0%, hsl(354deg 100% 73%) 1%, hsl(2deg 100% 75%) 4%, hsl(8deg 100% 75%) 8%, hsl(14deg 100% 75%) 17%, hsl(19deg 100% 76%) 49%, hsl(23deg 98% 77%) 100%)"
                : "transparent"
            }
            _hover={{
              bg: "linear-gradient(90deg, hsl(297deg 63% 46%) 0%, hsl(309deg 64% 49%) 0%, hsl(318deg 72% 53%) -1%, hsl(326deg 80% 58%) -1%, hsl(333deg 88% 62%) -1%, hsl(340deg 94% 66%) 0%, hsl(347deg 99% 70%) 0%, hsl(354deg 100% 73%) 1%, hsl(2deg 100% 75%) 4%, hsl(8deg 100% 75%) 8%, hsl(14deg 100% 75%) 17%, hsl(19deg 100% 76%) 49%, hsl(23deg 98% 77%) 100%)",
              color: "white",
            }}
          >
            {isOpen && "Help Centre"}
          </Button>

          <Button
            as={Link}
            variant="ghost"
            to="/app/documentation"
            color={theme.textColor}
            justifyContent={isOpen ? "flex-start" : "center"}
            leftIcon={<FaBook color={theme.iconColor} />}
            fontWeight="normal"
            bg={
              isActive("/app/documentation")
                ? "linear-gradient(90deg, hsl(297deg 63% 46%) 0%, hsl(309deg 64% 49%) 0%, hsl(318deg 72% 53%) -1%, hsl(326deg 80% 58%) -1%, hsl(333deg 88% 62%) -1%, hsl(340deg 94% 66%) 0%, hsl(347deg 99% 70%) 0%, hsl(354deg 100% 73%) 1%, hsl(2deg 100% 75%) 4%, hsl(8deg 100% 75%) 8%, hsl(14deg 100% 75%) 17%, hsl(19deg 100% 76%) 49%, hsl(23deg 98% 77%) 100%)"
                : "transparent"
            }
            _hover={{
              bg: "linear-gradient(90deg, hsl(297deg 63% 46%) 0%, hsl(309deg 64% 49%) 0%, hsl(318deg 72% 53%) -1%, hsl(326deg 80% 58%) -1%, hsl(333deg 88% 62%) -1%, hsl(340deg 94% 66%) 0%, hsl(347deg 99% 70%) 0%, hsl(354deg 100% 73%) 1%, hsl(2deg 100% 75%) 4%, hsl(8deg 100% 75%) 8%, hsl(14deg 100% 75%) 17%, hsl(19deg 100% 76%) 49%, hsl(23deg 98% 77%) 100%)",
              color: "white",
            }}
          >
            {isOpen && "Documentation"}
          </Button>

          <Divider my="2" borderColor={theme.sideBarDividerColor}/>

          <Button
            as={Link}
            variant="ghost"
            to="/auth"
            color={theme.textColor}
            justifyContent={isOpen ? "flex-start" : "center"}
            leftIcon={<FaSignOutAlt color={theme.iconColor} />}
            fontWeight="normal"
            bg={
              isActive("/auth")
                ? "linear-gradient(90deg, hsl(297deg 63% 46%) 0%, hsl(309deg 64% 49%) 0%, hsl(318deg 72% 53%) -1%, hsl(326deg 80% 58%) -1%, hsl(333deg 88% 62%) -1%, hsl(340deg 94% 66%) 0%, hsl(347deg 99% 70%) 0%, hsl(354deg 100% 73%) 1%, hsl(2deg 100% 75%) 4%, hsl(8deg 100% 75%) 8%, hsl(14deg 100% 75%) 17%, hsl(19deg 100% 76%) 49%, hsl(23deg 98% 77%) 100%)"
                : "transparent"
            }
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

export default Sidebar;
