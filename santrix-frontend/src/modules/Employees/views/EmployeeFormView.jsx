import { 
  Box, Heading, VStack, FormControl, FormLabel, Input, Select, 
  Button, Flex, useToast 
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiSave, FiArrowLeft } from 'react-icons/fi';

// Datos de simulación para carga en modo edición
const mockEmployeeData = {
    1: { name: 'Alejandro Pérez', position: 'Desarrollador Senior', department: 'Tecnología', hireDate: '2020-05-15' },
    2: { name: 'Carla Soto', position: 'Diseñadora UX/UI', department: 'Diseño', hireDate: '2023-01-20' },
};

export default function EmployeeFormView({ isEdit = false }) { 
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: '',
    hireDate: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  
  // Efecto para cargar datos si estamos en modo edición
  useEffect(() => {
    if (isEdit && id) {
      if (mockEmployeeData[id]) {
        setFormData(mockEmployeeData[id]);
      } else {
        toast({
          title: 'Error de Carga',
          description: `Empleado con ID ${id} no encontrado.`,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        navigate('/empleados', { replace: true });
      }
    }
  }, [isEdit, id, navigate, toast]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulación de envío
    setTimeout(() => {
      setIsLoading(false);
      
      const action = isEdit ? 'Actualizado' : 'Creado';
      
      toast({
        title: `Empleado ${action}.`,
        description: `El empleado ${formData.name} ha sido ${action.toLowerCase()} con éxito.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Redirigir de vuelta
      navigate('/empleados', { replace: true });
    }, 1500);
  };

  return (
    <Box p={6}>
      <Flex mb={8} align="center">
        <Button 
          leftIcon={<FiArrowLeft />} 
          variant="ghost" 
          onClick={() => navigate('/empleados')}
        >
          Volver a la Lista
        </Button>
        <Heading size="lg" ml={4}>
          {isEdit ? `Editar Empleado (ID: ${id})` : 'Registrar Nuevo Empleado'} 
        </Heading>
      </Flex>

      <Box 
        p={6} 
        maxWidth="900px" 
        borderWidth={1} 
        borderRadius="lg" 
        bg="white" 
        shadow="md"
      >
        <form onSubmit={handleSubmit}>
          <VStack spacing={6} align="stretch">
            
            <FormControl isRequired>
              <FormLabel>Nombre Completo</FormLabel>
              <Input 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej: Laura Mendoza"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Puesto/Posición</FormLabel>
              <Input 
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Ej: Desarrollador Backend"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Departamento</FormLabel>
              <Select 
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Selecciona un departamento"
              >
                <option value="Tecnología">Tecnología</option>
                <option value="Talento Humano">Talento Humano</option>
                <option value="Comercial">Comercial</option>
                <option value="Finanzas">Finanzas</option>
              </Select>
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel>Fecha de Contratación</FormLabel>
              <Input 
                name="hireDate"
                type="date"
                value={formData.hireDate}
                onChange={handleChange}
              />
            </FormControl>
            
            <Flex justify="flex-end" pt={4}>
              <Button 
                type="submit" 
                colorScheme="teal" 
                leftIcon={<FiSave />}
                isLoading={isLoading}
              >
                {isEdit ? 'Actualizar Empleado' : 'Guardar Empleado'}
              </Button>
            </Flex>
          </VStack>
        </form>
      </Box>
    </Box>
  );
}