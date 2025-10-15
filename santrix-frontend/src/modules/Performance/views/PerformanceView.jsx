import { Box, Heading, Text, Center, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, StatArrow } from '@chakra-ui/react';
import React from 'react';

export default function PerformanceView() {
  return (
    <Box p={6}>
      <Heading size="lg" mb={6}>Gestión de Desempeño</Heading>
      <Text mb={8} color="gray.600">
        Resumen de las métricas clave de rendimiento del personal.
      </Text>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mb={10}>
        <Stat p={5} shadow="md" border="1px" borderColor="gray.200" borderRadius="lg" bg="white">
          <StatLabel>Puntuación Promedio</StatLabel>
          <StatNumber>4.2 / 5.0</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            2.1% desde el último trimestre
          </StatHelpText>
        </Stat>
        <Stat p={5} shadow="md" border="1px" borderColor="gray.200" borderRadius="lg" bg="white">
          <StatLabel>Revisiones Pendientes</StatLabel>
          <StatNumber>15</StatNumber>
          <StatHelpText>
            Aún por completar este ciclo
          </StatHelpText>
        </Stat>
        <Stat p={5} shadow="md" border="1px" borderColor="gray.200" borderRadius="lg" bg="white">
          <StatLabel>Empleados Destacados</StatLabel>
          <StatNumber>8</StatNumber>
          <StatHelpText>
            Reconocidos por alta productividad
          </StatHelpText>
        </Stat>
      </SimpleGrid>

      <Center mt={12} p={10} bg="teal.50" borderRadius="md" borderWidth={1} borderColor="teal.200">
        <Text fontSize="xl" color="teal.800">
          Aquí se implementaría la lista de revisiones de desempeño y gráficos detallados.
        </Text>
      </Center>
    </Box>
  );
}