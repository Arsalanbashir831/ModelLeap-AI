import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Components/Dashboard/Sidebar";

const DashboardLayout = () => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });
  return (
    <Flex height="100vh" direction={["column", "row"]} bg="gray.100">
      <Box
        w={["100%", "250px"]}
        flex={isOpen ? "0 0 250px" : "0 0 80px"}
        transition={"width 0.3s ease"}
        boxShadow="lg"
        bg="linear-gradient(
          300deg,
          hsl(298deg 62% 85%) 0%,
          hsl(298deg 62% 87%) 3%,
          hsl(298deg 62% 90%) 9%,
          hsl(299deg 62% 92%) 20%,
          hsl(299deg 62% 95%) 41%,
          hsl(299deg 62% 97%) 77%,
          hsl(0deg 0% 100%) 100%
        )"
        h={["auto", "100%"]}
      >
        <Sidebar isOpen={isOpen} onToggle={onToggle} />
      </Box>
      <Box
        flex="1"
        bg="linear-gradient(
          300deg,
          hsl(298deg 62% 85%) 0%,
          hsl(298deg 62% 87%) 3%,
          hsl(298deg 62% 90%) 9%,
          hsl(299deg 62% 92%) 20%,
          hsl(299deg 62% 95%) 41%,
          hsl(299deg 62% 97%) 77%,
          hsl(0deg 0% 100%) 100%
        )"
        overflowY="auto"
        // ml={isOpen ? ["250px", "0px"] : ["80px", "0px"]}
        // transition="margin-left 0.3s ease"
        p={["2", "8"]}
      >
        <Outlet />
      </Box>
    </Flex>
  );
};

export default DashboardLayout;
