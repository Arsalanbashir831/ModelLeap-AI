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
} from "@chakra-ui/react";
import { useTable } from "react-table";
import Header from "../../../Components/Dashboard/Header";
import { useTheme } from "../../../Themes/ThemeContext";
import { BASE_URL } from "../../../Constants";

const UserTable = () => {
  const { theme } = useTheme();
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

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
      setUserData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Transform fetched userData to match the structure expected by the table
  const data = React.useMemo(
    () =>
      userData.map((user) => ({
        user: {
          name: user.email, // Display email as name
          avatar: null, // No URL for avatar, using initials from Chakra Avatar
          registered: `Token Count: ${user.tokenCount}`,
        },
        usage: user.tokenCount / 1000, // Example calculation for usage bar
        usageDate: `Generated Images: ${user.imageGenerationCount}`,
        subscriptionType: user.subscriptionTier,
        generations: user.imageGenerationCount,
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
    ],
    [theme]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <>
      <Header title="Users" isTitle={true} />
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
            {rows.map((row) => {
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
            })}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

export default UserTable;
