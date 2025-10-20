import { 
  Box, Heading, Button, Flex, Spacer, Input, InputGroup, 
  InputLeftElement, Select, Table, Thead, Tbody, Tr, Th, Td, 
  TableContainer, Tag, Center
} from '@chakra-ui/react';
import { FiPlus, FiSearch } from 'react-icons/fi';
import React from 'react';

// Sample data for training participants
const participants = [
    { id: 101, name: 'Luisa Fernanda', course: 'Agile Leadership', status: 'Completed', date: '2024-05-15' },
    { id: 102, name: 'Miguel Ángel', course: 'Data Analysis', status: 'In Progress', date: '2024-06-01' },
    { id: 103, name: 'Sofía Elena', course: 'Effective Communication', status: 'Pending', date: '2024-07-20' },
    { id: 104, name: 'David Santiago', course: 'Cybersecurity', status: 'Completed', date: '2024-05-28' },
];

const getStatusColor = (status) => {
    switch (status) {
        case 'Completed': return 'teal';
        case 'In Progress': return 'blue';
        case 'Pending': return 'orange';
        default: return 'gray';
    }
};

export default function PractitionerListView() {
  return (
    <Box p={6}>
      <Flex mb={6} align="center">
        <Heading size="lg">Training Practitioners ({participants.length})</Heading>
        <Spacer />
        <Button leftIcon={<FiPlus />} colorScheme="blue" onClick={() => alert('Open Registration Modal')}>
          Register Practitioner
        </Button>
      </Flex>

      {/* Filters and Search Bar */}
      <Flex mb={6} p={4} bg="white" borderRadius="lg" shadow="sm">
        <InputGroup w="300px" mr={4}>
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.300" />
          </InputLeftElement>
          <Input placeholder="Search by name or course..." />
        </InputGroup>

        <Select placeholder="Filter by Course" w="220px" mr={4}>
          <option value="Leadership">Agile Leadership</option>
          <option value="Data">Data Analysis</option>
          <option value="Communication">Effective Communication</option>
        </Select>
        
        <Select placeholder="Filter by Status" w="180px">
          <option value="Completed">Completed</option>
          <option value="In Progress">In Progress</option>
          <option value="Pending">Pending</option>
        </Select>
      </Flex>

      {/* Practitioners Table */}
      <Box bg="white" borderRadius="lg" shadow="md">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr bg="gray.50">
                <Th>Practitioner Name</Th>
                <Th>Course</Th>
                <Th>Start Date</Th>
                <Th>Status</Th>
                <Th textAlign="center">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {participants.map((p) => (
                <Tr key={p.id} _hover={{ bg: 'gray.50' }} cursor="pointer">
                  <Td fontWeight="medium">{p.name}</Td>
                  <Td>{p.course}</Td>
                  <Td>{p.date}</Td>
                  <Td>
                    <Tag size="sm" colorScheme={getStatusColor(p.status)}>
                      {p.status}
                    </Tag>
                  </Td>
                  <Td textAlign="center">
                    <Button size="sm" variant="outline" mr={2}>View Certificate</Button>
                    <Button size="sm" colorScheme="blue" variant="ghost">Details</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        {participants.length === 0 && (
            <Center py={10}>No practitioners found.</Center>
        )}
      </Box>
    </Box>
  );
}