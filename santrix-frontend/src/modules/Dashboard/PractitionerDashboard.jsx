import { 
  Box, SimpleGrid, Stat, StatLabel, StatNumber, 
  Heading, Text, VStack, Icon, Flex, Button, Badge, Progress,
  HStack, Divider, Avatar, Card, CardBody, useColorModeValue
} from '@chakra-ui/react';
import { 
  FiCalendar, FiClock, FiBriefcase, FiAward, FiTrendingUp, 
  FiCheckCircle, FiTarget, FiBook, FiStar, FiUser,
  FiCoffee, FiActivity, FiFileText
} from 'react-icons/fi';
import React from 'react';
import { LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Datos para gráficos
const myPerformanceData = [
  { mes: 'Ene', desempeño: 85 },
  { mes: 'Feb', desempeño: 88 },
  { mes: 'Mar', desempeño: 86 },
  { mes: 'Abr', desempeño: 90 },
  { mes: 'May', desempeño: 92 },
  { mes: 'Jun', desempeño: 94 },
];

const skillsData = [
  { skill: 'Comunicación', value: 90 },
  { skill: 'Trabajo en Equipo', value: 85 },
  { skill: 'Liderazgo', value: 78 },
  { skill: 'Resolución de Problemas', value: 92 },
  { skill: 'Creatividad', value: 88 },
  { skill: 'Adaptabilidad', value: 86 },
];

const weeklyHoursData = [
  { day: 'Lun', horas: 8 },
  { day: 'Mar', horas: 8.5 },
  { day: 'Mié', horas: 9 },
  { day: 'Jue', horas: 8 },
  { day: 'Vie', horas: 7 },
];

// Componente de Métrica Personal
const MetricCard = ({ title, value, change, icon, colorScheme = "teal", action }) => (
  <Stat p={5} shadow="lg" borderRadius="xl" bg="white" borderTop="4px" borderColor={`${colorScheme}.500`}>
    <Flex justifyContent="space-between" alignItems="flex-start" mb={3}>
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
      {action && (
        <Button size="xs" colorScheme={colorScheme} variant="ghost">
          {action}
        </Button>
      )}
    </Flex>
    <StatLabel fontWeight="medium" fontSize="sm" color="gray.600" mb={1}>{title}</StatLabel>
    <StatNumber fontSize="2xl" fontWeight="bold" color="gray.800" mb={1}>{value}</StatNumber>
    <Text fontSize="xs" color="gray.500">{change}</Text>
  </Stat>
);

// Widget de Progreso
const ProgressCard = ({ title, items, icon }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  
  return (
    <Box p={5} shadow="lg" borderRadius="xl" bg={cardBg} h="full">
      <HStack mb={4}>
        <Icon as={icon} color="teal.500" w={5} h={5} />
        <Heading size="md">{title}</Heading>
      </HStack>
      <VStack align="stretch" spacing={4}>
        {items.map((item, idx) => (
          <Box key={idx}>
            <Flex justify="space-between" mb={2}>
              <Text fontSize="sm" fontWeight="medium">{item.name}</Text>
              <Text fontSize="sm" fontWeight="bold" color="teal.600">{item.progress}%</Text>
            </Flex>
            <Progress 
              value={item.progress} 
              size="sm" 
              colorScheme={item.progress >= 80 ? 'green' : item.progress >= 50 ? 'blue' : 'orange'}
              borderRadius="full"
            />
            <Text fontSize="xs" color="gray.500" mt={1}>{item.detail}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

// Widget de Eventos/Tareas
const EventCard = ({ title, items, actionLabel, onAction, icon }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  
  return (
    <Box p={5} shadow="lg" borderRadius="xl" bg={cardBg} h="full">
      <Flex justify="space-between" align="center" mb={4}>
        <HStack>
          <Icon as={icon} color="teal.500" w={5} h={5} />
          <Heading size="md">{title}</Heading>
        </HStack>
        {actionLabel && (
          <Button size="sm" colorScheme="teal" variant="ghost" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </Flex>
      <VStack align="stretch" spacing={3} maxH="280px" overflowY="auto">
        {items.map((item, idx) => (
          <Flex 
            key={idx} 
            p={3} 
            bg="gray.50" 
            borderRadius="lg" 
            borderLeft="3px solid"
            borderColor={item.badgeColor ? `${item.badgeColor}.400` : 'gray.400'}
            _hover={{ bg: 'gray.100', transform: 'translateX(4px)' }}
            transition="all 0.2s"
          >
            <Box flex="1">
              <Flex justify="space-between" align="start" mb={1}>
                <Text fontWeight="semibold" fontSize="sm">{item.name}</Text>
                {item.badge && (
                  <Badge colorScheme={item.badgeColor || 'gray'} fontSize="xs">
                    {item.badge}
                  </Badge>
                )}
              </Flex>
              <Text fontSize="xs" color="gray.600">{item.detail}</Text>
            </Box>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

// Tarjeta de Certificaciones
const AchievementsCard = () => {
  const achievements = [
    { name: 'React Básico', date: 'Completado - Jun 2025', icon: FiCheckCircle, color: 'green' },
    { name: 'Scrum Master', date: 'Completado - May 2025', icon: FiCheckCircle, color: 'green' },
    { name: 'Git Avanzado', date: 'En progreso - 75%', icon: FiActivity, color: 'blue' },
    { name: 'Node.js', date: 'Próximo - Oct 2025', icon: FiBook, color: 'orange' },
  ];

  return (
    <Box p={5} shadow="lg" borderRadius="xl" bg="white">
      <HStack mb={4}>
        <Icon as={FiAward} color="teal.500" w={5} h={5} />
        <Heading size="md">Mis Certificaciones</Heading>
      </HStack>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
        {achievements.map((achievement, idx) => (
          <Flex 
            key={idx}
            p={3}
            bg="gray.50"
            borderRadius="lg"
            align="center"
            gap={3}
          >
            <Flex
              w="40px"
              h="40px"
              borderRadius="full"
              bg={`${achievement.color}.100`}
              align="center"
              justify="center"
            >
              <Icon as={achievement.icon} color={`${achievement.color}.500`} />
            </Flex>
            <Box>
              <Text fontWeight="semibold" fontSize="sm">{achievement.name}</Text>
              <Text fontSize="xs" color="gray.600">{achievement.date}</Text>
            </Box>
          </Flex>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default function PractitionerDashboard() {
  const myScheduleToday = { entry: '08:00', departure: '17:00', break: '13:00 - 14:00' };
  const myVacationDays = { available: 12, used: 8, total: 20 };
  
  const myUpcomingEvents = [
    { name: 'Reunión de Equipo', detail: 'Hoy 15:00 - Sala Principal', badge: 'Hoy', badgeColor: 'red' },
    { name: 'Capacitación: React Avanzado', detail: 'Mañana 10:00 - Virtual', badge: 'Mañana', badgeColor: 'orange' },
    { name: 'Evaluación de Desempeño', detail: '30 Oct 09:00 - RRHH', badge: 'Próximo', badgeColor: 'purple' },
    { name: 'Demo de Proyecto', detail: '2 Nov 14:00 - Cliente', badge: 'Próximo', badgeColor: 'blue' },
  ];

  const myTasks = [
    { name: 'Completar módulo de reportes', detail: 'Proyecto Santrix HRMS - Vence mañana', badge: 'Urgente', badgeColor: 'red' },
    { name: 'Revisar documentación API', detail: 'Backend Integration - Vence 20 Oct', badge: 'Alta', badgeColor: 'orange' },
    { name: 'Code Review PR #234', detail: 'Feature de autenticación - Vence 22 Oct', badge: 'Media', badgeColor: 'blue' },
    { name: 'Actualizar tests unitarios', detail: 'Dashboard Component - Vence 25 Oct', badge: 'Baja', badgeColor: 'gray' },
  ];

  const myProjects = [
    { name: 'Santrix HRMS', progress: 75, detail: 'Sistema de gestión de RRHH' },
    { name: 'E-commerce Platform', progress: 45, detail: 'Plataforma de ventas online' },
    { name: 'CRM Integration', progress: 90, detail: 'Integración con Salesforce' },
  ];

  const myTrainings = [
    { name: 'React Avanzado', progress: 60, detail: 'Módulo 6 de 10 completado' },
    { name: 'TypeScript Fundamentals', progress: 85, detail: 'Casi completado' },
    { name: 'Docker & Kubernetes', progress: 30, detail: 'Módulo 3 de 10 completado' },
  ];

  return (
    <Box p={6} bg="gray.50" minH="100vh">
      {/* Header */}
      <Flex justify="space-between" align="center" mb={8}>
        <Box>
          <Heading size="xl" color="gray.800">¡Hola! 👋</Heading>
          <Text color="gray.600" mt={1}>Bienvenido de vuelta, aquí está tu resumen del día.</Text>
        </Box>
        <HStack>
          <Avatar name="Usuario" size="md" bg="teal.500" />
        </HStack>
      </Flex>
      
      {/* Métricas principales */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <MetricCard 
          title="Mi Horario Hoy" 
          value={`${myScheduleToday.entry} - ${myScheduleToday.departure}`}
          change={`Descanso: ${myScheduleToday.break}`}
          icon={FiClock}
          colorScheme="blue"
          action="Ver más"
        />
        <MetricCard 
          title="Vacaciones Disponibles" 
          value={`${myVacationDays.available} días`}
          change={`${myVacationDays.used}/${myVacationDays.total} días usados este año`}
          icon={FiCalendar}
          colorScheme="purple"
          action="Solicitar"
        />
        <MetricCard 
          title="Proyectos Activos" 
          value="3"
          change="2 entregas esta semana"
          icon={FiBriefcase}
          colorScheme="teal"
          action="Ver todos"
        />
        <MetricCard 
          title="Mi Desempeño" 
          value="94%"
          change="Excelente rendimiento ⭐"
          icon={FiTrendingUp}
          colorScheme="green"
          action="Detalles"
        />
      </SimpleGrid>

      {/* Gráficos de rendimiento */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mb={8}>
        {/* Mi evolución de desempeño */}
        <Box p={6} shadow="lg" borderRadius="xl" bg="white">
          <Heading size="md" mb={4}>Mi Evolución de Desempeño</Heading>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={myPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="mes" stroke="#718096" />
              <YAxis stroke="#718096" />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="desempeño" 
                stroke="#38B2AC" 
                strokeWidth={3} 
                dot={{ fill: '#38B2AC', r: 5 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        {/* Mis competencias */}
        <Box p={6} shadow="lg" borderRadius="xl" bg="white">
          <Heading size="md" mb={4}>Mis Competencias</Heading>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={skillsData}>
              <PolarGrid stroke="#E2E8F0" />
              <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar name="Skills" dataKey="value" stroke="#38B2AC" fill="#38B2AC" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </Box>
      </SimpleGrid>

      {/* Horas trabajadas esta semana */}
      <Box p={6} shadow="lg" borderRadius="xl" bg="white" mb={8}>
        <Flex justify="space-between" align="center" mb={4}>
          <Heading size="md">Mis Horas Esta Semana</Heading>
          <Badge colorScheme="teal" fontSize="md" px={3} py={1}>40.5 hrs totales</Badge>
        </Flex>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={weeklyHoursData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="day" stroke="#718096" />
            <YAxis stroke="#718096" />
            <Tooltip />
            <Bar dataKey="horas" radius={[8, 8, 0, 0]}>
              {weeklyHoursData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.horas >= 8 ? '#38B2AC' : '#F6AD55'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Eventos y Tareas */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mb={8}>
        <EventCard 
          title="Mis Próximos Eventos" 
          items={myUpcomingEvents}
          actionLabel="Ver Calendario"
          onAction={() => console.log('Ir a calendario')}
          icon={FiCalendar}
        />
        <EventCard 
          title="Mis Tareas Pendientes" 
          items={myTasks}
          actionLabel="Ver Todas"
          onAction={() => console.log('Ir a tareas')}
          icon={FiTarget}
        />
      </SimpleGrid>

      {/* Progreso de proyectos y capacitaciones */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mb={8}>
        <ProgressCard 
          title="Mis Proyectos" 
          items={myProjects}
          icon={FiBriefcase}
        />
        <ProgressCard 
          title="Mis Capacitaciones" 
          items={myTrainings}
          icon={FiBook}
        />
      </SimpleGrid>

      {/* Certificaciones */}
      <AchievementsCard />

      {/* Acciones rápidas */}
      <Box p={6} shadow="lg" borderRadius="xl" bg="white" mt={8}>
        <Heading size="md" mb={4}>Acciones Rápidas</Heading>
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
          <Button leftIcon={<FiCalendar />} colorScheme="teal" size="lg" h="60px">
            Solicitar Vacaciones
          </Button>
          <Button leftIcon={<FiFileText />} colorScheme="blue" variant="outline" size="lg" h="60px">
            Mis Documentos
          </Button>
          <Button leftIcon={<FiCoffee />} colorScheme="purple" variant="outline" size="lg" h="60px">
            Marcar Descanso
          </Button>
          <Button leftIcon={<FiStar />} colorScheme="orange" variant="outline" size="lg" h="60px">
            Feedback 360°
          </Button>
        </SimpleGrid>
      </Box>
    </Box>
  );
}