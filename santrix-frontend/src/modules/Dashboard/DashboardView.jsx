import { 
  Box, SimpleGrid, Stat, StatLabel, StatNumber, // <-- SOLO COMPONENTES ESTABLES
  Heading, Text, VStack, Icon, Flex 
} from '@chakra-ui/react';
// ¡Las importaciones fallidas (StatHelpText, StatArrow) han sido ELIMINADAS!

import { FiUsers, FiBriefcase, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';
import React from 'react';

// Componente reusable para las tarjetas de métricas (Simplificado)
const MetricCard = ({ title, value, change, changeType, icon }) => (
  <Stat p={5} shadow="md" border="1px" borderColor="gray.100" borderRadius="lg" bg="white">
    <Flex justifyContent="space-between" alignItems="center">
      <Box>
        <StatLabel fontWeight="medium" fontSize="sm">{title}</StatLabel>
        <StatNumber fontSize="2xl" fontWeight="bold" my={1}>{value}</StatNumber>
        
        {/* Usamos Text en lugar de StatHelpText/StatArrow */}
        <Text 
          fontSize="xs" 
          fontWeight="medium"
          color={changeType === 'increase' ? 'green.500' : 'red.500'} 
          m={0}
        >
          {change} este mes
        </Text>
        
      </Box>
      <Icon as={icon} w={8} h={8} color="teal.500" />
    </Flex>
  </Stat>
);

export default function DashboardView() {
  return (
    <Box p={6} bg="gray.50">
      <Heading size="lg" mb={6}>Panel Principal (Dashboard)</Heading>
      
      {/* 1. MÓDULO DE MÉTRICAS */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={10}>
        <MetricCard 
          title="Empleados Activos" 
          value="125" 
          change="5.2% ▲" 
          changeType="increase" 
          icon={FiUsers}
        />
        <MetricCard 
          title="Proyectos en Curso" 
          value="18" 
          change="1.1% ▲" 
          changeType="increase" 
          icon={FiBriefcase}
        />
        <MetricCard 
          title="Vacaciones Pendientes" 
          value="4" 
          change="30 días ▼" 
          changeType="decrease" 
          icon={FiAlertTriangle}
        />
        <MetricCard 
          title="Tareas Finalizadas" 
          value="987" 
          change="12% ▲" 
          changeType="increase" 
          icon={FiCheckCircle}
        />
      </SimpleGrid>

      {/* 2. ESPACIO PARA GRÁFICOS Y TABLAS (CONTENIDO PRINCIPAL) */}
      <VStack spacing={6} align="stretch">
        <Box p={5} shadow="md" border="1px" borderColor="gray.100" borderRadius="lg" bg="white" minH="300px">
          <Heading size="md" mb={4}>Resumen de Desempeño</Heading>
          <Text color="gray.500">Aquí irá el gráfico de rendimiento trimestral.</Text>
        </Box>
        
        <Box p={5} shadow="md" border="1px" borderColor="gray.100" borderRadius="lg" bg="white" minH="300px">
          <Heading size="md" mb={4}>Eventos y Anuncios Recientes</Heading>
          <Text color="gray.500">Aquí irá una lista de las últimas noticias de la empresa.</Text>
        </Box>
      </VStack>

    </Box>
  );
}