import {
  Box,
  VStack,
  Button,
  Icon,
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
} from "react-icons/fa";


const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <Box
      w="250px"
      bgGradient="linear-gradient(
        300deg,
        hsl(298deg 62% 85%) 0%,
        hsl(298deg 62% 87%) 3%,
        hsl(298deg 62% 90%) 9%,
        hsl(299deg 62% 92%) 20%,
        hsl(299deg 62% 95%) 41%,
        hsl(299deg 62% 97%) 77%,
        hsl(0deg 0% 100%) 100%
      )"
      p="4"
      boxShadow="md"
      borderRadius="lg"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box display="flex" flexDirection="column">
        <Image src="/model_leap.png" alt="Model Leap Logo" width={"80%"} />
        <VStack mt={"4"} spacing="1" align="stretch">
          <Button
            as={Link}
            to="/app"
            variant="ghost"
            justifyContent="flex-start"
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
            AI Playground
          </Button>

          <Button
            as={Link}
            to="/app/ailab"
            variant="ghost"
            justifyContent="flex-start"
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
            AI Lab
          </Button>


          <Button
            as={Link}
            variant="ghost"
            to="/app/keymanagement"
            color={isActive("/app/keymanagement") ? "white" : "black"}
            justifyContent="flex-start"
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
            Key Management
          </Button>
          <Button
            as={Link}
            variant="ghost"
            to="/app/billing"
            color={isActive("/app/billing") ? "white" : "black"}
            justifyContent="flex-start"
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
            Billing
          </Button>

          <Divider my="4" />

          <Text fontSize="sm" color="gray.500" pl="4">
            More
          </Text>

          <Button
            as={Link}
            to="/app/settings"
            variant="ghost"
            color={isActive("/app/settings") ? "white" : "black"}
            justifyContent="flex-start"
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
            Settings
          </Button>
          <Button
            as={Link}
            to="/app/helpcenter"
            variant="ghost"
            color={isActive("/app/helpcenter") ? "white" : "black"}
            justifyContent="flex-start"
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
            Help Center
          </Button>
          <Button
            as={Link}
            to="/app/documentation"
            variant="ghost"
            color={isActive("/app/documentation") ? "white" : "black"}
            justifyContent="flex-start"
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
            Documentation
          </Button>
          <Divider my="2" />
          <Button
            as={Link}
            to="/"
            variant="ghost"
            color={isActive("/") ? "white" : "black"}
            justifyContent="flex-start"
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
            Logout
          </Button>
        </VStack>
      </Box>
      <Box mt="auto"></Box>
    </Box>
  );
};

export default Sidebar;
