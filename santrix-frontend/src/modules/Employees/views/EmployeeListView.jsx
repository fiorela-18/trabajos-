import { 
  Box, Heading, Text, Button, Flex, SimpleGrid,
  Table, Thead, Tbody, Tr, Th, Td, TableContainer, Tag,
  AlertDialog, AlertDialogBody, AlertDialogFooter,
  AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, 
  useDisclosure, useToast, Input, InputGroup, InputLeftElement,
  Select, Avatar, HStack, Badge, IconButton, Menu, MenuButton,
  MenuList, MenuItem, Card, CardBody, Icon, VStack
} from '@chakra-ui/react';
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiPlus, FiSearch, FiFilter, FiDownload, FiMoreVertical,
  FiEdit, FiTrash2, FiEye, FiMail, FiPhone, FiUsers
} from 'react-icons/fi';

// Datos simulados más completos
const initialEmployees = [
  { 
    id: 1, 
    name: 'Alejandro Pérez', 
    email: 'alejandro.perez@santrix.com',
    phone: '+51 987 654 321',
    position: 'Desarrollador Senior', 
    department: 'Tecnología', 
    status: 'Activo',
    hireDate: '15 Ene 2020',
    salary: '$3,500',
    location: 'Lima'
  },
  { 
    id: 2, 
    name: 'Carla Soto', 
    email: 'carla.soto@santrix.com',
    phone: '+51 912 345 678',
    position: 'Diseñadora UX/UI', 
    department: 'Diseño', 
    status: 'Activo',
    hireDate: '20 Mar 2021',
    salary: '$3,200',
    location: 'Lima'
  },
  { 
    id: 3, 
    name: 'Roberto Gómez', 
    email: 'roberto.gomez@santrix.com',
    phone: '+51 923 456 789',
    position: 'Gerente de Ventas', 
    department: 'Comercial', 
    status: 'Ausente',
    hireDate: '10 Jun 2019',
    salary: '$4,200',
    location: 'Arequipa'
  },
  { 
    id: 4, 
    name: 'Sofía Reyes', 
    email: 'sofia.reyes@santrix.com',
    phone: '+51 934 567 890',
    position: 'Contadora', 
    department: 'Finanzas', 
    status: 'Activo',
    hireDate: '05 Ago 2021',
    salary: '$3,800',
    location: 'Lima'
  },
  { 
    id: 5, 
    name: 'Manuel Torres', 
    email: 'manuel.torres@santrix.com',
    phone: '+51 945 678 901',
    position: 'Analista de RRHH', 
    department: 'Talento Humano', 
    status: 'Activo',
    hireDate: '12 Feb 2022',
    salary: '$3,000',
    location: 'Lima'
  },
  { 
    id: 6, 
    name: 'Laura Mendoza', 
    email: 'laura.mendoza@santrix.com',
    phone: '+51 956 789 012',
    position: 'Marketing Manager', 
    department: 'Marketing', 
    status: 'Activo',
    hireDate: '18 Nov 2020',
    salary: '$3,600',
    location: 'Cusco'
  },
  { 
    id: 7, 
    name: 'Diego Vargas', 
    email: 'diego.vargas@santrix.com',
    phone: '+51 967 890 123',
    position: 'DevOps Engineer', 
    department: 'Tecnología', 
    status: 'Inactivo',
    hireDate: '22 Abr 2018',
    salary: '$4,000',
    location: 'Lima'
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

export default function EmployeeListView() {
  const navigate = useNavigate();
  const toast = useToast();
  
  // Estados
  const [employees, setEmployees] = useState(initialEmployees);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [viewMode, setViewMode] = useState('table'); // 'table' o 'cards'
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  // Filtrado de empleados
  const filteredEmployees = employees.filter(emp => {
    const matchSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       emp.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDepartment = filterDepartment ? emp.department === filterDepartment : true;
    const matchStatus = filterStatus ? emp.status === filterStatus : true;
    
    return matchSearch && matchDepartment && matchStatus;
  });

  // Estadísticas
  const stats = {
    total: employees.length,
    active: employees.filter(e => e.status === 'Activo').length,
    absent: employees.filter(e => e.status === 'Ausente').length,
    inactive: employees.filter(e => e.status === 'Inactivo').length
  };

  // Funciones
  const handleDeleteClick = (id) => {
    setEmployeeToDelete(id);
    onOpen();
  };

  const handleConfirmDelete = () => {
    setTimeout(() => {
      setEmployees(currentEmployees => 
        currentEmployees.filter(emp => emp.id !== employeeToDelete)
      );
      
      const deletedEmployee = employees.find(emp => emp.id === employeeToDelete);

      toast({
        title: 'Empleado Eliminado',
        description: `${deletedEmployee?.name || 'Empleado'} ha sido removido del sistema.`,
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });

      onClose();
      setEmployeeToDelete(null);
    }, 500);
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

  const handleViewDetails = (id) => {
    navigate(`/empleados/editar/${id}`);
  };

  const handleSendEmail = (email) => {
    toast({
      title: 'Abrir cliente de correo',
      description: `Enviando correo a ${email}`,
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box p={6} bg="gray.50" minH="100vh">
      {/* Header */}
      <Flex justify="space-between" align="center" mb={8}>
        <Box>
          <Heading size="xl" color="gray.800">Gestión de Empleados</Heading>
          <Text color="gray.600" mt={1}>Administra todo el personal de la organización</Text>
        </Box>
        <HStack>
          <Button 
            leftIcon={<FiDownload />} 
            colorScheme="blue"
            variant="outline"
            onClick={handleExport}
          >
            Exportar
          </Button>
          <Button 
            leftIcon={<FiPlus />} 
            colorScheme="teal"
            onClick={() => navigate('/empleados/nuevo')}
          >
            Nuevo Empleado
          </Button>
        </HStack>
      </Flex>

      {/* Estadísticas */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <Card shadow="lg" borderRadius="xl" borderTop="4px" borderColor="teal.500">
          <CardBody>
            <HStack justify="space-between" mb={2}>
              <Icon as={FiUsers} w={8} h={8} color="teal.500" />
              <Text fontSize="3xl" fontWeight="bold">{stats.total}</Text>
            </HStack>
            <Text fontSize="sm" color="gray.600">Total Empleados</Text>
          </CardBody>
        </Card>

        <Card shadow="lg" borderRadius="xl" borderTop="4px" borderColor="green.500">
          <CardBody>
            <HStack justify="space-between" mb={2}>
              <Badge colorScheme="green" fontSize="lg" px={3} py={1}>Activos</Badge>
              <Text fontSize="3xl" fontWeight="bold">{stats.active}</Text>
            </HStack>
            <Text fontSize="sm" color="gray.600">{((stats.active/stats.total)*100).toFixed(0)}% del total</Text>
          </CardBody>
        </Card>

        <Card shadow="lg" borderRadius="xl" borderTop="4px" borderColor="orange.500">
          <CardBody>
            <HStack justify="space-between" mb={2}>
              <Badge colorScheme="orange" fontSize="lg" px={3} py={1}>Ausentes</Badge>
              <Text fontSize="3xl" fontWeight="bold">{stats.absent}</Text>
            </HStack>
            <Text fontSize="sm" color="gray.600">Temporalmente fuera</Text>
          </CardBody>
        </Card>

        <Card shadow="lg" borderRadius="xl" borderTop="4px" borderColor="red.500">
          <CardBody>
            <HStack justify="space-between" mb={2}>
              <Badge colorScheme="red" fontSize="lg" px={3} py={1}>Inactivos</Badge>
              <Text fontSize="3xl" fontWeight="bold">{stats.inactive}</Text>
            </HStack>
            <Text fontSize="sm" color="gray.600">Requieren atención</Text>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Filtros y búsqueda */}
      <Box p={6} shadow="lg" borderRadius="xl" bg="white" mb={6}>
        <Flex gap={4} direction={{ base: 'column', md: 'row' }}>
          <InputGroup flex="2">
            <InputLeftElement pointerEvents="none">
              <Icon as={FiSearch} color="gray.400" />
            </InputLeftElement>
            <Input 
              placeholder="Buscar por nombre, email o cargo..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>

          <Select 
            placeholder="Todos los Departamentos" 
            flex="1"
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
          >
            <option value="Tecnología">Tecnología</option>
            <option value="Diseño">Diseño</option>
            <option value="Comercial">Comercial</option>
            <option value="Finanzas">Finanzas</option>
            <option value="Talento Humano">Talento Humano</option>
            <option value="Marketing">Marketing</option>
          </Select>

          <Select 
            placeholder="Todos los Estados" 
            flex="1"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="Activo">Activo</option>
            <option value="Ausente">Ausente</option>
            <option value="Inactivo">Inactivo</option>
          </Select>

          {(searchTerm || filterDepartment || filterStatus) && (
            <Button 
              colorScheme="gray" 
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setFilterDepartment('');
                setFilterStatus('');
              }}
            >
              Limpiar
            </Button>
          )}
        </Flex>

        <Flex justify="space-between" align="center" mt={4} pt={4} borderTop="1px" borderColor="gray.100">
          <Text fontSize="sm" color="gray.600">
            Mostrando <strong>{filteredEmployees.length}</strong> de <strong>{employees.length}</strong> empleados
          </Text>
        </Flex>
      </Box>

      {/* Tabla de empleados */}
      <TableContainer 
        borderWidth={1} 
        borderRadius="xl" 
        bg="white" 
        shadow="lg"
        p={4}
      >
        <Table variant="simple">
          <Thead>
            <Tr bg="gray.50">
              <Th>Empleado</Th>
              <Th>Contacto</Th>
              <Th>Cargo</Th>
              <Th>Departamento</Th>
              <Th>Estado</Th>
              <Th>Fecha de Ingreso</Th>
              <Th textAlign="center">Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredEmployees.length === 0 ? (
              <Tr>
                <Td colSpan={7} textAlign="center" py={8}>
                  <VStack spacing={2}>
                    <Icon as={FiUsers} w={12} h={12} color="gray.300" />
                    <Text color="gray.500">No se encontraron empleados</Text>
                    <Text fontSize="sm" color="gray.400">Intenta ajustar los filtros de búsqueda</Text>
                  </VStack>
                </Td>
              </Tr>
            ) : (
              filteredEmployees.map((emp) => (
                <Tr key={emp.id} _hover={{ bg: 'gray.50' }}>
                  <Td>
                    <HStack>
                      <Avatar size="sm" name={emp.name} bg="teal.500" />
                      <Box>
                        <Text fontWeight="semibold" fontSize="sm">{emp.name}</Text>
                        <Text fontSize="xs" color="gray.500">{emp.location}</Text>
                      </Box>
                    </HStack>
                  </Td>
                  <Td>
                    <VStack align="start" spacing={1}>
                      <HStack fontSize="xs">
                        <Icon as={FiMail} color="gray.400" />
                        <Text color="blue.600" cursor="pointer" _hover={{ textDecoration: 'underline' }} onClick={() => handleSendEmail(emp.email)}>
                          {emp.email}
                        </Text>
                      </HStack>
                      <HStack fontSize="xs">
                        <Icon as={FiPhone} color="gray.400" />
                        <Text color="gray.600">{emp.phone}</Text>
                      </HStack>
                    </VStack>
                  </Td>
                  <Td fontSize="sm">{emp.position}</Td>
                  <Td>
                    <Badge colorScheme={departmentColor[emp.department]} fontSize="xs">
                      {emp.department}
                    </Badge>
                  </Td>
                  <Td>
                    <Tag size="sm" colorScheme={statusColor[emp.status]}>
                      {emp.status}
                    </Tag>
                  </Td>
                  <Td fontSize="sm" color="gray.600">{emp.hireDate}</Td>
                  <Td>
                    <HStack justify="center">
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          icon={<FiMoreVertical />}
                          variant="ghost"
                          size="sm"
                        />
                        <MenuList>
                          <MenuItem icon={<FiEye />} onClick={() => handleViewDetails(emp.id)}>
                            Ver Detalles
                          </MenuItem>
                          <MenuItem icon={<FiEdit />} onClick={() => navigate(`/empleados/editar/${emp.id}`)}>
                            Editar
                          </MenuItem>
                          <MenuItem icon={<FiMail />} onClick={() => handleSendEmail(emp.email)}>
                            Enviar Email
                          </MenuItem>
                          <MenuItem icon={<FiTrash2 />} color="red.500" onClick={() => handleDeleteClick(emp.id)}>
                            Eliminar
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </HStack>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Modal de confirmación */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Eliminar Empleado
            </AlertDialogHeader>

            <AlertDialogBody>
              ¿Estás seguro de eliminar este empleado? Esta acción no se puede deshacer.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={handleConfirmDelete} ml={3}>
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}