import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Components/Dashboard/Sidebar";

const DashboardLayout = () => {
  return (
    <Flex height="100vh" bg="gray.100">
      <Box w="250px" boxShadow="lg" bg="white">
        <Sidebar />
      </Box>
      <Box
        flex="1"
        bg="linear-gradient(
    150deg,
    hsl(192deg 29% 93%) 6%,
    hsl(198deg 74% 82%) 36%,
    hsl(202deg 92% 72%) 51%,
    hsl(205deg 98% 76%) 65%,
    hsl(208deg 99% 89%) 80%,
    hsl(0deg 0% 100%) 100%
  )"
        // p="6"
        boxShadow="lg"
        borderRadius="md"
        // margin="4"
        overflowY="auto"
      >
        <Outlet />
      </Box>
    </Flex>
  );
};

export default DashboardLayout;
