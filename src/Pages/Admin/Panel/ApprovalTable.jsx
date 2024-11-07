import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  Text,
  Flex,
  Button,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Image,
  Spinner,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { useTable } from 'react-table';
import { FaCheckCircle, FaTimesCircle, FaHistory } from 'react-icons/fa';
import Header from "../../../Components/Dashboard/Header";
import { useTheme } from '../../../Themes/ThemeContext';
import { BASE_URL } from '../../../Constants';

const UserTableWithActions = () => {
  const { theme } = useTheme();
  const [approvalRequests, setApprovalRequests] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [disapproveReason, setDisapproveReason] = useState(''); // Track disapproval reason
  const [selectedChatId, setSelectedChatId] = useState(null); // Track the selected chat ID for disapproval
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDisapproveOpen, onOpen: onDisapproveOpen, onClose: onDisapproveClose } = useDisclosure(); // Disapprove modal
  const [loading , setLoading] = useState(false);

  const fetchApprovalRequests = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${BASE_URL}/admin/approval-chats/pending`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setApprovalRequests(data.pendingChats);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApprovalRequests();
  }, []);

  const statusUpdateHandler = async (id, status, reason = null) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${BASE_URL}/admin/approval-chats/${id}/${status}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ disapproveReason:reason }), 
      });
      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDisapproveClick = (id) => {
    setSelectedChatId(id); // Set the selected chat ID
    onDisapproveOpen(); // Open the disapprove modal
  };

  const handleConfirmDisapprove = () => {
    statusUpdateHandler(selectedChatId, 'disapprove', disapproveReason); // Call with reason
    setDisapproveReason(''); // Clear reason input
    onDisapproveClose(); // Close disapprove modal
  };

  const handleHistory = async (data) => {
    const { chatId, botId, apiKey } = data;
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${BASE_URL}/api/bot/${botId}/chat/${chatId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'x-api-key': apiKey
        }
      });
      if (response.ok) {
        const data = await response.json();
        setHistoryData(data.messages); // Set the history data
        onOpen(); // Open the modal
      }
    } catch (error) {
      console.log(error);
    }
  };

  const data = React.useMemo(
    () =>
      approvalRequests.map((request) => ({
        user: {
          name: request.name,
          status: request.status,
          registered: new Date(request.createdAt._seconds * 1000).toLocaleDateString(),
        },
        context: request.systemContext,
        statusBadge: request.status,
        approvalAction: request.chatId,
        declineAction: request.chatId,
        historyAction: { 'chatId': request.chatId, 'botId': request.botId, 'apiKey': request.apiKey },
      })),
    [approvalRequests]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Chats',
        accessor: 'user',
        Cell: ({ value }) => (
          <Flex align="center">
            <Avatar name={value.name} size="sm" mr={3} />
            <Box>
              <Text fontWeight="bold" color={theme.textColor}>
                {value.name}
              </Text>
              <Text fontSize="sm" color="gray.500">
                Status: {value.status} | Created: {value.registered}
              </Text>
            </Box>
          </Flex>
        ),
      },
      {
        Header: 'Context',
        accessor: 'context',
        Cell: ({ value }) => (
          <Flex align="center">
              <Text fontWeight="medium" color={theme.textColor}>
                {value}
              </Text>
          </Flex>
        ),
      },
      {
        Header: 'Status',
        accessor: 'statusBadge',
        Cell: ({ value }) => (
          <Badge
            colorScheme={
              value === 'approved'
                ? 'green'
                : value === 'pending'
                ? 'yellow'
                : 'red'
            }
            variant="subtle"
            px={2}
            py={1}
            borderRadius="md"
            fontSize="0.8em"
          >
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Badge>
        ),
      },
      {
        Header: 'Approval',
        accessor: 'approvalAction',
        Cell: ({ value }) => (
          <Button
            colorScheme="green"
            size="sm"
            leftIcon={<FaCheckCircle />}
            onClick={() => statusUpdateHandler(value, 'approve')}
          >
            Approve
          </Button>
        ),
      },
      {
        Header: 'Decline',
        accessor: 'declineAction',
        Cell: ({ value }) => (
          <Button
            colorScheme="red"
            size="sm"
            leftIcon={<FaTimesCircle />}
            onClick={() => handleDisapproveClick(value)}
          >
            Decline
          </Button>
        ),
      },
      {
        Header: 'History',
        accessor: 'historyAction',
        Cell: ({ value }) => (
          <Button
            colorScheme="blue"
            size="sm"
            variant="outline"
            leftIcon={<FaHistory />}
            onClick={() => handleHistory(value)}
          >
            History
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
      <Header title="Approval Table" isTitle={true} />
      {loading ? <Spinner size="xl" /> : <>
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
                  <Tr {...row.getRowProps()} borderColor={theme.sideBarDividerColor}>
                    {row.cells.map((cell) => (
                      <Td
                        {...cell.getCellProps()}
                        color={theme.textColor}
                        borderColor={theme.sideBarDividerColor}
                      >
                        {cell.render('Cell')}
                      </Td>
                    ))}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Box>
      </>}

      {/* Modal for History */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chat History</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {historyData.length > 0 ? (
              historyData.map((entry) => (
                <Box key={entry.id} mb={4} p={3} bg="gray.100" borderRadius="md">
                  <Text fontWeight="bold" color={entry.role === 'user' ? 'blue.500' : 'green.500'}>
                    {entry.role === 'user' ? 'User' : 'Assistant'}
                  </Text>
                  {entry.content.startsWith('https://') ? (
                    <Image src={entry.content} alt="Generated Image" maxWidth="150px" borderRadius="md" border={`2px solid ${theme.iconColor}`} />
                  ) : (
                    <Text>{entry.content}</Text>
                  )}
                  <Text fontSize="xs" color="gray.500">
                    {new Date(entry.timestamp._seconds * 1000).toLocaleString()}
                  </Text>
                </Box>
              ))
            ) : (
              <Text>No history available.</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal for Disapproval Reason */}
      <Modal isOpen={isDisapproveOpen} onClose={onDisapproveClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Disapprove Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={3}>Please provide a reason for disapproving this chat:</Text>
            <Textarea
              value={disapproveReason}
              onChange={(e) => setDisapproveReason(e.target.value)}
              placeholder="Enter reason for disapproval"
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onDisapproveClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              onClick={handleConfirmDisapprove}
              isDisabled={!disapproveReason.trim()}
            >
              Disapprove
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserTableWithActions;
