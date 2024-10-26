import React from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  Progress,
  Text,
  Flex,
  theme,
} from '@chakra-ui/react';
import { useTable } from 'react-table';
import { FaCcMastercard } from 'react-icons/fa';
import { FlagIcon } from 'react-flag-kit';
import Header from '../../../Components/Dashboard/Header'
import { useTheme } from '../../../Themes/ThemeContext'

const UserTable = () => {
  const data = React.useMemo(
    () => [
      {
        user: {
          name: 'Yiorgos Avraamu',
          avatar:
            'https://bit.ly/dan-abramov', 
          status: 'New',
          registered: 'Registered: Jan 10, 2023',
        },
        country: 'US',
        usage: 20,
        usageDate: 'Jun 11, 2023 - Jul 10, 2023',
        paymentMethod: 'Mastercard',
        generations: '10',
      },
      {
        user: {
          name: 'Yiorgos Avraamu',
          avatar:
            'https://bit.ly/dan-abramov', 
          status: 'New',
          registered: 'Registered: Jan 10, 2023',
        },
        country: 'US',
        usage: 80,
        usageDate: 'Jun 11, 2023 - Jul 10, 2023',
        paymentMethod: 'Visa',
        generations: '10',
      },
      {
        user: {
          name: 'Yiorgos Avraamu',
          avatar:
            'https://bit.ly/dan-abramov', 
          status: 'New',
          registered: 'Registered: Jan 10, 2023',
        },
        country: 'US',
        usage: 50,
        usageDate: 'Jun 11, 2023 - Jul 10, 2023',
        paymentMethod: 'Mastercard',
        generations: '10',
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'User',
        accessor: 'user',
        Cell: ({ value }) => (
          <Flex align="center">
            <Avatar src={value.avatar} size="sm" mr={3} />
            <Box>
              <Text fontWeight="bold" color={theme.textColor}>{value.name}</Text>
              <Text fontSize="sm" color={theme.textColor}>
                {value.status} | {value.registered}
              </Text>
            </Box>
          </Flex>
        ),
      },
      // {
      //   Header: 'Country',
      //   accessor: 'country',
      //   Cell: ({ value }) => (
      //     <FlagIcon code={value} size={24} style={{ borderRadius: '50%' }} />
      //   ),
      // },
      {
        Header: 'Usage',
        accessor: 'usage',
        Cell: ({ row }) => (
          <Box>
            <Text fontSize="sm" mb={1} color={theme.textColor}>
              {row.original.usage}%
            </Text>
            <Progress
              value={row.original.usage}
              colorScheme="green"
              size="sm"
              borderRadius="md"
            />
            <Text fontSize="xs" color={theme.textColor}>
              {row.original.usageDate}
            </Text>
          </Box>
        ),
      },
      {
        Header: 'No of Image Generated',
        accessor: 'generations',
        Cell: ({ value }) => (
          <Text fontSize="sm" color={theme.textColor}>
             <br />
            {value}
          </Text>
        ),
      },
      {
        Header: 'Payment Method',
        accessor: 'paymentMethod',
        Cell: ({ value }) => (
          <FaCcMastercard size={24} color="black" title={value} />
        ),
      },
      
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });


    const theme = useTheme();
  return (
    <>
    <Header title="Users" isTitle={true} />
    <Box overflowX="auto" p={5}>
      <Table variant="simple" {...getTableProps()}>
        <Thead bg="gray.100">
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  {...column.getHeaderProps()}
                  fontSize="sm"
                  fontWeight="bold"
                  color={theme.textColor}
                >
                  {column.render('Header')}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
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
