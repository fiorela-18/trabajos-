import { 
  Box, Heading, Text, VStack, Button, Flex, Spacer, Table, Thead, 
  Tbody, Tr, Th, Td, Tag, IconButton, useColorModeValue 
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FiClock, FiCalendar, FiList, FiRefreshCw } from 'react-icons/fi';

// Datos de horario de ejemplo: Simula un horario fijo semanal
const mockSchedule = [
  { day: 'Lunes', entry: '08:00', departure: '17:00', break: '1 hora', status: 'Activo' },
  { day: 'Martes', entry: '08:00', departure: '17:00', break: '1 hora', status: 'Activo' },
  { day: 'Miércoles', entry: '08:00', departure: '17:00', break: '1 hora', status: 'Activo' },
  { day: 'Jueves', entry: '08:00', departure: '17:00', break: '1 hora', status: 'Activo' },
  { day: 'Viernes', entry: '08:00', departure: '15:00', break: '30 min', status: 'Activo' },
  { day: 'Sábado', entry: 'N/A', departure: 'N/A', break: 'N/A', status: 'Libre' },
  { day: 'Domingo', entry: 'N/A', departure: 'N/A', break: 'N/A', status: 'Libre' },
];

export default function HorarioView() {
  const [scheduleData, setScheduleData] = useState(mockSchedule);
  const [isTableView, setIsTableView] = useState(true); // Cambiar entre tabla y calendario
  const cardBg = useColorModeValue('white', 'gray.800');

  // Función simulada de actualización
  const handleRefresh = () => {
    // Aquí iría la lógica para refrescar los datos desde el backend
    console.log('Refrescando datos de horario...');
    // Simulación de carga
    setScheduleData([]);
    setTimeout(() => {
        setScheduleData(mockSchedule);
    }, 1000);
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Activo':
        return 'teal';
      case 'Libre':
        return 'gray';
      default:
        return 'red';
    }
  };

  return (
    <Box p={6}>
      <Flex mb={8} align="center">
        <Heading size="lg" display="flex" alignItems="center">
          <FiClock style={{ marginRight: '10px' }} />
          Mi Horario y Turnos
        </Heading>
        <Spacer />
        <Flex gap={2}>
            <IconButton
                aria-label="Refrescar Horario"
                icon={<FiRefreshCw />}
                onClick={handleRefresh}
                colorScheme="teal"
                variant="outline"
                title="Actualizar Datos"
            />
            <Button 
                leftIcon={isTableView ? <FiCalendar /> : <FiList />} 
                onClick={() => setIsTableView(!isTableView)}
                colorScheme="blue" 
                variant="solid"
            >
                {isTableView ? "Ver en Calendario" : "Ver en Tabla"}
            </Button>
        </Flex>
      </Flex>

      <Box 
        p={6} 
        borderWidth={1} 
        borderRadius="lg" 
        bg={cardBg} 
        shadow="xl"
        minH="400px"
      >
        {isTableView ? (
          <VStack align="stretch" spacing={4}>
            <Text fontSize="md" color="gray.600">
                Detalle de su horario laboral semanal.
            </Text>
            
            <Box overflowX="auto">
                <Table variant="simple">
                    <Thead bg="gray.50">
                        <Tr>
                            <Th>Día</Th>
                            <Th>Hora de Entrada</Th>
                            <Th>Hora de Salida</Th>
                            <Th>Descanso</Th>
                            <Th>Estado</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {scheduleData.length > 0 ? scheduleData.map((item) => (
                            <Tr key={item.day}>
                                <Td fontWeight="bold">{item.day}</Td>
                                <Td>{item.entry}</Td>
                                <Td>{item.departure}</Td>
                                <Td>{item.break}</Td>
                                <Td>
                                    <Tag size="sm" colorScheme={getStatusColor(item.status)}>
                                        {item.status}
                                    </Tag>
                                </Td>
                            </Tr>
                        )) : (
                            <Tr><Td colSpan={5} textAlign="center">Cargando horario...</Td></Tr>
                        )}
                    </Tbody>
                </Table>
            </Box>
          </VStack>
        ) : (
          <Flex direction="column" align="center" justify="center" h="100%">
            <FiCalendar size="3em" color="#319795" />
            <Text mt={4} fontSize="lg" color="gray.500">
                Aquí se implementaría la vista de calendario con `react-big-calendar` o similar.
            </Text>
          </Flex>
        )}
      </Box>
    </Box>
  );
}
