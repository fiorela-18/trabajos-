import { 
  Box, Heading, VStack, FormControl, FormLabel, Input, Select, 
  Button, Flex, useToast, Textarea
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiSave, FiArrowLeft } from 'react-icons/fi';

// Datos de simulación para carga en modo edición
const mockParticipantData = {
    101: { name: 'Laura Mendoza', role: 'Consultor Externo', project: 'Modernización IT', contractDate: '2024-03-10', description: 'Consultora experta en migración de servicios en la nube.' },
    102: { name: 'Jorge Castro', role: 'Pasante', project: 'Marketing Digital', contractDate: '2024-06-01', description: 'Pasante enfocado en análisis de datos de redes sociales.' },
};

export default function ParticipantFormView({ isEdit = false }) { 
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    project: '',
    contractDate: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  
  // Efecto para cargar datos si estamos en modo edición
  useEffect(() => {
    if (isEdit && id) {
      if (mockParticipantData[id]) {
        setFormData(mockParticipantData[id]);
      } else {
        toast({
          title: 'Error de Carga',
          description: `Participante con ID ${id} no encontrado.`,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        // Si la ruta ya está integrada, redirigimos, si no, solo mostramos el error
        // navigate('/participantes', { replace: true }); 
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
        title: `Participante ${action}.`,
        description: `El participante ${formData.name} ha sido ${action.toLowerCase()} con éxito.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Ya que App.jsx ya tiene la ruta, podemos navegar.
      navigate('/participantes', { replace: true });
    }, 1500);
  };

  return (
    <Box p={6}>
      <Flex mb={8} align="center">
        <Button 
          leftIcon={<FiArrowLeft />} 
          variant="ghost" 
          onClick={() => navigate('/participantes')} // Navegación de vuelta
        >
          Volver a la Lista
        </Button>
        <Heading size="lg" ml={4}>
          {isEdit ? `Editar Participante (ID: ${id})` : 'Registrar Nuevo Participante'} 
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
              <FormLabel>Rol o Puesto</FormLabel>
              <Input 
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Ej: Consultor Externo"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Proyecto Asignado</FormLabel>
              <Select 
                name="project"
                value={formData.project}
                onChange={handleChange}
                placeholder="Selecciona un proyecto"
              >
                <option value="Modernización IT">Modernización IT</option>
                <option value="Marketing Digital">Marketing Digital</option>
                <option value="Diseño Web">Diseño Web</option>
              </Select>
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel>Fecha de Contrato</FormLabel>
              <Input 
                name="contractDate"
                type="date"
                value={formData.contractDate}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Descripción</FormLabel>
              <Textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Detalle de las responsabilidades..."
              />
            </FormControl>
            
            <Flex justify="flex-end" pt={4}>
              <Button 
                type="submit" 
                colorScheme="teal" 
                leftIcon={<FiSave />}
                isLoading={isLoading}
              >
                {isEdit ? 'Actualizar Participante' : 'Guardar Participante'}
              </Button>
            </Flex>
          </VStack>
        </form>
      </Box>
    </Box>
  );
}