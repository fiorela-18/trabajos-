import { Box, Heading, Text, Center, List, ListItem, ListIcon } from '@chakra-ui/react';
import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';

export default function TrainingView() {
  return (
    <Box p={6}>
      <Heading size="lg" mb={6}>Planes de Capacitación</Heading>
      <Text mb={8} color="gray.600">
        Registro y seguimiento de los cursos y entrenamientos asignados al personal.
      </Text>

      <List spacing={3} p={5} shadow="md" border="1px" borderColor="gray.200" borderRadius="lg" bg="white">
        <ListItem>
          <ListIcon as={FiCheckCircle} color="green.500" />
          Curso Avanzado de AWS (12 Empleados)
        </ListItem>
        <ListItem>
          <ListIcon as={FiCheckCircle} color="green.500" />
          Taller de Liderazgo para Gerentes (8 Participantes)
        </ListItem>
        <ListItem>
          <ListIcon as={FiCheckCircle} color="yellow.500" />
          Inducción de Seguridad y Salud (Pendiente: 2 Nuevos)
        </ListItem>
        <ListItem>
          <ListIcon as={FiCheckCircle} color="green.500" />
          Módulo de Ética Empresarial (Finalizado)
        </ListItem>
      </List>

      <Center mt={12} p={10} bg="purple.50" borderRadius="md" borderWidth={1} borderColor="purple.200">
        <Text fontSize="xl" color="purple.800">
          Aquí se implementaría la asignación de cursos y el seguimiento del progreso individual.
        </Text>
      </Center>
    </Box>
  );
}