import { Box, Heading, Text, Center, SimpleGrid, Card, CardHeader, CardBody, Stack, Badge } from '@chakra-ui/react';
import React from 'react';

export default function ProjectsView() {
  return (
    <Box p={6}>
      <Heading size="lg" mb={6}>Gestión de Proyectos</Heading>
      <Text mb={8} color="gray.600">
        Visualización del estado y progreso de los proyectos activos de la organización.
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mb={10}>
        <Card p={5} shadow="md" borderRadius="lg">
            <CardHeader>
                <Heading size='md'>Modernización IT</Heading>
            </CardHeader>
            <CardBody>
                <Stack spacing='4'>
                    <Text fontSize='sm'>Lider: Juan Pérez</Text>
                    <Text fontSize='sm'>Estado: <Badge colorScheme='green'>En Curso</Badge></Text>
                    <Text fontSize='sm'>Progreso: 75%</Text>
                </Stack>
            </CardBody>
        </Card>
        <Card p={5} shadow="md" borderRadius="lg">
            <CardHeader>
                <Heading size='md'>Campaña Marketing Digital</Heading>
            </CardHeader>
            <CardBody>
                <Stack spacing='4'>
                    <Text fontSize='sm'>Lider: Carla Soto</Text>
                    <Text fontSize='sm'>Estado: <Badge colorScheme='yellow'>Pendiente</Badge></Text>
                    <Text fontSize='sm'>Progreso: 15%</Text>
                </Stack>
            </CardBody>
        </Card>
      </SimpleGrid>

      <Center mt={12} p={10} bg="blue.50" borderRadius="md" borderWidth={1} borderColor="blue.200">
        <Text fontSize="xl" color="blue.800">
          Aquí se implementaría el listado completo y la gestión de tareas de proyectos.
        </Text>
      </Center>
    </Box>
  );
}