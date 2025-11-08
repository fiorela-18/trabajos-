import { 
  Box, Heading, Text, Button, Table, Thead, Tbody, Tr, Th, Td, TableContainer, 
  useToast, Flex, Tag, Badge, Card, CardBody, SimpleGrid,
  Stat, StatLabel, StatNumber, StatHelpText, Progress, Select, Input,
  InputGroup, InputLeftElement, Alert, AlertIcon, AlertTitle, AlertDescription,
  Tooltip, IconButton, HStack, VStack, Avatar
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { 
  FiCalendar, FiCheckCircle, FiXCircle, FiSearch, FiFilter, 
  FiUser, FiClock, FiAlertTriangle, FiTrendingUp
} from 'react-icons/fi';

// Datos simulados
const mockVacationRequests = [
  { 
    id: 101, 
    name: 'Alejandro Pérez', 
    email: 'alejandro.perez@empresa.com',
    department: 'Desarrollo',
    position: 'Desarrollador Senior',
    startDate: '2025-01-15', 
    endDate: '2025-01-20', 
    days: 5, 
    status: 'Pendiente',
    type: 'Vacaciones',
    createdAt: '2024-12-10',
    notes: 'Vacaciones planificadas con anticipación'
  },
  { 
    id: 102, 
    name: 'Carla Soto', 
    email: 'carla.soto@empresa.com',
    department: 'Diseño',
    position: 'Diseñadora UX',
    startDate: '2025-02-10', 
    endDate: '2025-02-17', 
    days: 7, 
    status: 'Aprobada',
    type: 'Vacaciones',
    createdAt: '2024-12-05'
  },
  { 
    id: 103, 
    name: 'Roberto Gómez', 
    email: 'roberto.gomez@empresa.com',
    department: 'Ventas',
    position: 'Ejecutivo de Ventas',
    startDate: '2025-03-01', 
    endDate: '2025-03-03', 
    days: 3, 
    status: 'Rechazada',
    type: 'Personal',
    createdAt: '2024-12-12'
  },
  { 
    id: 104, 
    name: 'Sofía Reyes', 
    email: 'sofia.reyes@empresa.com',
    department: 'Marketing',
    position: 'Marketing Manager',
    startDate: '2025-04-22', 
    endDate: '2025-04-26', 
    days: 4, 
    status: 'Aprobada',
    type: 'Vacaciones',
    createdAt: '2024-12-08'
  },
];

export default function VacationListView() {
  const toast = useToast();
  const [requests] = useState(mockVacationRequests);
  const [filteredRequests, setFilteredRequests] = useState(mockVacationRequests);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [departmentFilter, setDepartmentFilter] = useState('Todos');

  // Estadísticas
  const stats = {
    total: requests.length,
    pending: requests.filter(req => req.status === 'Pendiente').length,
    approved: requests.filter(req => req.status === 'Aprobada').length,
    rejected: requests.filter(req => req.status === 'Rechazada').length,
    approvalRate: Math.round((requests.filter(req => req.status === 'Aprobada').length / requests.length) * 100) || 0
  };

  // Filtros
  useEffect(() => {
    let filtered = requests;
    
    if (searchTerm) {
      filtered = filtered.filter(req => 
        req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'Todos') {
      filtered = filtered.filter(req => req.status === statusFilter);
    }
    
    if (departmentFilter !== 'Todos') {
      filtered = filtered.filter(req => req.department === departmentFilter);
    }
    
    setFilteredRequests(filtered);
  }, [searchTerm, statusFilter, departmentFilter, requests]);

  const handleUpdateStatus = (id, newStatus) => {
    setIsLoading(true);
    setTimeout(() => {
      const updatedRequests = requests.map(req => 
        req.id === id ? { ...req, status: newStatus } : req
      );
      // En una app real, actualizarías el estado aquí si fuera mutable
      setIsLoading(false);

      toast({
        title: 'Solicitud Actualizada',
        description: `La solicitud de ${updatedRequests.find(r => r.id === id)?.name} ha sido ${newStatus.toLowerCase()}.`,
        status: newStatus === 'Aprobada' ? 'success' : 'warning',
        duration: 3000,
        isClosable: true,
      });
    }, 500);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Aprobada':
        return <Badge colorScheme="green" fontSize="sm" px={2} py={1}>{status}</Badge>;
      case 'Rechazada':
        return <Badge colorScheme="red" fontSize="sm" px={2} py={1}>{status}</Badge>;
      case 'Pendiente':
      default:
        return <Badge colorScheme="orange" fontSize="sm" px={2} py={1}>{status}</Badge>;
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case 'Vacaciones':
        return <Badge colorScheme="blue" fontSize="sm" px={2} py={1}>{type}</Badge>;
      case 'Personal':
        return <Badge colorScheme="purple" fontSize="sm" px={2} py={1}>{type}</Badge>;
      default:
        return <Badge colorScheme="gray" fontSize="sm" px={2} py={1}>{type}</Badge>;
    }
  };

  return (
  <Box 
  p={{ base: 4, md: 6 }} 
  bg="gray.50" 
  minH="calc(100vh - 140px)"   // ← Ajusta este valor según tu diseño real
  overflowY="hidden"
  maxW="container.xl" 
  mx="auto"
  fontSize="md"
>
      {/* Header */}
      <Flex justify="space-between" align="center" mb={8} direction={{ base: 'column', md: 'row' }} gap={4}>
        <Box textAlign={{ base: 'center', md: 'left' }}>
          <Heading as="h1" size="xl" color="teal.700" display="flex" alignItems="center" justifyContent={{ base: 'center', md: 'flex-start' }}>
            <FiCalendar style={{ marginRight: '12px' }} />
            Gestión de Vacaciones
          </Heading>
          <Text mt={2} color="gray.600" fontSize="md">
            Visualización y gestión de las solicitudes de días libres del personal.
          </Text>
        </Box>
      </Flex>

      {/* Estadísticas */}
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={5} mb={8}>
        <StatCard label="Total Solicitudes" value={stats.total} color="teal" helpText="Este mes" icon={<FiTrendingUp />} />
        <StatCard label="Pendientes" value={stats.pending} color="orange" helpText="Necesitan revisión" />
        <StatCard 
          label="Tasa de Aprobación" 
          value={`${stats.approvalRate}%`} 
          color="green" 
          helpText={<Progress value={stats.approvalRate} colorScheme="green" size="sm" mt={2} />} 
        />
        <StatCard 
          label="Días Promedio" 
          value={Math.round(requests.reduce((acc, req) => acc + req.days, 0) / requests.length) || 0} 
          color="blue" 
          helpText="Por solicitud" 
        />
      </SimpleGrid>

      {/* Filtros y Búsqueda */}
      <Card bg="white" shadow="base" mb={8} p={6} borderRadius="lg">
        <CardBody p={0}>
          <Flex direction={{ base: 'column', md: 'row' }} gap={4} align="flex-end">
            <Box flex={1}>
              <Text fontWeight="medium" mb={2} fontSize="sm">Buscar</Text>
              <InputGroup>
                <InputLeftElement pointerEvents="none" color="gray.400">
                  <FiSearch />
                </InputLeftElement>
                <Input
                  placeholder="Buscar por nombre, departamento o email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Box>
            
            <Box width={{ base: '100%', md: '200px' }}>
              <Text fontWeight="medium" mb={2} fontSize="sm">Estado</Text>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="Todos">Todos los estados</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Aprobada">Aprobada</option>
                <option value="Rechazada">Rechazada</option>
              </Select>
            </Box>
            
            <Box width={{ base: '100%', md: '200px' }}>
              <Text fontWeight="medium" mb={2} fontSize="sm">Departamento</Text>
              <Select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <option value="Todos">Todos los departamentos</option>
                {[...new Set(requests.map(req => req.department))].map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </Select>
            </Box>
            
            <Button
              leftIcon={<FiFilter />}
              variant="outline"
              size="md"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('Todos');
                setDepartmentFilter('Todos');
              }}
            >
              Limpiar
            </Button>
          </Flex>
        </CardBody>
      </Card>

      {/* Alerta de solicitudes pendientes */}
      {stats.pending > 0 && (
        <Alert status="warning" mb={8} borderRadius="lg">
          <AlertIcon />
          <Box>
            <AlertTitle fontWeight="bold">Tienes {stats.pending} solicitud(es) pendiente(s)</AlertTitle>
            <AlertDescription>
              Revisa las solicitudes pendientes para mantener el flujo de trabajo.
            </AlertDescription>
          </Box>
        </Alert>
      )}

      {/* Tabla de solicitudes */}
      <Card bg="white" shadow="base" borderRadius="lg">
        <CardBody p={0}>
          <Box overflowX="auto">
            <Table variant="simple">
              <Thead bg="gray.50">
                <Tr>
                  <Th fontSize="md" fontWeight="bold" py={3}>Empleado</Th>
                  <Th fontSize="md" fontWeight="bold" py={3}>Departamento</Th>
                  <Th fontSize="md" fontWeight="bold" py={3}>Fechas</Th>
                  <Th fontSize="md" fontWeight="bold" py={3} textAlign="center">Días</Th>
                  <Th fontSize="md" fontWeight="bold" py={3}>Tipo</Th>
                  <Th fontSize="md" fontWeight="bold" py={3}>Estado</Th>
                  <Th fontSize="md" fontWeight="bold" py={3} textAlign="center">Acciones</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredRequests.map((req) => (
                  <Tr key={req.id} _hover={{ bg: 'gray.50' }}>
                    <Td py={3}>
                      <Flex align="center" gap={3}>
                        <Avatar size="sm" name={req.name} />
                        <Box>
                          <Text fontWeight="bold" fontSize="md">{req.name}</Text>
                          <Text fontSize="sm" color="gray.600">{req.position}</Text>
                        </Box>
                      </Flex>
                    </Td>
                    <Td py={3}>
                      <Badge colorScheme="gray" variant="subtle" fontSize="sm">
                        {req.department}
                      </Badge>
                    </Td>
                    <Td py={3}>
                      <VStack align="start" spacing={0} fontSize="sm">
                        <Text>{req.startDate}</Text>
                        <Text color="gray.500">al {req.endDate}</Text>
                      </VStack>
                    </Td>
                    <Td py={3} textAlign="center">
                      <Tag colorScheme="blue" size="md" fontSize="sm" fontWeight="medium">
                        {req.days}
                      </Tag>
                    </Td>
                    <Td py={3}>
                      {getTypeBadge(req.type)}
                    </Td>
                    <Td py={3}>
                      {getStatusBadge(req.status)}
                    </Td>
                    <Td py={3}>
                      <HStack spacing={2} justify="center">
                        <Tooltip label="Ver detalles" hasArrow>
                          <IconButton size="md" icon={<FiUser />} variant="ghost" aria-label="Ver detalles" />
                        </Tooltip>
                        {req.status === 'Pendiente' ? (
                          <>
                            <Tooltip label="Aprobar" hasArrow>
                              <IconButton 
                                size="md" 
                                icon={<FiCheckCircle />} 
                                colorScheme="green" 
                                aria-label="Aprobar"
                              />
                            </Tooltip>
                            <Tooltip label="Rechazar" hasArrow>
                              <IconButton 
                                size="md" 
                                icon={<FiXCircle />} 
                                colorScheme="red" 
                                aria-label="Rechazar"
                              />
                            </Tooltip>
                          </>
                        ) : (
                          <Tooltip label="Revisada" hasArrow>
                            <IconButton size="md" icon={<FiClock />} variant="ghost" isDisabled aria-label="Revisada" />
                          </Tooltip>
                        )}
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
          
          {filteredRequests.length === 0 && (
            <Box textAlign="center" py={12}>
              <FiAlertTriangle size={48} color="#A0AEC0" />
              <Text mt={4} color="gray.600" fontSize="lg" fontWeight="medium">
                No se encontraron solicitudes
              </Text>
              <Text color="gray.500" mt={1}>
                Intenta ajustar los filtros de búsqueda
              </Text>
            </Box>
          )}
        </CardBody>
      </Card>
    </Box>
  );
}

// Componente reutilizable para KPIs
const StatCard = ({ label, value, color, helpText, icon }) => (
  <Card bg={`${color}.50`} p={5} borderRadius="xl" shadow="sm">
    <CardBody p={0}>
      <Stat>
        <StatLabel fontSize="md" fontWeight="medium" color={`${color}.700`}>
          {icon && <span style={{ marginRight: '4px', verticalAlign: 'middle' }}>{icon}</span>}
          {label}
        </StatLabel>
        <StatNumber fontSize="3xl" fontWeight="bold" color={`${color}.800`} mt={1}>
          {value}
        </StatNumber>
        {helpText && (
          <Box mt={2}>
            {typeof helpText === 'string' ? (
              <StatHelpText fontSize="sm" color={`${color}.600`}>{helpText}</StatHelpText>
            ) : (
              helpText
            )}
          </Box>
        )}
      </Stat>
    </CardBody>
  </Card>
);