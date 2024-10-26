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
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
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
        paymentMethod: "Mastercard",
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
        paymentMethod: "Visa",
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
        paymentMethod: "Mastercard",
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
              <Text fontSize="sm" color={theme.textColor}>
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
            <Text fontSize="xs" color={theme.textColor}>
              {row.original.usageDate}
            </Text>
          </Box>
        ),
      },
      {
        Header: "No of Image Generated",
        accessor: "generations",
        Cell: ({ value }) => (
          <Text fontSize="sm" color={theme.textColor}>
            {value}
          </Text>
        ),
      },
      {
        Header: "Payment Method",
        accessor: "paymentMethod",
        Cell: ({ value }) =>
          value === "Visa" ? (
            <FaCcVisa size={24} color={theme.iconColor} title={value} />
          ) : (
            <FaCcMastercard size={24} color={theme.iconColor} title={value} />
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
        bg={theme.backgroundAilab}
        borderRadius="lg"
        boxShadow="lg"
      >
        <Table
          variant="simple"
          {...getTableProps()}
          bg={theme.integrationBoxBg}
          borderColor={theme.integrationBoxBorder}
        >
          <Thead bg="gray.100">
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th
                    {...column.getHeaderProps()}
                    fontSize="sm"
                    fontWeight="bold"
                    color={theme.textColor}
                    borderColor={theme.sideBarDividerColor}
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
