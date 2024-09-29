import {
  Box,
  VStack,
  Button,
  Icon,
  Image,
  Divider,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  FaKey,
  FaMoneyBill,
  FaCog,
  FaQuestionCircle,
  FaBook,
  FaSignOutAlt,
  FaRobot,
} from "react-icons/fa";
import logo from "../../../public/model_leap.png";

const Sidebar = () => {
  return (
    <Box
      w="250px"
      bg="white"
      p="4"
      boxShadow="md"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box display="flex" flexDirection="column">
        <Image src={logo} alt="Model Leap Logo" width={"80%"} />
        <VStack mt={"4"} spacing="1" align="stretch">
          <Button
            as={Link}
            to="/app" 
            variant="ghost"
            justifyContent="flex-start"
            leftIcon={<FaRobot />}
            fontWeight="normal"
          >
            AI Playground
          </Button>
          <Button
            as={Link}
            to="/app/keymanagement"
            variant="ghost"
            justifyContent="flex-start"
            leftIcon={<FaKey />}
            fontWeight="normal"
          >
            Key Management
          </Button>
          <Button
            as={Link}
            to="/app/billing"
            variant="ghost"
            justifyContent="flex-start"
            leftIcon={<FaMoneyBill />}
            fontWeight="normal"
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
            justifyContent="flex-start"
            leftIcon={<FaCog />}
            fontWeight="normal"
          >
            Settings
          </Button>
          <Button
            as={Link}
            to="/app/helpcenter"
            variant="ghost"
            justifyContent="flex-start"
            leftIcon={<FaQuestionCircle />}
            fontWeight="normal"
          >
            Help Center
          </Button>
          <Button
            as={Link}
            to="/app/documentation"
            variant="ghost"
            justifyContent="flex-start"
            leftIcon={<FaBook />}
            fontWeight="normal"
          >
            Documentation
          </Button>
          <Divider my="2" />
          <Button
            as={Link}
            to="/"
            variant="ghost"
            justifyContent="flex-start"
            leftIcon={<FaSignOutAlt />}
            fontWeight="normal"
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
