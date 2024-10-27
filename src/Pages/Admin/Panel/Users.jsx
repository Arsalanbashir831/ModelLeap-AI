import React from "react";
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
import { FlagIcon } from "react-flag-kit";
import Header from "../../../Components/Dashboard/Header";
import { useTheme } from "../../../Themes/ThemeContext";

const UserTable = () => {
  const { theme } = useTheme();

  const data = React.useMemo(
    () => [
      {
        user: {
          name: "Yiorgos Avraamu",
          avatar: "https://bit.ly/dan-abramov",
          status: "New",
          registered: "Registered: Jan 10, 2023",
        },
        country: "US",
        usage: 20,
        usageDate: "Jun 11, 2023 - Jul 10, 2023",
        subscriptionType: "Free",
        generations: "10",
      },
      {
        user: {
          name: "Avram Tarasios",
          avatar: "https://bit.ly/ryan-florence",
          status: "Recurring",
          registered: "Registered: Jan 10, 2023",
        },
        country: "BR",
        usage: 80,
        usageDate: "Jun 11, 2023 - Jul 10, 2023",
        subscriptionType: "Premium",
        generations: "15",
      },
      {
        user: {
          name: "John Doe",
          avatar: "https://bit.ly/prosper-baba",
          status: "New",
          registered: "Registered: Jan 10, 2023",
        },
        country: "IN",
        usage: 50,
        usageDate: "Jun 11, 2023 - Jul 10, 2023",
        subscriptionType: "Standard",
        generations: "8",
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "User",
        accessor: "user",
        Cell: ({ value }) => (
          <Flex align="center">
            <Avatar src={value.avatar} size="sm" mr={3} />
            <Box>
              <Text fontWeight="bold" color={theme.textColor}>
                {value.name}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {value.status} | {value.registered}
              </Text>
            </Box>
          </Flex>
        ),
      },
      // {
      //   Header: "Country",
      //   accessor: "country",
      //   Cell: ({ value }) => (
      //     <FlagIcon code={value} size={24} style={{ borderRadius: "50%" }} />
      //   ),
      // },
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
              value === "Premium"
                ? "blue.500"
                : value === "Standard"
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
      <Box
        overflowX="auto"
        p={5}
       
        borderRadius="lg"
        boxShadow="lg"
      >
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
