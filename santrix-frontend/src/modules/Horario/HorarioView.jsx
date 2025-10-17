import { 
  Box, Heading, Text, VStack, Button, Flex, Spacer, Table, Thead, 
  Tbody, Tr, Th, Td, Tag, IconButton, useColorModeValue 
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { FiClock, FiCalendar, FiList, FiRefreshCw, FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';

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

// Datos mock para vista de administrador (varios empleados)
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
  const cardBg = useColorModeValue('white', 'gray.800');

  useEffect(() => {
    const role = localStorage.getItem('user_role');
    setUserRole(role || '');
  }, []);

  const isAdmin = userRole === 'admin';

  // Función simulada de actualización
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

  // Funciones para Admin
  const handleCreateSchedule = () => {
    console.log('Crear nuevo horario');
    // TODO: Abrir modal o navegar a formulario
  };

  const handleEditSchedule = (id) => {
    console.log('Editar horario:', id);
    // TODO: Abrir modal con datos del horario
  };

  const handleDeleteSchedule = (id) => {
    console.log('Eliminar horario:', id);
    // TODO: Confirmar y eliminar
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

  // Vista de ADMINISTRADOR
  if (isAdmin) {
    return (
      <Box p={6}>
        <Flex mb={8} align="center">
          <Heading size="lg" display="flex" alignItems="center">
            <FiClock style={{ marginRight: '10px' }} />
            Gestión de Horarios
          </Heading>
          <Spacer />
          <Flex gap={2}>
            <IconButton
              aria-label="Refrescar Horarios"
              icon={<FiRefreshCw />}
              onClick={handleRefresh}
              colorScheme="teal"
              variant="outline"
            />
            <Button 
              leftIcon={<FiPlus />} 
              colorScheme="teal"
              onClick={handleCreateSchedule}
            >
              Asignar Horario
            </Button>
          </Flex>
        </Flex>

        <Text mb={6} color="gray.600">
          Administra y asigna horarios de trabajo para todos los empleados.
        </Text>

        <Box 
          p={6} 
          borderWidth={1} 
          borderRadius="lg" 
          bg={cardBg} 
          shadow="xl"
          minH="400px"
        >
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
              {allSchedules.length > 0 ? allSchedules.map((item) => (
                <Tr key={item.id}>
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
              )) : (
                <Tr><Td colSpan={5} textAlign="center">Cargando horarios...</Td></Tr>
              )}
            </Tbody>
          </Table>
        </Box>
      </Box>
    );
  }

  // Vista de PARTICIPANTE (sin cambios, solo lectura)
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