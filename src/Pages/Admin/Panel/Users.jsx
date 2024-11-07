import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Progress,
  Text,
  Flex,
  Select,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useTable } from "react-table";
import Header from "../../../Components/Dashboard/Header";
import { useTheme } from "../../../Themes/ThemeContext";
import { BASE_URL } from "../../../Constants";

const UserTable = () => {
  const { theme } = useTheme();
  const toast = useToast();
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(""); // State for selected subscription filter

  useEffect(() => {
    fetchUserData();
  }, [selectedPlan]); // Re-fetch data when the selected plan changes

  const fetchUserData = async () => {
    const token = localStorage.getItem("adminToken");
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/auth/get-users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      // Filter users based on the selected subscription plan
      const filteredData = selectedPlan
        ? data.filter((user) => user.subscriptionTier === selectedPlan)
        : data;

      setUserData(filteredData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (uid) => {
    const token = localStorage.getItem("adminToken");
    try {
      const response = await fetch(`${BASE_URL}/auth/delete-user/${uid}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

      });

      if (response.ok) {
      
        setUserData((prevData) => prevData.filter((user) => user.uid !== uid));
        toast({
          title: "User deleted successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        window.location.reload();
      } else {
        toast({
          title: "Failed to delete user",
          description: "An error occurred while deleting the user.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Something went wrong while deleting the user.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const data = React.useMemo(
    () =>
      userData.map((user) => ({
        user: {
          name: user.email,
          avatar: null,
          registered: `Token Count: ${user.tokenCount}`,
        },
        usage: user.tokenCount / 1000,
        usageDate: `Generated Images: ${user.imageGenerationCount}`,
        subscriptionType: user.subscriptionTier,
        generations: user.imageGenerationCount,
        uid: user.id, // Add the UID here for the delete button
      })),
    [userData]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "User",
        accessor: "user",
        Cell: ({ value }) => (
          <Flex align="center">
            <Avatar name={value.name} size="sm" mr={3} />
            <Box>
              <Text fontWeight="bold" color={theme.textColor}>
                {value.name}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {value.registered}
              </Text>
            </Box>
          </Flex>
        ),
      },
      {
        Header: "Token Usage",
        accessor: "usage",
        Cell: ({ row }) => (
          <Box>
            <Text fontSize="sm" mb={1} color={theme.textColor}>
              {row.original.usage}%
            </Text>
            <Progress
              value={row.original.usage}
              colorScheme={row.original.usage > 50 ? "green" : "red"}
              size="sm"
              borderRadius="md"
              backgroundColor={theme.AiChatBoxInnerBoxbg}
            />
            <Text fontSize="xs" color="gray.500">
              {row.original.usageDate}
            </Text>
          </Box>
        ),
      },
      {
        Header: "No of Images Generated",
        accessor: "generations",
        Cell: ({ value }) => (
          <Text fontSize="sm" color={theme.textColor}>
            {value}
          </Text>
        ),
      },
      {
        Header: "Subscription Type",
        accessor: "subscriptionType",
        Cell: ({ value }) => (
          <Text
            fontSize="sm"
            fontWeight="bold"
            color={
              value === "premium"
                ? "blue.500"
                : value === "standard"
                ? "orange.500"
                : "gray.500"
            }
          >
            {value}
          </Text>
        ),
      },
      {
        Header: "Actions",
        accessor: "uid",
        Cell: ({ value }) => (
          <Button
            colorScheme="red"
            size="sm"
            onClick={() => handleDelete(value)}
          >
            Delete
          </Button>
        ),
      },
    ],
    [theme]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <>
      <Header title="Users" isTitle={true} />

      {/* Subscription Plan Filter */}
      <Box mb={4}>
        <Select
          placeholder="Filter by Subscription Plan"
          value={selectedPlan}
          onChange={(e) => setSelectedPlan(e.target.value)}
          maxW="300px"
          bg="white"
          color={theme.textColor}
          borderColor={theme.integrationBoxBorder}
        >
          <option value="Free">Free</option>
          <option value="proMonthly">Pro Monthly</option>
          <option value="proYearly">Pro Yearly</option>
          <option value="premiumMonthly">Premium Monthly</option>
          <option value="premiumYearly">Premium Yearly</option>
        </Select>
      </Box>

      <Box overflowX="auto" p={5} borderRadius="lg" boxShadow="lg">
        <Table
          variant="simple"
          {...getTableProps()}
          bg={theme.integrationBoxBg}
          borderColor={theme.integrationBoxBorder}
        >
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th
                    {...column.getHeaderProps()}
                    fontSize="sm"
                    fontWeight="bold"
                    color={theme.textColor}
                    borderColor={theme.sideBarDividerColor}
                    p={4}
                  >
                    {column.render("Header")}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {loading ? (
              <Tr>
                <Td colSpan={columns.length}>
                  <Text textAlign="center">Loading...</Text>
                </Td>
              </Tr>
            ) : rows.length > 0 ? (
              rows.map((row) => {
                prepareRow(row);
                return (
                  <Tr {...row.getRowProps()} borderColor={theme.sideBarDividerColor}>
                    {row.cells.map((cell) => (
                      <Td
                        {...cell.getCellProps()}
                        color={theme.textColor}
                        borderColor={theme.sideBarDividerColor}
                        p={4}
                      >
                        {cell.render("Cell")}
                      </Td>
                    ))}
                  </Tr>
                );
              })
            ) : (
              <Tr>
                <Td colSpan={columns.length}>
                  <Text textAlign="center">No users found for this subscription plan.</Text>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

export default UserTable;
