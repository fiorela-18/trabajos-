import { 
  Box, Heading, Text, Button, Flex, Spacer, 
  Table, Thead, Tbody, Tr, Th, Td, TableContainer, Tag,
  AlertDialog, AlertDialogBody, AlertDialogFooter,
  AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, 
  useDisclosure, useToast // <-- IMPORTACIONES ADICIONALES
} from '@chakra-ui/react';
import React, { useState, useRef } from 'react'; // <-- AÑADIR useState y useRef
import { useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

// Datos de Simulación (AHORA ESTADO INICIAL)
const initialEmployees = [
  { id: 1, name: 'Alejandro Pérez', position: 'Desarrollador Senior', department: 'Tecnología', status: 'Activo' },
  { id: 2, name: 'Carla Soto', position: 'Diseñadora UX/UI', department: 'Diseño', status: 'Activo' },
  { id: 3, name: 'Roberto Gómez', position: 'Gerente de Ventas', department: 'Comercial', status: 'Ausente' },
  { id: 4, name: 'Sofía Reyes', position: 'Contadora', department: 'Finanzas', status: 'Activo' },
  { id: 5, name: 'Manuel Torres', position: 'Analista de RRHH', department: 'Talento Humano', status: 'Activo' },
];

// Mapeo de estados a colores de etiquetas
const statusColor = {
    'Activo': 'green',
    'Ausente': 'orange',
    'Inactivo': 'red'
};

export default function EmployeeListView() {
  const navigate = useNavigate();
  const toast = useToast();
  
  // ESTADOS PARA DATOS Y ELIMINACIÓN
  const [employees, setEmployees] = useState(initialEmployees);
  const [employeeToDelete, setEmployeeToDelete] = useState(null); // ID del empleado a borrar
  
  // ESTADOS PARA EL MODAL DE CONFIRMACIÓN
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  // 1. Función para abrir el modal de confirmación
  const handleDeleteClick = (id) => {
    setEmployeeToDelete(id);
    onOpen();
  };

  // 2. Función para ejecutar la eliminación simulada
  const handleConfirmDelete = () => {
    // Simulación de la API de eliminación
    setTimeout(() => {
        setEmployees(currentEmployees => 
            currentEmployees.filter(emp => emp.id !== employeeToDelete)
        );
        
        const deletedEmployee = initialEmployees.find(emp => emp.id === employeeToDelete);

        toast({
            title: 'Empleado Eliminado',
            description: `El empleado "${deletedEmployee?.name || 'ID ' + employeeToDelete}" ha sido removido.`,
            status: 'warning',
            duration: 3000,
            isClosable: true,
        });

        onClose(); // Cierra el modal
        setEmployeeToDelete(null);
    }, 500);
  };


  return (
    <Box p={6}>
      {/* HEADER con botón de creación */}
      <Flex mb={6} align="center">
        <Heading size="lg">Lista de Empleados</Heading>
        <Spacer />
        <Button 
          leftIcon={<FiPlus />} 
          colorScheme="teal"
          onClick={() => navigate('/empleados/nuevo')}
        >
          Nuevo Empleado
        </Button>
      </Flex>
      
      <Text mb={6} color="gray.600">
        Gestión centralizada de todo el personal activo en la organización.
      </Text>

      {/* Tabla de Empleados */}
      <TableContainer borderWidth={1} borderRadius="lg" bg="white" shadow="sm">
        <Table variant="simple">
          <Thead bg="gray.50">
            <Tr>
              <Th>Nombre Completo</Th>
              <Th>Posición</Th>
              <Th>Departamento</Th>
              <Th>Estado</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {employees.map((emp) => (
              <Tr key={emp.id} _hover={{ bg: 'gray.50' }}>
                <Td fontWeight="medium">{emp.name}</Td>
                <Td>{emp.position}</Td>
                <Td>{emp.department}</Td>
                <Td>
                  <Tag size="sm" colorScheme={statusColor[emp.status]}>
                    {emp.status}
                  </Tag>
                </Td>
                <Td>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    colorScheme="blue" 
                    mr={2}
                    onClick={() => navigate(`/empleados/editar/${emp.id}`)}
                  >
                    Ver/Editar
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    colorScheme="red"
                    onClick={() => handleDeleteClick(emp.id)} // <-- LLAMA A LA FUNCIÓN DE ELIMINACIÓN
                  >
                    Eliminar
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* MODAL DE CONFIRMACIÓN DE ELIMINACIÓN */}
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
              ¿Estás seguro? Esta acción eliminará permanentemente al empleado del sistema (simulado).
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