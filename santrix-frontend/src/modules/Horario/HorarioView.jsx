import { 
  Box, Heading, Text, SimpleGrid, Card, CardBody, HStack, VStack,
  Button, Flex, Icon, Tag, Table, Thead, Tbody, Tr, Th, Td,
  useColorModeValue, Divider, Skeleton, Tooltip, Badge
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { 
  FiClock, FiCalendar, FiUser, FiCheckCircle, FiAlertTriangle, FiEdit3, FiSend,
  FiEye, FiShield, FiTrendingUp, FiSun, FiMoon
} from 'react-icons/fi';

// ==================== DATOS MOCK ====================

const adminScheduleData = [
  { day: 'Lunes', entry: '09:00', departure: '18:00', break: '13:00-14:00', status: 'Laboral', assigned: 12 },
  { day: 'Martes', entry: '09:00', departure: '18:00', break: '13:00-14:00', status: 'Laboral', assigned: 12 },
  { day: 'Miércoles', entry: '09:00', departure: '18:00', break: '13:00-14:00', status: 'Laboral', assigned: 10 },
  { day: 'Jueves', entry: '09:00', departure: '18:00', break: '13:00-14:00', status: 'Laboral', assigned: 12 },
  { day: 'Viernes', entry: '09:00', departure: '18:00', break: '13:00-14:00', status: 'Laboral', assigned: 11 },
  { day: 'Sábado', entry: '-', departure: '-', break: '-', status: 'Libre', assigned: 0 },
  { day: 'Domingo', entry: '-', departure: '-', break: '-', status: 'Libre', assigned: 0 },
];

const practicanteSchedule = [
  { day: 'Lunes', entry: '09:00', departure: '18:00', break: '13:00-14:00', status: 'Laboral' },
  { day: 'Martes', entry: '09:00', departure: '18:00', break: '13:00-14:00', status: 'Laboral' },
  { day: 'Miércoles', entry: '09:00', departure: '18:00', break: '13:00-14:00', status: 'Laboral' },
  { day: 'Jueves', entry: '09:00', departure: '18:00', break: '13:00-14:00', status: 'Laboral' },
  { day: 'Viernes', entry: '09:00', departure: '18:00', break: '13:00-14:00', status: 'Laboral' },
  { day: 'Sábado', entry: '-', departure: '-', break: '-', status: 'Libre' },
  { day: 'Domingo', entry: '-', departure: '-', break: '-', status: 'Libre' },
];

const getTodaySpanish = () => {
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  return days[new Date().getDay()];
};

// ==================== ADMIN VIEW - Premium ====================

const AdminScheduleSection = () => {
  const today = getTodaySpanish();
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const bgCard = useColorModeValue('white', 'gray.800');
  const todayBg = useColorModeValue('blue.50', 'blue.900/20');
  const hoverBg = useColorModeValue('gray.50', 'gray.750');

  return (
    <Box w="100%">
      {/* Hero Header */}
      <VStack align="start" spacing={2} mb={10}>
        <HStack>
          <Icon as={FiShield} color="teal.500" boxSize={6} />
          <Heading size="2xl" fontWeight="800" bgGradient="linear(to-r, teal.600, blue.500)" bgClip="text">
            Panel de Administración
          </Heading>
        </HStack>
        <Text color="gray.600" maxW="600px">
          Supervisa, ajusta y optimiza los horarios de todos los practicantes. Toma decisiones basadas en datos en tiempo real.
        </Text>
      </VStack>

      {/* KPIs */}
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={6} mb={10}>
        {[
          { label: 'Horas/semana promedio', value: '29h', icon: FiClock, color: 'teal', trend: '+2%' },
          { label: 'Practicantes activos', value: '12', icon: FiUser, color: 'blue', trend: '✓ Estable' },
          { label: 'Cambios esta semana', value: '3', icon: FiEdit3, color: 'purple', trend: '↑ Nuevo' },
          { label: 'Cumplimiento global', value: '96%', icon: FiCheckCircle, color: 'green', trend: '↗ Mejorando' },
        ].map((item, i) => (
          <Card key={i} borderWidth="1px" borderColor={borderColor} borderRadius="xl" bg={bgCard} p={5} transition="all 0.3s">
            <Flex direction="column" h="100%">
              <HStack justify="space-between" mb={3}>
                <Icon as={item.icon} boxSize={6} color={`${item.color}.500`} />
                <Badge colorScheme={item.color} variant="subtle" fontSize="xs">
                  {item.trend}
                </Badge>
              </HStack>
              <Text fontSize="3xl" fontWeight="bold" color={`${item.color}.600`} mb={1}>{item.value}</Text>
              <Text fontSize="sm" color="gray.600">{item.label}</Text>
            </Flex>
          </Card>
        ))}
      </SimpleGrid>

      {/* Schedule Table */}
      <Card borderWidth="1px" borderColor={borderColor} borderRadius="xl" bg={bgCard} overflow="hidden">
        <CardBody p={0}>
          <Box p={6} borderBottomWidth="1px" borderColor={borderColor}>
            <HStack justify="space-between">
              <VStack align="start" spacing={1}>
                <Heading size="lg" fontWeight="700">Horario Semanal por Día</Heading>
                <Text fontSize="sm" color="gray.500">Haz clic en "Editar" para ajustar asignaciones</Text>
              </VStack>
              <Button leftIcon={<FiEdit3 />} colorScheme="teal" size="sm" variant="solid">
                Editar Semana
              </Button>
            </HStack>
          </Box>

          <Box overflowX="auto">
            <Table variant="unstyled" size="md" minW="800px">
              <Thead bg={useColorModeValue('gray.50', 'gray.750')}>
                <Tr>
                  <Th py={3} px={6} color="gray.600" fontWeight="600">Día</Th>
                  <Th py={3} px={6} color="gray.600" fontWeight="600">Horario</Th>
                  <Th py={3} px={6} color="gray.600" fontWeight="600">Descanso</Th>
                  <Th py={3} px={6} color="gray.600" fontWeight="600">Practicantes</Th>
                  <Th py={3} px={6} color="gray.600" fontWeight="600">Estado</Th>
                  <Th py={3} px={6} color="gray.600" fontWeight="600">Acción</Th>
                </Tr>
              </Thead>
              <Tbody>
                {adminScheduleData.map((item, idx) => (
                  <Tr
                    key={idx}
                    bg={item.day === today ? todayBg : 'transparent'}
                    _hover={{ bg: hoverBg }}
                    transition="background 0.25s ease"
                    cursor="pointer"
                  >
                    <Td px={6} py={4} fontWeight="600">
                      <HStack>
                        {item.day === today && <Icon as={FiSun} color="blue.500" />}
                        <Text>{item.day}</Text>
                        {item.day === today && <Badge colorScheme="blue" ml={2}>Hoy</Badge>}
                      </HStack>
                    </Td>
                    <Td px={6} py={4}>{item.entry} – {item.departure}</Td>
                    <Td px={6} py={4}>{item.break}</Td>
                    <Td px={6} py={4}>
                      <HStack>
                        <Box w="2" h="2" borderRadius="full" bg={item.assigned > 0 ? 'green.400' : 'gray.400'} />
                        <Text fontWeight="medium">{item.assigned} asignados</Text>
                      </HStack>
                    </Td>
                    <Td px={6} py={4}>
                      <Tag size="sm" colorScheme={item.status === 'Libre' ? 'gray' : 'green'} variant="subtle">
                        {item.status}
                      </Tag>
                    </Td>
                    <Td px={6} py={4}>
                      <Tooltip label="Editar horario del día" fontSize="sm">
                        <Button size="xs" variant="ghost" colorScheme="teal" leftIcon={<FiEdit3 />}>
                          Editar
                        </Button>
                      </Tooltip>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
};

// ==================== PRACTICANTE VIEW - Premium ====================

const PractitionerScheduleSection = () => {
  const today = getTodaySpanish();
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const bgCard = useColorModeValue('white', 'gray.800');
  const todayBg = useColorModeValue('green.50', 'green.900/20');
  const hoverBg = useColorModeValue('gray.50', 'gray.750');

  return (
    <Box w="100%">
      {/* Hero Header */}
      <VStack align="start" spacing={2} mb={10}>
        <HStack>
          <Icon as={FiUser} color="blue.500" boxSize={6} />
          <Heading size="2xl" fontWeight="800" color="gray.800">
            Mi Horario Personal
          </Heading>
        </HStack>
        <Text color="gray.600" maxW="600px">
          Este es tu horario asignado. Si necesitas ajustarlo, puedes solicitar un cambio en cualquier momento.
        </Text>
      </VStack>

      {/* Personal Metrics */}
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={6} mb={10}>
        {[
          { label: 'Horas esta semana', value: '29h', icon: FiClock, color: 'blue' },
          { label: 'Días laborales', value: '5', icon: FiCalendar, color: 'purple' },
          { label: 'Próximo descanso', value: 'Sábado', icon: FiMoon, color: 'orange' },
          { label: 'Cumplimiento', value: '100%', icon: FiTrendingUp, color: 'green' },
        ].map((item, i) => (
          <Card key={i} borderWidth="1px" borderColor={borderColor} borderRadius="xl" bg={bgCard} p={5} textAlign="center">
            <VStack spacing={2}>
              <Icon as={item.icon} boxSize={7} color={`${item.color}.500`} />
              <Text fontSize="2xl" fontWeight="bold" color={`${item.color}.600`}>{item.value}</Text>
              <Text fontSize="sm" color="gray.600">{item.label}</Text>
            </VStack>
          </Card>
        ))}
      </SimpleGrid>

      {/* Schedule Card */}
      <Card borderWidth="1px" borderColor={borderColor} borderRadius="xl" bg={bgCard} overflow="hidden">
        <CardBody p={0}>
          <Box p={6} borderBottomWidth="1px" borderColor={borderColor}>
            <HStack justify="space-between">
              <VStack align="start" spacing={1}>
                <Heading size="lg" fontWeight="700">Tu Semana Laboral</Heading>
                <Text fontSize="sm" color="gray.500">Horario aprobado por administración</Text>
              </VStack>
              <Button leftIcon={<FiSend />} colorScheme="blue" size="sm">
                Solicitar Cambio
              </Button>
            </HStack>
          </Box>

          <Box overflowX="auto">
            <Table variant="unstyled" size="md" minW="700px">
              <Thead bg={useColorModeValue('gray.50', 'gray.750')}>
                <Tr>
                  <Th py={3} px={6} color="gray.600" fontWeight="600">Día</Th>
                  <Th py={3} px={6} color="gray.600" fontWeight="600">Entrada – Salida</Th>
                  <Th py={3} px={6} color="gray.600" fontWeight="600">Descanso</Th>
                  <Th py={3} px={6} color="gray.600" fontWeight="600">Estado</Th>
                </Tr>
              </Thead>
              <Tbody>
                {practicanteSchedule.map((item, idx) => (
                  <Tr
                    key={idx}
                    bg={item.day === today ? todayBg : 'transparent'}
                    _hover={{ bg: hoverBg }}
                    transition="background 0.25s ease"
                  >
                    <Td px={6} py={4} fontWeight="600">
                      <HStack>
                        {item.day === today && <Icon as={FiSun} color="green.500" />}
                        <Text>{item.day}</Text>
                        {item.day === today && <Badge colorScheme="green" ml={2}>Hoy</Badge>}
                      </HStack>
                    </Td>
                    <Td px={6} py={4}>{item.entry} – {item.departure}</Td>
                    <Td px={6} py={4}>{item.break}</Td>
                    <Td px={6} py={4}>
                      <Tag size="sm" colorScheme={item.status === 'Libre' ? 'gray' : 'green'} variant="solid">
                        {item.status}
                      </Tag>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>

          <Box p={5} bg={useColorModeValue('gray.50', 'gray.800')} borderTopWidth="1px" borderColor={borderColor}>
            <HStack justify="space-between" fontSize="sm" color="gray.600">
              <Text display="flex" alignItems="center">
                <Icon as={FiEye} mr={2} /> Horario visible para administradores
              </Text>
              <Text>Última actualización: Hoy</Text>
            </HStack>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
};

// ==================== MAIN COMPONENT ====================

export default function ScheduleView() {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Para testing: cambia esto a 'admin' o 'practicante'
    const role = localStorage.getItem('user_role') || 'practicante';
    setUserRole(role);
  }, []);

  const isAdmin = userRole === 'admin';

  return (
    <Box
      p={{ base: 4, md: 6 }}
      bg={useColorModeValue('gray.50', 'gray.900')}
      minH="100vh"
      transition="background 0.3s"
    >
      <Box maxW="1400px" mx="auto" w="100%">
        {isAdmin ? <AdminScheduleSection /> : <PractitionerScheduleSection />}
      </Box>
    </Box>
  );
} 