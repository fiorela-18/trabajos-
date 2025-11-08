import { 
  Box, Heading, Text, Button, Flex, SimpleGrid,
  Table, Thead, Tbody, Tr, Th, Td, TableContainer, Tag,
  AlertDialog, AlertDialogBody, AlertDialogFooter,
  AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, 
  useDisclosure, useToast, Input, InputGroup, InputLeftElement,
  Select, Avatar, HStack, Badge, IconButton, Menu, MenuButton,
  MenuList, MenuItem, Card, CardBody, Icon, VStack,
  Checkbox, Divider, Stat, StatLabel, StatNumber, Progress
} from '@chakra-ui/react';
import React, { useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiPlus, FiSearch, FiDownload, FiMoreVertical,
  FiEdit, FiTrash2, FiEye, FiMail, FiPhone, FiUsers,
  FiMapPin, FiDollarSign, FiCalendar, FiCheckCircle
} from 'react-icons/fi';

// Colores corporativos
const COLORS = {
  primary: '#0A192F',
  accent: '#800020',
  gray: '#B0B0B0',
  white: '#FFFFFF',
  lightGray: '#F7FAFC',
};

const initialEmployees = [
  { 
    id: 1, name: 'Alejandro Pérez', email: 'alejandro.perez@santrix.com',
    phone: '+51 987 654 321', position: 'Desarrollador Senior', 
    department: 'Tecnología', status: 'Activo', hireDate: '15 Ene 2020',
    salary: '$3,500', location: 'Lima'
  },
  { 
    id: 2, name: 'Carla Soto', email: 'carla.soto@santrix.com',
    phone: '+51 912 345 678', position: 'Diseñadora UX/UI', 
    department: 'Diseño', status: 'Activo', hireDate: '20 Mar 2021',
    salary: '$3,200', location: 'Lima'
  },
  { 
    id: 3, name: 'Roberto Gómez', email: 'roberto.gomez@santrix.com',
    phone: '+51 923 456 789', position: 'Gerente de Ventas', 
    department: 'Comercial', status: 'Ausente', hireDate: '10 Jun 2019',
    salary: '$4,200', location: 'Arequipa'
  },
  { 
    id: 4, name: 'Sofía Reyes', email: 'sofia.reyes@santrix.com',
    phone: '+51 934 567 890', position: 'Contadora', 
    department: 'Finanzas', status: 'Activo', hireDate: '05 Ago 2021',
    salary: '$3,800', location: 'Lima'
  },
  { 
    id: 5, name: 'Manuel Torres', email: 'manuel.torres@santrix.com',
    phone: '+51 945 678 901', position: 'Analista de RRHH', 
    department: 'Talento Humano', status: 'Activo', hireDate: '12 Feb 2022',
    salary: '$3,000', location: 'Lima'
  },
  { 
    id: 6, name: 'Laura Mendoza', email: 'laura.mendoza@santrix.com',
    phone: '+51 956 789 012', position: 'Marketing Manager', 
    department: 'Marketing', status: 'Activo', hireDate: '18 Nov 2020',
    salary: '$3,600', location: 'Cusco'
  },
  { 
    id: 7, name: 'Diego Vargas', email: 'diego.vargas@santrix.com',
    phone: '+51 967 890 123', position: 'DevOps Engineer', 
    department: 'Tecnología', status: 'Inactivo', hireDate: '22 Abr 2018',
    salary: '$4,000', location: 'Lima'
  },
];

const statusColor = {
  'Activo': 'green',
  'Ausente': 'orange',
  'Inactivo': 'red'
};

const departmentColor = {
  'Tecnología': 'blue',
  'Diseño': 'purple',
  'Comercial': 'orange',
  'Finanzas': 'green',
  'Talento Humano': 'pink',
  'Marketing': 'cyan'
};

const getDepartmentDistribution = (employees) => {
  const counts = employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts).map(([dept, count]) => ({
    department: dept,
    count,
    percentage: ((count / employees.length) * 100).toFixed(1)
  }));
};

