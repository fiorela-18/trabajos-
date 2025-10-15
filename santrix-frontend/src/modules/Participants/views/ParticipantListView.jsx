import { 
  Box, Heading, Button, Flex, Spacer, Input, InputGroup, 
  InputLeftElement, Select, Table, Thead, Tbody, Tr, Th, Td, 
  TableContainer, Tag, Center
} from '@chakra-ui/react';
import { FiPlus, FiSearch } from 'react-icons/fi';
import React from 'react';

// Datos de ejemplo para participantes en capacitaciones
const participants = [
    { id: 101, name: 'Luisa Fernanda', course: 'Liderazgo Ágil', status: 'Completado', date: '2024-05-15' },
    { id: 102, name: 'Miguel Ángel', course: 'Análisis de Datos', status: 'En Curso', date: '2024-06-01' },
    { id: 103, name: 'Sofía Elena', course: 'Comunicación Efectiva', status: 'Pendiente', date: '2024-07-20' },
    { id: 104, name: 'David Santiago', course: 'Seguridad Informática', status: 'Completado', date: '2024-05-28' },
];

const getStatusColor = (status) => {
    switch (status) {
        case 'Completado': return 'teal';
        case 'En Curso': return 'blue';
        case 'Pendiente': return 'orange';
        default: return 'gray';
    }
};

export default function ParticipantListView() {
  return (
    <Box p={6}>
      <Flex mb={6} align="center">
        <Heading size="lg">Participantes en Capacitaciones ({participants.length})</Heading>
        <Spacer />
        <Button leftIcon={<FiPlus />} colorScheme="blue" onClick={() => alert('Abrir Modal de Inscripción')}>
          Inscribir Participante
        </Button>
      </Flex>

      {/* Barra de Filtros y Búsqueda */}
      <Flex mb={6} p={4} bg="white" borderRadius="lg" shadow="sm">
        <InputGroup w="300px" mr={4}>
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.300" />
          </InputLeftElement>
          <Input placeholder="Buscar por nombre o curso..." />
        </InputGroup>

        <Select placeholder="Filtrar por Curso" w="220px" mr={4}>
          <option value="Liderazgo">Liderazgo Ágil</option>
          <option value="Datos">Análisis de Datos</option>
          <option value="Comunicacion">Comunicación Efectiva</option>
        </Select>
        
        <Select placeholder="Filtrar por Estado" w="180px">
          <option value="Completado">Completado</option>
          <option value="En Curso">En Curso</option>
          <option value="Pendiente">Pendiente</option>
        </Select>
      </Flex>

      {/* Tabla de Participantes */}
      <Box bg="white" borderRadius="lg" shadow="md">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr bg="gray.50">
                <Th>Nombre del Participante</Th>
                <Th>Curso</Th>
                <Th>Fecha de Inicio</Th>
                <Th>Estado</Th>
                <Th textAlign="center">Acciones</Th>
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
                    <Button size="sm" variant="outline" mr={2}>Ver Certificado</Button>
                    <Button size="sm" colorScheme="blue" variant="ghost">Detalles</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        {participants.length === 0 && (
            <Center py={10}>No se encontraron participantes.</Center>
        )}
      </Box>
    </Box>
  );
}