import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Components/Dashboard/Sidebar";

const DashboardLayout = () => {
  return (
    <Flex height="100vh" direction={["column", "row"]} bg="gray.100">
      <Box w={["100%", "250px"]} boxShadow="lg" bg="white" h={["auto", "100vh"]}>
        <Sidebar />
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
        p={["2", "8"]}
      >
        <Outlet />
      </Box>
    </Flex>
  );
};

export default DashboardLayout;