export default function EmployeeListView() {
  const navigate = useNavigate();
  const toast = useToast();
  
  const [employees, setEmployees] = useState(initialEmployees);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [viewEmployee, setViewEmployee] = useState(null);

  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const { isOpen: isQuickViewOpen, onOpen: onQuickViewOpen, onClose: onQuickViewClose } = useDisclosure();
  const cancelRef = useRef();

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        emp.position.toLowerCase().includes(searchTerm.toLowerCase());
      const matchDepartment = filterDepartment ? emp.department === filterDepartment : true;
      const matchStatus = filterStatus ? emp.status === filterStatus : true;
      return matchSearch && matchDepartment && matchStatus;
    });
  }, [employees, searchTerm, filterDepartment, filterStatus]);

  const stats = useMemo(() => ({
    total: employees.length,
    active: employees.filter(e => e.status === 'Activo').length,
    absent: employees.filter(e => e.status === 'Ausente').length,
    inactive: employees.filter(e => e.status === 'Inactivo').length,
    techTeam: employees.filter(e => e.department === 'Tecnología').length
  }), [employees]);

  const departmentDist = useMemo(() => getDepartmentDistribution(employees), [employees]);

  const handleDeleteClick = (id) => {
    setEmployeeToDelete(id);
    onDeleteOpen();
  };

  const handleConfirmDelete = () => {
    setEmployees(prev => prev.filter(emp => emp.id !== employeeToDelete));
    toast({
      title: 'Empleado Eliminado',
      description: 'El empleado ha sido removido del sistema.',
      status: 'warning',
      duration: 3000,
      isClosable: true,
    });
    onDeleteClose();
    setEmployeeToDelete(null);
  };

  const handleExport = () => {
    toast({
      title: 'Exportando datos',
      description: 'Los datos se están descargando en formato Excel...',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleSendEmail = (email) => {
    toast({
      title: 'Correo preparado',
      description: `Abrir cliente de correo para ${email}`,
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  const toggleSelect = (id) => {
    setSelectedEmployees(prev =>
      prev.includes(id) ? prev.filter(empId => empId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedEmployees.length === filteredEmployees.length && filteredEmployees.length > 0) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(filteredEmployees.map(emp => emp.id));
    }
  };

  const handleQuickView = (emp) => {
    setViewEmployee(emp);
    onQuickViewOpen();
  };

  return (
   <Box p={{ base: 4, md: 6 }} bg="gray.50" minH="100vh" maxW="100%" overflowX="hidden">
      {/* Header */}
      <Flex justify="space-between" align="center" mb={8} gap={4} direction={{ base: 'column', md: 'row' }}>
        <Box textAlign={{ base: 'center', md: 'left' }}>
          <Heading size={{ base: "lg", md: "xl" }} color="gray.800">Gestión de Empleados</Heading>
          <Text color="gray.600" mt={1}>Administra todo el personal de la organización</Text>
        </Box>
        <HStack>
          <Button 
            leftIcon={<FiDownload />} 
            colorScheme="blue" 
            variant="outline"
            onClick={handleExport}
            size={{ base: "sm", md: "md" }}
          >
            Exportar
          </Button>
          <Button 
            leftIcon={<FiPlus />} 
            colorScheme="teal"
            onClick={() => navigate('/empleados/nuevo')}
            size={{ base: "sm", md: "md" }}
          >
            Nuevo Empleado
          </Button>
        </HStack>
      </Flex>

      {/* Estadísticas mejoradas */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4} mb={6}>
        <StatCard title="Total Empleados" value={stats.total} icon={FiUsers} color="teal.500" />
        <StatCard title="Activos" value={stats.active} icon={FiCheckCircle} color="green.500" />
        <StatCard title="Tecnología" value={stats.techTeam} icon={FiUsers} color="blue.500" />
        <Card shadow="md" borderRadius="lg" bg="white" p={4}>
          <Text fontSize="sm" fontWeight="bold" color="gray.700">Distribución por Depto.</Text>
          <VStack align="start" spacing={2} mt={2}>
            {departmentDist.map(item => (
              <Box key={item.department} w="100%">
                <Flex justify="space-between" fontSize="xs" mb={1}>
                  <Text>{item.department}</Text>
                  <Text>{item.count} ({item.percentage}%)</Text>
                </Flex>
                <Progress 
                  value={parseFloat(item.percentage)} 
                  size="sm" 
                  colorScheme={departmentColor[item.department] || 'gray'} 
                  borderRadius="full" 
                />
              </Box>
            ))}
          </VStack>
        </Card>
      </SimpleGrid>

      {/* Filtros */}
      <Box p={4} shadow="md" borderRadius="lg" bg="white" mb={6}>
        <Flex gap={3} direction={{ base: 'column', md: 'row' }}>
          <InputGroup flex={{ base: '1', md: '2' }}>
            <InputLeftElement pointerEvents="none">
              <Icon as={FiSearch} color="gray.400" />
            </InputLeftElement>
            <Input 
              placeholder="Buscar por nombre, email o cargo..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="md"
            />
          </InputGroup>
          <Select 
            placeholder="Departamento" 
            flex="1"
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            size="md"
          >
            {Object.keys(departmentColor).map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </Select>
          <Select 
            placeholder="Estado" 
            flex="1"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            size="md"
          >
            <option value="Activo">Activo</option>
            <option value="Ausente">Ausente</option>
            <option value="Inactivo">Inactivo</option>
          </Select>
        </Flex>
      </Box>

      {/* Acciones masivas */}
      {selectedEmployees.length > 0 && (
        <Flex mb={4} p={3} bg="blue.50" borderRadius="md" align="center">
          <Text mr={4} fontWeight="medium">
            {selectedEmployees.length} seleccionado(s)
          </Text>
          <Button size="sm" colorScheme="blue" leftIcon={<FiMail />}>
            Enviar email
          </Button>
          <Button size="sm" ml={2} variant="outline" leftIcon={<FiDownload />}>
            Exportar
          </Button>
          <Button size="sm" ml={2} colorScheme="red" leftIcon={<FiTrash2 />}>
            Eliminar
          </Button>
        </Flex>
      )}

      {/* Tabla */}
      <Box borderWidth={1} borderRadius="lg" bg="white" shadow="md" overflowX="auto">
       <TableContainer w="100%" minW="0">
          <Table variant="simple" size="sm">
            <Thead bg="gray.50">
              <Tr>
                <Th>
                  <Checkbox 
                    isChecked={selectedEmployees.length === filteredEmployees.length && filteredEmployees.length > 0}
                    onChange={toggleSelectAll}
                    isDisabled={filteredEmployees.length === 0}
                  />
                </Th>
                <Th>Empleado</Th>
                <Th>Contacto</Th>
                <Th>Cargo</Th>
                <Th>Departamento</Th>
                <Th>Estado</Th>
                <Th>Ingreso</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredEmployees.length === 0 ? (
                <Tr><Td colSpan={7} textAlign="center" py={8}>No se encontraron empleados</Td></Tr>
              ) : (
                filteredEmployees.map((emp) => (
                  <Tr key={emp.id} _hover={{ bg: 'gray.50' }}>
                    <Td>
                      <Checkbox 
                        isChecked={selectedEmployees.includes(emp.id)}
                        onChange={() => toggleSelect(emp.id)}
                      />
                    </Td>
                    <Td>
                      <HStack spacing={2} justify="space-between" w="100%">
                        <HStack spacing={2}>
                          <Avatar size="sm" name={emp.name} bg="blue.500" />
                          <Box>
                            <Text fontWeight="medium" fontSize="sm">{emp.name}</Text>
                            <Text fontSize="xs" color="gray.600">{emp.location}</Text>
                          </Box>
                        </HStack>
                        <Menu>
                          <MenuButton
                            as={IconButton}
                            icon={<FiMoreVertical />}
                            size="xs"
                            variant="ghost"
                            colorScheme="gray"
                            aria-label="Opciones"
                          />
                          <MenuList fontSize="sm">
                            <MenuItem icon={<FiEye />} onClick={() => handleQuickView(emp)}>
                              Ver Perfil
                            </MenuItem>
                            <MenuItem icon={<FiEdit />} onClick={() => navigate(`/empleados/editar/${emp.id}`)}>
                              Editar
                            </MenuItem>
                            <MenuItem icon={<FiTrash2 />} color="red.500" onClick={() => handleDeleteClick(emp.id)}>
                              Eliminar
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </HStack>
                    </Td>
                    <Td>
                      <VStack align="start" spacing={0}>
                        <HStack spacing={1}>
                          <Icon as={FiMail} color="gray.400" w={3} h={3} />
                          <Text fontSize="xs" color="blue.600" cursor="pointer" onClick={() => handleSendEmail(emp.email)}>
                            {emp.email}
                          </Text>
                        </HStack>
                        <HStack spacing={1}>
                          <Icon as={FiPhone} color="gray.400" w={3} h={3} />
                          <Text fontSize="xs" color="gray.600">{emp.phone}</Text>
                        </HStack>
                      </VStack>
                    </Td>
                    <Td>{emp.position}</Td>
                    <Td>
                      <Badge colorScheme={departmentColor[emp.department]} fontSize="xs" px={2}>
                        {emp.department}
                      </Badge>
                    </Td>
                    <Td>
                      <Tag size="sm" colorScheme={statusColor[emp.status]} fontSize="xs">
                        {emp.status}
                      </Tag>
                    </Td>
                    <Td>{emp.hireDate}</Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      {/* Quick View Modal */}
      <AlertDialog
        isOpen={isQuickViewOpen}
        onClose={onQuickViewClose}
        size="lg"
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent mx={4}>
          <AlertDialogHeader fontSize="lg" fontWeight="bold" display="flex" alignItems="center">
            <Avatar name={viewEmployee?.name} size="sm" mr={3} />
            {viewEmployee?.name}
          </AlertDialogHeader>
          <AlertDialogBody pb={6}>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
              <ProfileItem icon={FiMail} label="Email" value={viewEmployee?.email} />
              <ProfileItem icon={FiPhone} label="Teléfono" value={viewEmployee?.phone} />
              <ProfileItem icon={FiMapPin} label="Ubicación" value={viewEmployee?.location} />
              <ProfileItem icon={FiDollarSign} label="Salario" value={viewEmployee?.salary} />
              <ProfileItem icon={FiCalendar} label="Ingreso" value={viewEmployee?.hireDate} />
              <Box>
                <Text fontSize="xs" fontWeight="bold" color="gray.600">Departamento</Text>
                <Badge colorScheme={departmentColor[viewEmployee?.department]} mt={1}>
                  {viewEmployee?.department}
                </Badge>
              </Box>
              <Box>
                <Text fontSize="xs" fontWeight="bold" color="gray.600">Estado</Text>
                <Tag colorScheme={statusColor[viewEmployee?.status]} size="sm" mt={1}>
                  {viewEmployee?.status}
                </Tag>
              </Box>
              <Box>
                <Text fontSize="xs" fontWeight="bold" color="gray.600">Cargo</Text>
                <Text mt={1}>{viewEmployee?.position}</Text>
              </Box>
            </SimpleGrid>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onQuickViewClose}>Cerrar</Button>
            <Button colorScheme="teal" ml={3} onClick={() => navigate(`/empleados/editar/${viewEmployee?.id}`)}>
              Editar Perfil
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Modal */}
      <AlertDialog isOpen={isDeleteOpen} leastDestructiveRef={cancelRef} onClose={onDeleteClose}>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">Eliminar Empleado</AlertDialogHeader>
          <AlertDialogBody>¿Estás seguro? Esta acción no se puede deshacer.</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onDeleteClose}>Cancelar</Button>
            <Button colorScheme="red" onClick={handleConfirmDelete} ml={3}>Eliminar</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
}

// ✅ CORREGIDO: se envuelve con <Stat>
const StatCard = ({ title, value, icon: IconComp, color }) => (
  <Card shadow="md" borderRadius="lg" bg="white">
    <CardBody p={4}>
      <Stat> {/* 👈 Añadido */}
        <HStack justify="space-between">
          <Icon as={IconComp} w={6} h={6} color={color} />
          <StatNumber fontSize="2xl" fontWeight="bold">
            {typeof value === 'number' || typeof value === 'string' ? value : '—'}
          </StatNumber>
        </HStack>
        <StatLabel fontSize="sm" color="gray.600" mt={2}>
          {title}
        </StatLabel>
      </Stat> {/* 👈 Cerrado */}
    </CardBody>
  </Card>
);

const ProfileItem = ({ icon: IconComp, label, value }) => (
  <Box>
    <HStack spacing={2}>
      <Icon as={IconComp} color="gray.500" w={3} h={3} />
      <Text fontSize="xs" fontWeight="bold" color="gray.600">{label}</Text>
    </HStack>
    <Text mt={1} fontSize="sm">{value || '—'}</Text>
  </Box>
);