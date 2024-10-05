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
import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";
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

const Sidebar = ({ isOpen, onToggle }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <Box
      w={isOpen ? "250px" : "80px"}
      p="4"
      boxShadow="md"
      height="100%"
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
          <Image src="/model_leap.png" alt="Model Leap Logo" width={"80%"} />
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
        <VStack mt={"1"} spacing="1" align="stretch">
          <Button
            as={Link}
            to="/app"
            variant="ghost"
            justifyContent={isOpen ? "flex-start" : "center"}
            leftIcon={<FaRobot />}
            fontWeight="normal"
            bg={
              isActive("/app")
                ? "linear-gradient(90deg, hsl(297deg 63% 46%) 0%, hsl(309deg 64% 49%) 0%, hsl(318deg 72% 53%) -1%, hsl(326deg 80% 58%) -1%, hsl(333deg 88% 62%) -1%, hsl(340deg 94% 66%) 0%, hsl(347deg 99% 70%) 0%, hsl(354deg 100% 73%) 1%, hsl(2deg 100% 75%) 4%, hsl(8deg 100% 75%) 8%, hsl(14deg 100% 75%) 17%, hsl(19deg 100% 76%) 49%, hsl(23deg 98% 77%) 100%)"
                : "transparent"
            }
            color={isActive("/app") ? "white" : "black"}
            _hover={{
              bg: "linear-gradient(90deg, hsl(297deg 63% 46%) 0%, hsl(309deg 64% 49%) 0%, hsl(318deg 72% 53%) -1%, hsl(326deg 80% 58%) -1%, hsl(333deg 88% 62%) -1%, hsl(340deg 94% 66%) 0%, hsl(347deg 99% 70%) 0%, hsl(354deg 100% 73%) 1%, hsl(2deg 100% 75%) 4%, hsl(8deg 100% 75%) 8%, hsl(14deg 100% 75%) 17%, hsl(19deg 100% 76%) 49%, hsl(23deg 98% 77%) 100%)",
              color: "white",
            }}
          >
            {isOpen && "AI Playground"}
          </Button>

          <Button
            as={Link}
            to="/app/ailab"
            variant="ghost"
            justifyContent={isOpen ? "flex-start" : "center"}
            leftIcon={<FaRobot />}
            fontWeight="normal"
            bg={
              isActive("/app/ailab")
                ? "linear-gradient(90deg, hsl(297deg 63% 46%) 0%, hsl(309deg 64% 49%) 0%, hsl(318deg 72% 53%) -1%, hsl(326deg 80% 58%) -1%, hsl(333deg 88% 62%) -1%, hsl(340deg 94% 66%) 0%, hsl(347deg 99% 70%) 0%, hsl(354deg 100% 73%) 1%, hsl(2deg 100% 75%) 4%, hsl(8deg 100% 75%) 8%, hsl(14deg 100% 75%) 17%, hsl(19deg 100% 76%) 49%, hsl(23deg 98% 77%) 100%)"
                : "transparent"
            }
            color={isActive("/app/ailab") ? "white" : "black"}
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
            color={isActive("/app/keymanagement") ? "white" : "black"}
            justifyContent={isOpen ? "flex-start" : "center"}
            leftIcon={<FaKey />}
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
            color={isActive("/app/billing") ? "white" : "black"}
            justifyContent={isOpen ? "flex-start" : "center"}
            leftIcon={<FaMoneyBill />}
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
            {isOpen && "Billing"}
          </Button>

          <Divider my="4" />

          <Text
            fontSize="sm"
            color="gray.500"
            pl={isOpen ? "4" : "0"}
            textAlign={isOpen ? "left" : "center"}
          >
            More
          </Text>

          <Button
            as={Link}
            to="/app/settings"
            variant="ghost"
            color={isActive("/app/settings") ? "white" : "black"}
            justifyContent={isOpen ? "flex-start" : "center"}
            leftIcon={<FaCog />}
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
            to="/app/helpcenter"
            variant="ghost"
            color={isActive("/app/helpcenter") ? "white" : "black"}
            justifyContent={isOpen ? "flex-start" : "center"}
            leftIcon={<FaQuestionCircle />}
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
            {isOpen && "Help Center"}
          </Button>
          <Button
            as={Link}
            to="/app/documentation"
            variant="ghost"
            color={isActive("/app/documentation") ? "white" : "black"}
            justifyContent={isOpen ? "flex-start" : "center"}
            leftIcon={<FaBook />}
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
          <Divider my="2" />
          <Button
            as={Link}
            to="/"
            variant="ghost"
            color={isActive("/") ? "white" : "black"}
            justifyContent={isOpen ? "flex-start" : "center"}
            leftIcon={<FaSignOutAlt />}
            fontWeight="normal"
            bg={
              isActive("/")
                ? "linear-gradient(90deg, hsl(297deg 63% 46%) 0%, hsl(309deg 64% 49%) 0%, hsl(318deg 72% 53%) -1%, hsl(326deg 80% 58%) -1%, hsl(333deg 88% 62%) -1%, hsl(340deg 94% 66%) 0%, hsl(347deg 99% 70%) 0%, hsl(354deg 100% 73%) 1%, hsl(2deg 100% 75%) 4%, hsl(8deg 100% 75%) 8%, hsl(14deg 100% 75%) 17%, hsl(19deg 100% 76%) 49%, hsl(23deg 98% 77%) 100%)"
                : "transparent"
            }
            _hover={{
              bg: "linear-gradient(90deg, hsl(297deg 63% 46%) 0%, hsl(309deg 64% 49%) 0%, hsl(318deg 72% 53%) -1%, hsl(326deg 80% 58%) -1%, hsl(333deg 88% 62%) -1%, hsl(340deg 94% 66%) 0%, hsl(347deg 99% 70%) 0%, hsl(354deg 100% 73%) 1%, hsl(2deg 100% 75%) 4%, hsl(8deg 100% 75%) 8%, hsl(14deg 100% 75%) 17%, hsl(19deg 100% 76%) 49%, hsl(23deg 98% 77%) 100%)",
              color: "white",
            }}
          >
            {isOpen && "Sign out"}
          </Button>
        </VStack>
      </Box>
      <IconButton
        icon={isOpen ? <FaChevronLeft /> : <FaChevronRight /> }
        onClick={onToggle}
        aria-label="Toggle Sidebar"
        size="sm"
        color={'white'}
        variant="outline"
        position="absolute"
        right="-17px" 
        top="8%"
        _hover={{ bg: primaryColorOrange, color: 'white' }}
        bg={primaryColorPurple}
        borderRadius={"full"}
        transform="translateY(-50%)"
        boxShadow="lg"
      />
    </Box>
  );
};

export default Sidebar;
