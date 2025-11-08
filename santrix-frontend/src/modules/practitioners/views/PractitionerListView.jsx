import {
  Box, Heading, Button, Flex, Spacer, Input, InputGroup,
  InputLeftElement, Select, Table, Thead, Tbody, Tr, Th, Td,
  TableContainer, Tag, Center, Text, Card, CardBody, HStack,
  useToast, Badge, VStack, Icon, Progress, SimpleGrid, Stat,
  StatLabel, StatNumber, StatHelpText, Divider, Avatar
} from '@chakra-ui/react';
import { FiPlus, FiSearch, FiFileText, FiEye, FiRefreshCw, FiUser, FiClock, FiCheckCircle, FiAward } from 'react-icons/fi';
import React, { useState, useMemo } from 'react';

// === DATOS SIMULADOS ===
const participants = [
  { id: 101, name: 'Luisa Fernanda', course: 'Agile Leadership', status: 'Completed', date: '2024-05-15', email: 'luisa.f@empresa.com' },
  { id: 102, name: 'Miguel Ángel', course: 'Data Analysis', status: 'In Progress', date: '2024-06-01', email: 'miguel.a@empresa.com' },
  { id: 103, name: 'Sofía Elena', course: 'Effective Communication', status: 'Pending', date: '2024-07-20', email: 'sofia.e@empresa.com' },
  { id: 104, name: 'David Santiago', course: 'Cybersecurity', status: 'Completed', date: '2024-05-28', email: 'david.s@empresa.com' },
];

const certificates = [
  { id: 1, name: 'Luisa Fernanda', course: 'Agile Leadership', issueDate: '2024-05-20', expiryDate: '2026-05-20', status: 'active' },
  { id: 2, name: 'David Santiago', course: 'Cybersecurity', issueDate: '2024-06-01', expiryDate: '2026-06-01', status: 'active' },
  { id: 3, name: 'Carlos Ruiz', course: 'Cloud Fundamentals', issueDate: '2023-01-10', expiryDate: '2025-01-10', status: 'expiring' }, // <30 días
];

const learningPaths = [
  { id: 1, name: 'Onboarding Dev', courses: ['Git Basics', 'React Fundamentals', 'Testing'], assigned: 12, completed: 8 },
  { id: 2, name: 'Liderazgo Junior', courses: ['Agile Leadership', 'Feedback Efectivo'], assigned: 5, completed: 2 },
];

const recentActivity = [
  { id: 1, action: 'completó', user: 'Luisa Fernanda', target: 'Agile Leadership', time: 'hace 2 días' },
  { id: 2, action: 'registró', user: 'Admin', target: 'Miguel Ángel en Data Analysis', time: 'hace 5 días' },
  { id: 3, action: 'emitió certificado', user: 'Sistema', target: 'David Santiago', time: 'hace 1 semana' },
];

// === UTILIDADES ===
const getStatusColor = (status) => {
  switch (status) {
    case 'Completed': return 'teal';
    case 'In Progress': return 'blue';
    case 'Pending': return 'orange';
    case 'expiring': return 'red';
    default: return 'gray';
  }
};

const getCourseColor = (course) => {
  const map = {
    'Agile Leadership': 'purple',
    'Data Analysis': 'cyan',
    'Effective Communication': 'green',
    'Cybersecurity': 'red',
    'Cloud Fundamentals': 'blue'
  };
  return map[course] || 'gray';
};

