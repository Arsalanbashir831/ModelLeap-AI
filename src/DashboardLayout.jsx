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
    145deg,
    hsl(198deg 77% 53%) 0%,
    hsl(200deg 75% 60%) 0%,
    hsl(201deg 74% 65%) 1%,
    hsl(202deg 74% 69%) 2%,
    hsl(203deg 73% 73%) 3%,
    hsl(204deg 73% 77%) 4%,
    hsl(204deg 73% 80%) 5%,
    hsl(205deg 72% 84%) 7%,
    hsl(205deg 72% 87%) 9%,
    hsl(205deg 72% 90%) 11%,
    hsl(206deg 72% 94%) 14%,
    hsl(206deg 72% 97%) 18%,
    hsl(0deg 0% 100%) 22%,
    hsl(221deg 50% 96%) 28%,
    hsl(221deg 50% 91%) 34%,
    hsl(220deg 50% 87%) 42%,
    hsl(219deg 50% 83%) 49%,
    hsl(219deg 50% 79%) 57%,
    hsl(218deg 50% 74%) 65%,
    hsl(217deg 50% 70%) 71%,
    hsl(216deg 50% 65%) 78%,
    hsl(215deg 51% 60%) 84%,
    hsl(213deg 52% 55%) 90%,
    hsl(210deg 56% 49%) 95%,
    hsl(204deg 100% 37%) 100%
  )"
        overflowY="auto"
      >
        <Outlet />
      </Box>
    </Flex>
  );
};

export default DashboardLayout;
