import { 
  Box, Heading, Text, SimpleGrid, Stat, StatLabel, StatNumber,
  Button, Flex, Icon, Table, Thead, Tbody, Tr, Th, Td, Badge,
  Progress, Avatar, HStack, VStack, Tabs, TabList, TabPanels, Tab, TabPanel,
  Card, CardBody, Divider
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { 
  FiTrendingUp, FiAward, FiTarget, FiUsers, FiEdit, FiEye,
  FiCalendar, FiCheckCircle, FiAlertCircle, FiStar, FiBarChart2
} from 'react-icons/fi';
import { 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Cell
} from 'recharts';

// ==================== COMPONENTES COMPARTIDOS ====================

const MetricCard = ({ title, value, subtitle, icon, colorScheme = "teal" }) => (
  <Stat p={5} shadow="lg" borderRadius="xl" bg="white" borderTop="4px" borderColor={`${colorScheme}.500`}>
    <Flex justify="space-between" align="start" mb={2}>
      <Flex 
        w="50px" 
        h="50px" 
        borderRadius="lg" 
        bg={`${colorScheme}.50`} 
        align="center" 
        justify="center"
      >
        <Icon as={icon} w={6} h={6} color={`${colorScheme}.500`} />
      </Flex>
    </Flex>
    <StatLabel fontWeight="medium" fontSize="sm" color="gray.600" mb={1}>{title}</StatLabel>
    <StatNumber fontSize="2xl" fontWeight="bold" color="gray.800" mb={1}>{value}</StatNumber>
    <Text fontSize="xs" color="gray.500">{subtitle}</Text>
  </Stat>
);

// ==================== VISTA DE ADMINISTRADOR ====================

const AdminPerformanceSection = () => {
  // Datos de ejemplo para admin
  const employeePerformance = [
    { id: 1, name: 'Juan Pérez', position: 'Frontend Dev', score: 92, status: 'Excelente', lastReview: '15 Sep 2025', nextReview: '15 Dic 2025' },
    { id: 2, name: 'María García', position: 'UX Designer', score: 88, status: 'Muy Bueno', lastReview: '10 Sep 2025', nextReview: '10 Dic 2025' },
    { id: 3, name: 'Carlos López', position: 'Backend Dev', score: 95, status: 'Excelente', lastReview: '12 Sep 2025', nextReview: '12 Dic 2025' },
    { id: 4, name: 'Ana Martínez', position: 'Project Manager', score: 85, status: 'Bueno', lastReview: '08 Sep 2025', nextReview: '08 Dic 2025' },
    { id: 5, name: 'Pedro Silva', position: 'QA Engineer', score: 78, status: 'Aceptable', lastReview: '20 Ago 2025', nextReview: '20 Nov 2025' },
  ];

  const departmentPerformance = [
    { department: 'Desarrollo', score: 91 },
    { department: 'Diseño', score: 87 },
    { department: 'Marketing', score: 84 },
    { department: 'RRHH', score: 89 },
    { department: 'Ventas', score: 82 },
  ];

  const monthlyTrend = [
    { month: 'Ene', score: 82 },
    { month: 'Feb', score: 84 },
    { month: 'Mar', score: 83 },
    { month: 'Abr', score: 86 },
    { month: 'May', score: 88 },
    { month: 'Jun', score: 90 },
  ];

  const getScoreColor = (score) => {
    if (score >= 90) return 'green';
    if (score >= 80) return 'blue';
    if (score >= 70) return 'orange';
    return 'red';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Excelente': return 'green';
      case 'Muy Bueno': return 'blue';
      case 'Bueno': return 'cyan';
      case 'Aceptable': return 'orange';
      default: return 'red';
    }
  };

  return (
    <Box maxW="1200px" mx="auto" w="100%">
      {/* Header */}
      <Flex justify="space-between" align="center" mb={8}>
        <Box>
          <Heading size="xl" color="gray.800" fontSize="2xl">Gestión de Desempeño</Heading>
          <Text color="gray.600" mt={1} fontSize="md">Monitorea y evalúa el rendimiento de todo el equipo</Text>
        </Box>
        <HStack>
          <Button leftIcon={<FiCalendar />} colorScheme="teal" size="sm">
            Programar Evaluación
          </Button>
          <Button leftIcon={<FiBarChart2 />} colorScheme="blue" variant="outline" size="sm">
            Generar Reporte
          </Button>
        </HStack>
      </Flex>

      {/* Métricas Generales */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <MetricCard 
          title="Puntuación Promedio"
          value="88.6%"
          subtitle="↑ 3.2% vs trimestre anterior"
          icon={FiTrendingUp}
          colorScheme="teal"
        />
        <MetricCard 
          title="Evaluaciones Pendientes"
          value="12"
          subtitle="Vencen en 15 días"
          icon={FiAlertCircle}
          colorScheme="orange"
        />
        <MetricCard 
          title="Empleados Destacados"
          value="18"
          subtitle="Con puntuación ≥ 90%"
          icon={FiAward}
          colorScheme="green"
        />
        <MetricCard 
          title="Objetivos Cumplidos"
          value="76%"
          subtitle="94 de 124 objetivos"
          icon={FiTarget}
          colorScheme="blue"
        />
      </SimpleGrid>

      {/* Gráficos */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mb={8}>
        {/* Tendencia mensual */}
        <Box p={6} shadow="lg" borderRadius="xl" bg="white">
          <Heading size="lg" mb={4} fontSize="lg">Tendencia de Desempeño General</Heading>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" stroke="#718096" />
              <YAxis stroke="#718096" domain={[0, 100]} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#38B2AC" 
                strokeWidth={3}
                dot={{ fill: '#38B2AC', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        {/* Desempeño por departamento */}
        <Box p={6} shadow="lg" borderRadius="xl" bg="white">
          <Heading size="lg" mb={4} fontSize="lg">Desempeño por Departamento</Heading>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={departmentPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="department" stroke="#718096" />
              <YAxis stroke="#718096" domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                {departmentPerformance.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.score >= 85 ? '#38B2AC' : entry.score >= 75 ? '#4299E1' : '#ED8936'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </SimpleGrid>

      {/* Tabla de empleados */}
      <Box p={6} shadow="lg" borderRadius="xl" bg="white">
        <Flex justify="space-between" align="center" mb={4}>
          <Heading size="lg" fontSize="lg">Evaluaciones del Equipo</Heading>
          <Button size="sm" leftIcon={<FiUsers />} colorScheme="teal" variant="outline">
            Ver Todos (125)
          </Button>
        </Flex>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr bg="gray.50">
              <Th fontSize="sm">Empleado</Th>
              <Th fontSize="sm">Cargo</Th>
              <Th fontSize="sm">Puntuación</Th>
              <Th fontSize="sm">Estado</Th>
              <Th fontSize="sm">Última Evaluación</Th>
              <Th fontSize="sm">Próxima Evaluación</Th>
              <Th textAlign="center" fontSize="sm">Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {employeePerformance.map((emp) => (
              <Tr key={emp.id} _hover={{ bg: 'gray.50' }}>
                <Td>
                  <HStack>
                    <Avatar size="sm" name={emp.name} bg="teal.500" />
                    <Text fontWeight="medium" fontSize="sm">{emp.name}</Text>
                  </HStack>
                </Td>
                <Td fontSize="sm">{emp.position}</Td>
                <Td>
                  <HStack>
                    <Progress 
                      value={emp.score} 
                      size="sm" 
                      colorScheme={getScoreColor(emp.score)}
                      width="80px"
                      borderRadius="full"
                    />
                    <Text fontWeight="bold" fontSize="sm" color={`${getScoreColor(emp.score)}.600`}>
                      {emp.score}%
                    </Text>
                  </HStack>
                </Td>
                <Td>
                  <Badge colorScheme={getStatusColor(emp.status)} fontSize="sm" px={2} py={1}>
                    {emp.status}
                  </Badge>
                </Td>
                <Td fontSize="sm" color="gray.600">{emp.lastReview}</Td>
                <Td fontSize="sm" color="gray.600">{emp.nextReview}</Td>
                <Td>
                  <HStack justify="center">
                    <Button size="sm" leftIcon={<FiEye />} colorScheme="blue" variant="ghost">
                      Ver
                    </Button>
                    <Button size="sm" leftIcon={<FiEdit />} colorScheme="teal" variant="ghost">
                      Evaluar
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

// ==================== VISTA DE PARTICIPANTE ====================

const ParticipantPerformanceSection = () => {
  // Datos personales del participante
  const myPerformance = {
    currentScore: 92,
    lastScore: 88,
    trend: 'increase',
    evaluationDate: '15 Sep 2025',
    nextEvaluation: '15 Dic 2025',
    position: 'Frontend Developer',
  };

  const mySkills = [
    { skill: 'Comunicación', value: 90 },
    { skill: 'Trabajo en Equipo', value: 95 },
    { skill: 'Resolución de Problemas', value: 88 },
    { skill: 'Liderazgo', value: 82 },
    { skill: 'Creatividad', value: 91 },
    { skill: 'Adaptabilidad', value: 87 },
  ];

  const myGoals = [
    { id: 1, goal: 'Mejorar velocidad de desarrollo', progress: 85, status: 'En progreso', deadline: '30 Nov 2025' },
    { id: 2, goal: 'Completar certificación React Avanzado', progress: 60, status: 'En progreso', deadline: '15 Dic 2025' },
    { id: 3, goal: 'Liderar proyecto E-commerce', progress: 45, status: 'En progreso', deadline: '31 Ene 2026' },
    { id: 4, goal: 'Mentor de 2 desarrolladores junior', progress: 100, status: 'Completado', deadline: '30 Sep 2025' },
  ];

  const performanceTrend = [
    { period: 'Q1 2025', score: 85 },
    { period: 'Q2 2025', score: 88 },
    { period: 'Q3 2025', score: 92 },
  ];

  const feedback = [
    { from: 'Manager Directo', comment: 'Excelente trabajo en el último sprint. Destaco tu capacidad de resolver problemas complejos.', date: '15 Sep 2025', rating: 5 },
    { from: 'Tech Lead', comment: 'Muy buena colaboración en el proyecto. Sugiero trabajar más en la documentación del código.', date: '10 Sep 2025', rating: 4 },
    { from: 'Compañero de Equipo', comment: 'Gran compañero, siempre dispuesto a ayudar. Aprendí mucho trabajando contigo.', date: '08 Sep 2025', rating: 5 },
  ];

  return (
    <Box maxW="1200px" mx="auto" w="100%">
      {/* Header - Exactamente igual que admin */}
      <Flex justify="space-between" align="center" mb={8}>
        <Box>
          <Heading size="xl" color="gray.800" fontSize="2xl">Mi Desempeño</Heading>
          <Text color="gray.600" mt={1} fontSize="md">Revisa tu progreso, objetivos y feedback recibido</Text>
        </Box>
        <Button leftIcon={<FiStar />} colorScheme="teal" size="sm">
          Auto-evaluación
        </Button>
      </Flex>

      {/* Métricas Generales - Mismo grid que admin */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <MetricCard 
          title="Puntuación Actual"
          value="92%"
          subtitle="↑ +4% vs última evaluación"
          icon={FiTrendingUp}
          colorScheme="teal"
        />
        <MetricCard 
          title="Objetivos Cumplidos"
          value="3/4"
          subtitle="75% de cumplimiento"
          icon={FiTarget}
          colorScheme="green"
        />
        <MetricCard 
          title="Feedback Positivo"
          value="12"
          subtitle="En los últimos 3 meses"
          icon={FiAward}
          colorScheme="blue"
        />
        <MetricCard 
          title="Rating Promedio"
          value="4.7/5"
          subtitle="Basado en feedback"
          icon={FiStar}
          colorScheme="purple"
        />
      </SimpleGrid>

      {/* Gráficos - Mismo layout que admin */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mb={8}>
        {/* Evaluación de competencias */}
        <Box p={6} shadow="lg" borderRadius="xl" bg="white">
          <Heading size="lg" mb={4} fontSize="lg">Evaluación de Competencias</Heading>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={mySkills}>
              <PolarGrid stroke="#E2E8F0" />
              <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar name="Tu Nivel" dataKey="value" stroke="#38B2AC" fill="#38B2AC" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </Box>

        {/* Progreso histórico */}
        <Box p={6} shadow="lg" borderRadius="xl" bg="white">
          <Heading size="lg" mb={4} fontSize="lg">Progreso Histórico</Heading>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={performanceTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="period" stroke="#718096" />
              <YAxis stroke="#718096" domain={[0, 100]} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#38B2AC" 
                strokeWidth={3}
                dot={{ fill: '#38B2AC', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </SimpleGrid>

      {/* Tabla de objetivos - Mismo estilo que tabla de admin */}
      <Box p={6} shadow="lg" borderRadius="xl" bg="white">
        <Flex justify="space-between" align="center" mb={4}>
          <Heading size="lg" fontSize="lg">Mis Objetivos de Desempeño</Heading>
          <Button size="sm" leftIcon={<FiTarget />} colorScheme="teal" variant="outline">
            Ver Todos
          </Button>
        </Flex>
        <VStack align="stretch" spacing={4}>
          {myGoals.map((goal) => (
            <Box key={goal.id} p={4} bg="gray.50" borderRadius="lg">
              <Flex justify="space-between" align="start" mb={2}>
                <Box flex="1">
                  <Text fontWeight="semibold" fontSize="sm">{goal.goal}</Text>
                  <Text fontSize="sm" color="gray.600" mt={1}>Fecha límite: {goal.deadline}</Text>
                </Box>
                <Badge colorScheme={goal.status === 'Completado' ? 'green' : 'blue'} fontSize="sm" px={2} py={1}>
                  {goal.status}
                </Badge>
              </Flex>
              <Flex align="center" gap={3} mt={3}>
                <Progress 
                  value={goal.progress} 
                  size="sm" 
                  colorScheme={goal.progress === 100 ? 'green' : 'blue'}
                  flex="1"
                  borderRadius="full"
                />
                <Text fontWeight="bold" fontSize="sm" color={goal.progress === 100 ? 'green.600' : 'blue.600'}>
                  {goal.progress}%
                </Text>
              </Flex>
            </Box>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

// ==================== COMPONENTE PRINCIPAL ====================

export default function PerformanceView() {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const role = localStorage.getItem('user_role');
    setUserRole(role || '');
  }, []);

  const isAdmin = userRole === 'admin';

  return (
    <Box p={6} bg="gray.50" minH="100vh">
      {isAdmin ? <AdminPerformanceSection /> : <ParticipantPerformanceSection />}
    </Box>
  );
}