// === VISTA PRINCIPAL ===
export default function PractitionerListView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const toast = useToast();

  const courses = [...new Set(participants.map(p => p.course))];
  const statuses = ['Completed', 'In Progress', 'Pending'];

  const filtered = useMemo(() => {
    return participants.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.course.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCourse = filterCourse ? p.course === filterCourse : true;
      const matchStatus = filterStatus ? p.status === filterStatus : true;
      return matchSearch && matchCourse && matchStatus;
    });
  }, [searchTerm, filterCourse, filterStatus]);

  // === KPIs ===
  const stats = {
    total: participants.length,
    completed: participants.filter(p => p.status === 'Completed').length,
    inProgress: participants.filter(p => p.status === 'In Progress').length,
    pending: participants.filter(p => p.status === 'Pending').length,
    expiringCerts: certificates.filter(c => c.status === 'expiring').length
  };

  // === Handlers ===
  const handleViewCertificate = (name) => toast({ title: `📄 Certificado de ${name}`, status: "success", duration: 2000 });
  const handleViewDetails = (name) => toast({ title: `🔍 Detalles de ${name}`, status: "info", duration: 1500 });
  const handleReEnroll = (name) => toast({ title: `🔄 ${name} reinscrito`, status: "warning", duration: 2000 });

  return (
    <Box p={{ base: 4, md: 6 }} bg="gray.50" minH="100vh" maxW="container.xl" mx="auto">
      {/* === HEADER === */}
      <Flex mb={6} align="center" direction={{ base: 'column', md: 'row' }} gap={4}>
        <Box textAlign={{ base: 'center', md: 'left' }}>
        <Heading size="lg" color="gray.800">Gestión de Practicantes</Heading> 
          <Text color="gray.600">Supervisa formación, certificaciones y progreso</Text>
        </Box>
        <Spacer />
        <Button leftIcon={<FiPlus />} colorScheme="blue" size="md" onClick={() => toast({ title: "➕ Registro abierto", status: "info" })}>
          Registrar Practicante
        </Button>
      </Flex>

      {/* === KPIs === */}
      <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={4} mb={6}>
        <StatCard title="Total Practicantes" value={stats.total} color="blue" />
        <StatCard title="Completados" value={stats.completed} color="teal" />
        <StatCard title="En Progreso" value={stats.inProgress} color="blue" />
        <StatCard title="Cert. por Vencer" value={stats.expiringCerts} color="orange" />
      </SimpleGrid>

      {/* === FILTROS === */}
<Card bg="white" mb={6} p={4} borderRadius="lg" shadow="sm">
  <Flex gap={3} direction={{ base: 'column', md: 'row' }} align="end">
    <InputGroup flex="1">
      <InputLeftElement color="gray.400"><FiSearch /></InputLeftElement>
      <Input
        placeholder="Buscar por nombre o curso..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </InputGroup>
    <Select
      placeholder="Curso"
      value={filterCourse}
      onChange={(e) => setFilterCourse(e.target.value)}
      flex={{ base: 1, md: 0.7 }}
    >
      <option value="">Todos</option>
      {courses.map(c => (
        <option key={c} value={c}>{c}</option>
      ))}
    </Select>
    <Select
      placeholder="Estado"
      value={filterStatus}
      onChange={(e) => setFilterStatus(e.target.value)}
      flex={{ base: 1, md: 0.5 }}
    >
      <option value="">Todos</option>
      {statuses.map(s => (
        <option key={s} value={s}>{s}</option>
      ))}
    </Select>
  </Flex>
</Card>
      {/* === LISTA PRINCIPAL === */}
      <Card bg="white" mb={8} p={4} borderRadius="lg" shadow="md">
        <Heading size="lg" mb={4} color="gray.800">Practicantes</Heading>
       <TableContainer>
  <Table variant="simple">
    <Thead>
      <Tr bg="gray.50">
        <Th fontSize="md" fontWeight="bold">Nombre</Th>
        <Th fontSize="md" fontWeight="bold">Curso</Th>
        <Th fontSize="md" fontWeight="bold">Inicio</Th>
        <Th fontSize="md" fontWeight="bold">Estado</Th>
        <Th fontSize="md" fontWeight="bold">Acciones</Th>
      </Tr>
    </Thead>
    <Tbody>
      {filtered.length === 0 ? (
        <Tr><Td colSpan={5} textAlign="center" py={8}>No se encontraron practicantes</Td></Tr>
      ) : (
        filtered.map(p => (
          <Tr key={p.id} _hover={{ bg: "gray.50" }}>
            <Td fontWeight="medium" fontSize="md">{p.name}</Td>
            <Td fontSize="md"><Badge colorScheme={getCourseColor(p.course)}>{p.course}</Badge></Td>
            <Td fontSize="md">{p.date}</Td>
            <Td fontSize="md"><Tag size="md" colorScheme={getStatusColor(p.status)}>{p.status}</Tag></Td>
            <Td>
              <HStack spacing={1}>
                {p.status === 'Completed' && (
  <Button size="md" leftIcon={<FiFileText />} variant="outline" colorScheme="teal" onClick={() => handleViewCertificate(p.name)}>
    Cert
  </Button>
)}
<Button size="md" leftIcon={<FiEye />} variant="ghost" colorScheme="blue" onClick={() => handleViewDetails(p.name)}>
  Ver
</Button>
{p.status === 'Pending' && (
  <Button size="md" leftIcon={<FiRefreshCw />} variant="ghost" colorScheme="orange" onClick={() => handleReEnroll(p.name)}>
    Reinscribir
  </Button>
)}
              </HStack>
            </Td>
          </Tr>
        ))
      )}
    </Tbody>
  </Table>
</TableContainer>
      </Card>

      {/* === CERTIFICACIONES === */}
      <Card bg="white" mb={6} p={4} borderRadius="lg" shadow="md">
        <Flex justify="space-between" align="center" mb={4}>
          <Heading size="md" color="gray.800">Certificaciones Próximas a Vencer</Heading>
          <Button size="sm" variant="link" colorScheme="blue">Ver todas</Button>
        </Flex>
        {certificates.filter(c => c.status === 'expiring').length === 0 ? (
          <Text color="gray.500">No hay certificaciones próximas a vencer.</Text>
        ) : (
          <VStack spacing={3} align="stretch">
            {certificates.filter(c => c.status === 'expiring').map(cert => (
              <Flex key={cert.id} p={3} bg="red.50" borderRadius="md" align="center" justify="space-between">
                <Box>
                  <Text fontWeight="bold">{cert.name}</Text>
                  <Text fontSize="sm" color="gray.600">{cert.course}</Text>
                </Box>
                <Badge colorScheme="red" fontSize="xs">Vence: {cert.expiryDate}</Badge>
              </Flex>
            ))}
          </VStack>
        )}
      </Card>

      {/* === RUTAS DE APRENDIZAJE === */}
      <Card bg="white" mb={6} p={4} borderRadius="lg" shadow="md">
        <Heading size="md" mb={4} color="gray.800">Rutas de Aprendizaje</Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          {learningPaths.map(path => {
            const progress = (path.completed / path.assigned) * 100;
            return (
              <Card key={path.id} variant="outline">
                <CardBody>
                  <Text fontWeight="bold" mb={2}>{path.name}</Text>
                  <Text fontSize="sm" color="gray.600" mb={2}>{path.completed} de {path.assigned} asignados</Text>
                  <Progress value={progress || 0} size="sm" colorScheme="blue" borderRadius="full" />
                  <Text fontSize="xs" mt={1}>{progress.toFixed(0)}% completado</Text>
                </CardBody>
              </Card>
            );
          })}
        </SimpleGrid>
      </Card>

      {/* === ACTIVIDAD RECIENTE === */}
      <Card bg="white" p={4} borderRadius="lg" shadow="md">
        <Flex justify="space-between" align="center" mb={4}>
          <Heading size="md" color="gray.800">Actividad Reciente</Heading>
          <Button size="sm" variant="link" colorScheme="blue">Ver historial</Button>
        </Flex>
        <VStack spacing={3} align="stretch">
          {recentActivity.map(act => (
            <Flex key={act.id} align="center" p={2} _hover={{ bg: "gray.50" }} borderRadius="md">
              <Avatar size="sm" name={act.user} mr={3} />
              <Box>
                <Text fontSize="sm"><Text as="span" fontWeight="bold">{act.user}</Text> {act.action} <Text as="span" fontWeight="medium">{act.target}</Text></Text>
                <Text fontSize="xs" color="gray.500">{act.time}</Text>
              </Box>
            </Flex>
          ))}
        </VStack>
      </Card>
    </Box>
  );
}

// === Componente auxiliar: Tarjeta de KPI ===
const StatCard = ({ title, value, color }) => (
  <Card bg={`${color}.50`} p={6} borderRadius="xl" boxShadow="sm">
    <Stat>
     <StatLabel fontSize="md" fontWeight="medium" color={`${color}.700`}>
  {title}
</StatLabel>
      <StatNumber fontSize="3xl" fontWeight="bold" color={`${color}.800`}>
        {value}
      </StatNumber>
    </Stat>
  </Card>
);