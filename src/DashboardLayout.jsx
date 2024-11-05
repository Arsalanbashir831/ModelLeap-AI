import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Components/Dashboard/Sidebar";
import { useTheme } from "./Themes/ThemeContext";

const DashboardLayout = () => { 
  const {theme} = useTheme();
  
  return (
    <Flex height="100%"  direction={["row", "row"]} >
    <Sidebar/>
      {/* <Box 
      height={["100vh", "100vh"]}
        w={["100%", "250px"]}
        flex={isOpen ? "0 0 250px" : "0 0 80px"}
        transition={"width 0.3s ease"}
        boxShadow="lg"
 
        bg={theme.background}
      >
        <Sidebar isOpen={isOpen} onToggle={onToggle} />
      </Box>     */}
        <Box height={'100vh'} w={'100%'}
   
        bg={theme.background}
        overflowY="auto"
        p={["2", "8"]}
      >
        <Outlet />
      </Box>
    </Flex>
  );
};

export default DashboardLayout;
