import { 
  Box, Heading, Text, VStack, Button, Flex, Table, Thead, 
  Tbody, Tr, Th, Td, Tag, IconButton, HStack, Card, CardBody,
  SimpleGrid, Icon
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { FiClock, FiCalendar, FiList, FiRefreshCw, FiPlus, FiEdit, FiTrash2, FiUsers } from 'react-icons/fi';

// Datos de horario de ejemplo
const mockSchedule = [
  { day: 'Lunes', entry: '08:00', departure: '17:00', break: '1 hora', status: 'Activo' },
  { day: 'Martes', entry: '08:00', departure: '17:00', break: '1 hora', status: 'Activo' },
  { day: 'Miércoles', entry: '08:00', departure: '17:00', break: '1 hora', status: 'Activo' },
  { day: 'Jueves', entry: '08:00', departure: '17:00', break: '1 hora', status: 'Activo' },
  { day: 'Viernes', entry: '08:00', departure: '15:00', break: '30 min', status: 'Activo' },
  { day: 'Sábado', entry: 'N/A', departure: 'N/A', break: 'N/A', status: 'Libre' },
  { day: 'Domingo', entry: 'N/A', departure: 'N/A', break: 'N/A', status: 'Libre' },
];

const mockAllSchedules = [
  { id: 1, employee: 'Juan Pérez', position: 'Desarrollador', schedule: 'Lun-Vie 8:00-17:00', status: 'Activo' },
  { id: 2, employee: 'María García', position: 'Diseñadora', schedule: 'Lun-Vie 9:00-18:00', status: 'Activo' },
  { id: 3, employee: 'Carlos López', position: 'Gerente', schedule: 'Lun-Vie 8:00-16:00', status: 'Activo' },
  { id: 4, employee: 'Ana Martínez', position: 'Analista', schedule: 'Lun-Vie 8:00-17:00', status: 'Activo' },
];

export default function HorarioView() {
  const [userRole, setUserRole] = useState('');
  const [scheduleData, setScheduleData] = useState(mockSchedule);
  const [allSchedules, setAllSchedules] = useState(mockAllSchedules);
  const [isTableView, setIsTableView] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem('user_role');
    setUserRole(role || '');
  }, []);

  const isAdmin = userRole === 'admin';

  const handleRefresh = () => {
    console.log('Refrescando datos de horario...');
    if (isAdmin) {
      setAllSchedules([]);
      setTimeout(() => setAllSchedules(mockAllSchedules), 1000);
    } else {
      setScheduleData([]);
      setTimeout(() => setScheduleData(mockSchedule), 1000);
    }
  };

  const handleCreateSchedule = () => console.log('Crear nuevo horario');
  const handleEditSchedule = (id) => console.log('Editar horario:', id);
  const handleDeleteSchedule = (id) => console.log('Eliminar horario:', id);
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Activo': return 'teal';
      case 'Libre': return 'gray';
      default: return 'red';
    }
  };

  // VISTA ADMINISTRADOR
  if (isAdmin) {
    return (
      <Box p={6} bg="gray.50" minH="100vh">
        {/* Header - EXACTAMENTE igual que ProjectsView */}
        <Flex justify="space-between" align="center" mb={8}>
          <Box>
            <Heading size="xl" color="gray.800">Gestión de Horarios</Heading>
            <Text color="gray.600" mt={1}>Administra horarios de trabajo para todos los empleados</Text>
          </Box>
          <HStack>
            <Button leftIcon={<FiPlus />} colorScheme="teal" onClick={handleCreateSchedule}>
              Asignar Horario
            </Button>
            <Button leftIcon={<FiRefreshCw />} colorScheme="blue" variant="outline" onClick={handleRefresh}>
              Actualizar
            </Button>
          </HStack>
        </Flex>

        {/* Métricas - EXACTAMENTE igual que ProjectsView */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
          <Card shadow="lg" borderRadius="xl" borderTop="4px" borderColor="teal.500">
            <CardBody p={5}>
              <HStack justify="space-between" mb={2}>
                <Icon as={FiUsers} w={8} h={8} color="teal.500" />
                <Text fontSize="3xl" fontWeight="bold">4</Text>
              </HStack>
              <Text fontSize="sm" color="gray.600">Empleados Activos</Text>
              <Text fontSize="xs" color="gray.500" mt={1}>Con horario asignado</Text>
            </CardBody>
          </Card>

          <Card shadow="lg" borderRadius="xl" borderTop="4px" borderColor="blue.500">
            <CardBody p={5}>
              <HStack justify="space-between" mb={2}>
                <Icon as={FiClock} w={8} h={8} color="blue.500" />
                <Text fontSize="3xl" fontWeight="bold">40h</Text>
              </HStack>
              <Text fontSize="sm" color="gray.600">Horas Semanales</Text>
              <Text fontSize="xs" color="gray.500" mt={1}>Promedio por empleado</Text>
            </CardBody>
          </Card>

          <Card shadow="lg" borderRadius="xl" borderTop="4px" borderColor="green.500">
            <CardBody p={5}>
              <HStack justify="space-between" mb={2}>
                <Icon as={FiCalendar} w={8} h={8} color="green.500" />
                <Text fontSize="3xl" fontWeight="bold">100%</Text>
              </HStack>
              <Text fontSize="sm" color="gray.600">Cumplimiento</Text>
              <Text fontSize="xs" color="gray.500" mt={1}>Esta semana</Text>
            </CardBody>
          </Card>

          <Card shadow="lg" borderRadius="xl" borderTop="4px" borderColor="orange.500">
            <CardBody p={5}>
              <HStack justify="space-between" mb={2}>
                <Icon as={FiList} w={8} h={8} color="orange.500" />
                <Text fontSize="3xl" fontWeight="bold">0</Text>
              </HStack>
              <Text fontSize="sm" color="gray.600">Ajustes Pendientes</Text>
              <Text fontSize="xs" color="gray.500" mt={1}>Sin cambios esta semana</Text>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Tabla de horarios */}
        <Box p={6} shadow="lg" borderRadius="xl" bg="white">
          <Heading size="md" mb={4}>Horarios Asignados</Heading>
          <Table variant="simple">
            <Thead bg="gray.50">
              <Tr>
                <Th>Empleado</Th>
                <Th>Cargo</Th>
                <Th>Horario</Th>
                <Th>Estado</Th>
                <Th textAlign="center">Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {allSchedules.map((item) => (
                <Tr key={item.id} _hover={{ bg: 'gray.50' }}>
                  <Td fontWeight="bold">{item.employee}</Td>
                  <Td>{item.position}</Td>
                  <Td>{item.schedule}</Td>
                  <Td>
                    <Tag size="sm" colorScheme={getStatusColor(item.status)}>
                      {item.status}
                    </Tag>
                  </Td>
                  <Td>
                    <Flex gap={2} justify="center">
                      <IconButton
                        aria-label="Editar"
                        icon={<FiEdit />}
                        size="sm"
                        colorScheme="blue"
                        variant="ghost"
                        onClick={() => handleEditSchedule(item.id)}
                      />
                      <IconButton
                        aria-label="Eliminar"
                        icon={<FiTrash2 />}
                        size="sm"
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => handleDeleteSchedule(item.id)}
                      />
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    );
  }

  // VISTA PRACTICANTE
  return (
    <Box p={6} bg="gray.50" minH="100vh">
      {/* Header - EXACTAMENTE igual que ProjectsView */}
      <Flex justify="space-between" align="center" mb={8}>
        <Box>
          <Heading size="xl" color="gray.800">Mi Horario</Heading>
          <Text color="gray.600" mt={1}>Mi horario laboral semanal como practicante</Text>
        </Box>
        <HStack>
          <Button 
            leftIcon={isTableView ? <FiCalendar /> : <FiList />} 
            onClick={() => setIsTableView(!isTableView)}
            colorScheme="teal"
          >
            {isTableView ? "Ver Calendario" : "Ver Tabla"}
          </Button>
        </HStack>
      </Flex>

      {/* Métricas - EXACTAMENTE igual que ProjectsView */}
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6} mb={8}>
        <Card shadow="lg" borderRadius="xl" borderTop="4px" borderColor="teal.500">
          <CardBody textAlign="center" p={5}>
            <Text fontSize="3xl" fontWeight="bold" color="teal.600">40h</Text>
            <Text fontSize="sm" color="gray.600">Horas Semanales</Text>
          </CardBody>
        </Card>

        <Card shadow="lg" borderRadius="xl" borderTop="4px" borderColor="blue.500">
          <CardBody textAlign="center" p={5}>
            <Text fontSize="3xl" fontWeight="bold" color="blue.600">5</Text>
            <Text fontSize="sm" color="gray.600">Días Laborales</Text>
          </CardBody>
        </Card>

        <Card shadow="lg" borderRadius="xl" borderTop="4px" borderColor="green.500">
          <CardBody textAlign="center" p={5}>
            <Text fontSize="3xl" fontWeight="bold" color="green.600">100%</Text>
            <Text fontSize="sm" color="gray.600">Asistencia</Text>
          </CardBody>
        </Card>

        <Card shadow="lg" borderRadius="xl" borderTop="4px" borderColor="orange.500">
          <CardBody textAlign="center" p={5}>
            <Text fontSize="3xl" fontWeight="bold" color="orange.600">0</Text>
            <Text fontSize="sm" color="gray.600">Ausencias</Text>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Contenido principal */}
      <Box p={6} shadow="lg" borderRadius="xl" bg="white">
        {isTableView ? (
          <VStack align="stretch" spacing={4}>
            <Heading size="md" mb={4}>Mi Horario Semanal</Heading>
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
                  {scheduleData.map((item) => (
                    <Tr key={item.day} _hover={{ bg: 'gray.50' }}>
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
                  ))}
                </Tbody>
              </Table>
            </Box>
          </VStack>
        ) : (
          <Flex direction="column" align="center" justify="center" h="300px">
            <FiCalendar size="3em" color="#319795" />
            <Text mt={4} fontSize="lg" color="gray.500">
              Vista de calendario (pendiente de implementar)
            </Text>
          </Flex>
        )}
      </Box>
    </Box>
  );
}