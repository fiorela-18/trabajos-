import { 
  Box, Heading, Text, SimpleGrid, Card, CardBody, Stack, Badge,
  Button, Flex, Icon, Progress, Avatar, HStack, VStack, AvatarGroup,
  Divider, Tag, Stat, StatLabel, StatNumber, StatHelpText, useColorModeValue,
  Tooltip, Skeleton, SkeletonCircle, SkeletonText
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { 
  FiBriefcase, FiPlus, FiEdit, FiTrash2, FiUsers, FiUser, // ← Añade FiUser aquí
  FiClock, FiCheckCircle, FiAlertCircle, FiTrendingUp, FiCalendar,
  FiTarget, FiFileText, FiBarChart2, FiShield, FiMessageSquare,
  FiAward, FiHelpCircle, FiMapPin, FiActivity, FiEye, FiSend,
  FiInfo, FiZap, FiDollarSign, FiAlertTriangle
} from 'react-icons/fi';
import { 
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer
} from 'recharts';

// ==================== DATOS MOCK MEJORADOS ====================

const allProjects = [
  {
    id: 1,
    name: 'Modernización IT',
    description: 'Actualización de infraestructura tecnológica',
    leader: 'Juan Pérez',
    team: ['Juan Pérez', 'María García', 'Carlos López', 'Lucía Fernández'],
    status: 'En Curso',
    progress: 75,
    priority: 'Alta',
    startDate: '01 Ene 2025',
    endDate: '30 Nov 2025',
    budget: 150000,
    spent: 112500,
    tasks: { total: 45, completed: 34, inProgress: 8, pending: 3 },
    risk: 'Bajo',
    lastUpdate: '2025-10-25'
  },
  {
    id: 2,
    name: 'Campaña Marketing Digital',
    description: 'Estrategia de marketing en redes sociales',
    leader: 'Carla Soto',
    team: ['Carla Soto', 'Ana Martínez', 'Pedro Silva'],
    status: 'Pendiente',
    progress: 15,
    priority: 'Media',
    startDate: '15 Sep 2025',
    endDate: '15 Dic 2025',
    budget: 80000,
    spent: 12000,
    tasks: { total: 30, completed: 5, inProgress: 3, pending: 22 },
    risk: 'Alto',
    lastUpdate: '2025-10-20'
  },
  {
    id: 3,
    name: 'Sistema ERP',
    description: 'Implementación de sistema de gestión empresarial',
    leader: 'Roberto Díaz',
    team: ['Roberto Díaz', 'Laura Torres', 'Miguel Ángel', 'Elena Ruiz'],
    status: 'En Curso',
    progress: 60,
    priority: 'Alta',
    startDate: '01 Mar 2025',
    endDate: '31 Dic 2025',
    budget: 200000,
    spent: 120000,
    tasks: { total: 60, completed: 36, inProgress: 15, pending: 9 },
    risk: 'Medio',
    lastUpdate: '2025-10-26'
  },
  {
    id: 4,
    name: 'App Mobile Cliente',
    description: 'Desarrollo de aplicación móvil para clientes',
    leader: 'Sofia Ramírez',
    team: ['Sofia Ramírez', 'Diego Vargas'],
    status: 'Completado',
    progress: 100,
    priority: 'Alta',
    startDate: '01 Ene 2025',
    endDate: '30 Ago 2025',
    budget: 120000,
    spent: 118000,
    tasks: { total: 50, completed: 50, inProgress: 0, pending: 0 },
    risk: 'Nulo',
    lastUpdate: '2025-08-30'
  },
];

const myProjects = [
  {
    id: 1,
    name: 'Modernización IT',
    role: 'Líder de Proyecto',
    progress: 75,
    myTasks: { total: 12, completed: 9, inProgress: 2, pending: 1 },
    nextDeadline: '2025-10-25',
    status: 'En Curso',
    feedback: 4.8,
    mentor: 'Dr. Andrés Mendoza'
  },
  {
    id: 3,
    name: 'Sistema ERP',
    role: 'Desarrollador Frontend',
    progress: 60,
    myTasks: { total: 8, completed: 5, inProgress: 2, pending: 1 },
    nextDeadline: '2025-10-30',
    status: 'En Curso',
    feedback: 4.5,
    mentor: 'Ing. Claudia Rojas'
  },
];

// ==================== ICONOS POR ROL Y CONTEXTO ====================

const getIconByStatus = (status) => {
  switch (status) {
    case 'En Curso': return FiActivity;
    case 'Completado': return FiAward;
    case 'Pendiente': return FiHelpCircle;
    case 'En Pausa': return FiMapPin;
    default: return FiAlertTriangle;
  }
};

const getColorByStatus = (status) => {
  switch (status) {
    case 'En Curso': return 'blue';
    case 'Completado': return 'green';
    case 'Pendiente': return 'orange';
    case 'En Pausa': return 'gray';
    default: return 'red';
  }
};

const getColorByRisk = (risk) => {
  switch (risk) {
    case 'Bajo': return 'green';
    case 'Medio': return 'yellow';
    case 'Alto': return 'red';
    default: return 'gray';
  }
};

// ==================== ADMIN VIEW - REINVENTADO ====================

const AdminProjectsSection = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.750');

  // Datos para gráficos
  const budgetData = allProjects.map(p => ({
    name: p.name,
    Presupuesto: p.budget / 1000,
    Gastado: p.spent / 1000
  }));

  const statusData = [
    { name: 'En Curso', value: 2 },
    { name: 'Completado', value: 1 },
    { name: 'Pendiente', value: 1 }
  ];

  const COLORS = ['#3182CE', '#38A169', '#DD6B20'];

  return (
    <Box maxW="1400px" mx="auto">
      {/* Hero */}
      <VStack align="start" spacing={2} mb={10}>
        <HStack>
          <Icon as={FiShield} boxSize={7} color="teal.500" />
          <Heading size="2xl" fontWeight="800" bgGradient="linear(to-r, teal.600, blue.500)" bgClip="text">
            Gestión Estratégica de Proyectos
          </Heading>
        </HStack>
        <Text color="gray.600">
          Supervisa el portafolio completo, asigna recursos y mitiga riesgos en tiempo real.
        </Text>
      </VStack>

      {/* KPIs Superiores */}
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={6} mb={10}>
        <Stat p={5} bg={bg} borderRadius="xl" borderWidth="1px" borderColor={borderColor}>
          <StatLabel display="flex"><Icon as={FiBriefcase} mr={2} /> Proyectos Activos</StatLabel>
          <StatNumber>3</StatNumber>
          <StatHelpText color="green.500">↑ 1 nuevo esta semana</StatHelpText>
        </Stat>

        <Stat p={5} bg={bg} borderRadius="xl" borderWidth="1px" borderColor={borderColor}>
          <StatLabel display="flex"><Icon as={FiDollarSign} mr={2} /> Presupuesto Total</StatLabel>
          <StatNumber>$550K</StatNumber>
          <StatHelpText>82% asignado</StatHelpText>
        </Stat>

        <Stat p={5} bg={bg} borderRadius="xl" borderWidth="1px" borderColor={borderColor}>
          <StatLabel display="flex"><Icon as={FiCheckCircle} mr={2} /> Tareas Completadas</StatLabel>
          <StatNumber>125/185</StatNumber>
          <StatHelpText color="blue.500">67.6% completado</StatHelpText>
        </Stat>

        <Stat p={5} bg={bg} borderRadius="xl" borderWidth="1px" borderColor={borderColor}>
          <StatLabel display="flex"><Icon as={FiAlertTriangle} mr={2} /> Riesgo Promedio</StatLabel>
          <StatNumber>Medio</StatNumber>
          <StatHelpText color="orange.500">1 proyecto en alto riesgo</StatHelpText>
        </Stat>
      </SimpleGrid>

      {/* Gráficos */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8} mb={10}>
        <Card bg={bg} borderWidth="1px" borderColor={borderColor} borderRadius="xl">
          <CardBody>
            <Heading size="md" mb={4} fontWeight="600">Uso de Presupuesto por Proyecto</Heading>
            <Box h={300}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={budgetData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={useColorModeValue('#e2e8f0', '#4a5568')} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <RechartsTooltip />
                  <Bar dataKey="Presupuesto" fill="#4FD1C5" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Gastado" fill="#3182CE" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardBody>
        </Card>

        <Card bg={bg} borderWidth="1px" borderColor={borderColor} borderRadius="xl">
          <CardBody>
            <Heading size="md" mb={4} fontWeight="600">Distribución por Estado</Heading>
            <Box h={300}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Lista de Proyectos */}
      <Box mb={6}>
        <Flex justify="space-between" align="center">
          <Heading size="lg" fontWeight="700">Portafolio de Proyectos</Heading>
          <Button leftIcon={<FiPlus />} colorScheme="teal" size="sm">
            Nuevo Proyecto
          </Button>
        </Flex>
        <Text fontSize="sm" color="gray.500" mt={1}>Haz clic en un proyecto para ver detalles avanzados</Text>
      </Box>

      <VStack spacing={6} align="stretch">
        {allProjects.map((project) => (
          <Card 
            key={project.id} 
            borderWidth="1px" 
            borderColor={borderColor} 
            borderRadius="xl" 
            bg={bg}
            _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
            transition="all 0.3s"
          >
            <CardBody p={6}>
              <Flex justify="space-between" align="start" mb={4}>
                <Box>
                  <HStack spacing={3} mb={2}>
                    <Icon as={getIconByStatus(project.status)} color={`${getColorByStatus(project.status)}.500`} boxSize={5} />
                    <Heading size="md" fontWeight="700">{project.name}</Heading>
                  </HStack>
                  <Text color="gray.600" fontSize="sm">{project.description}</Text>
                </Box>
                <HStack spacing={2}>
                  <Badge colorScheme={getColorByStatus(project.status)} fontSize="sm">
                    {project.status}
                  </Badge>
                  <Badge colorScheme={getColorByRisk(project.risk)} fontSize="sm">
                    Riesgo: {project.risk}
                  </Badge>
                </HStack>
              </Flex>

              <Divider mb={5} />

              <SimpleGrid columns={{ base: 1, md: 4 }} gap={4} mb={5}>
                <VStack align="start" spacing={1}>
                  <Text fontSize="sm" color="gray.500">Líder</Text>
                  <HStack>
                    <Avatar size="sm" name={project.leader} bg="teal.500" />
                    <Text fontWeight="medium">{project.leader}</Text>
                  </HStack>
                </VStack>

                <VStack align="start" spacing={1}>
                  <Text fontSize="sm" color="gray.500">Equipo ({project.team.length})</Text>
                  <AvatarGroup size="sm" max={4}>
                    {project.team.map((m, i) => (
                      <Avatar key={i} name={m} bg="blue.500" />
                    ))}
                  </AvatarGroup>
                </VStack>

                <VStack align="start" spacing={1}>
                  <Text fontSize="sm" color="gray.500">Presupuesto</Text>
                  <Text fontWeight="bold">${project.budget.toLocaleString()}</Text>
                  <Tag size="sm" colorScheme={project.spent / project.budget > 0.9 ? 'red' : 'green'}>
                    Gastado: ${(project.spent).toLocaleString()}
                  </Tag>
                </VStack>

                <VStack align="start" spacing={1}>
                  <Text fontSize="sm" color="gray.500">Progreso</Text>
                  <Progress value={project.progress} size="sm" colorScheme={project.progress === 100 ? 'green' : 'teal'} borderRadius="full" />
                  <Text fontSize="sm" fontWeight="bold" color="teal.600">{project.progress}%</Text>
                </VStack>
              </SimpleGrid>

              <Flex justify="space-between" align="center">
                <HStack spacing={4}>
                  <HStack>
                    <Icon as={FiCheckCircle} color="green.500" />
                    <Text fontSize="sm"><Text as="span" fontWeight="bold">{project.tasks.completed}</Text> / {project.tasks.total} tareas</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FiCalendar} color="gray.500" />
                    <Text fontSize="sm">Actualizado: {new Date(project.lastUpdate).toLocaleDateString()}</Text>
                  </HStack>
                </HStack>
                <HStack>
                  <Button size="sm" leftIcon={<FiEdit />} variant="ghost" colorScheme="blue">Editar</Button>
                  <Button size="sm" leftIcon={<FiTrash2 />} variant="ghost" colorScheme="red">Eliminar</Button>
                </HStack>
              </Flex>
            </CardBody>
          </Card>
        ))}
      </VStack>
    </Box>
  );
};

// ==================== PRACTICANTE VIEW - REINVENTADO ====================

const PractitionerProjectsSection = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const today = new Date();

  const upcomingDeadlines = myProjects.map(p => ({
    project: p.name,
    date: new Date(p.nextDeadline),
    daysLeft: Math.ceil((new Date(p.nextDeadline) - today) / (1000 * 60 * 60 * 24))
  })).sort((a, b) => a.daysLeft - b.daysLeft);

  return (
    <Box maxW="1200px" mx="auto">
      {/* Hero */}
      <VStack align="start" spacing={2} mb={10}>
        <HStack>
          <Icon as={FiUser} boxSize={7} color="blue.500" />
          <Heading size="2xl" fontWeight="800" color="gray.800">
            Mis Proyectos como Practicante
          </Heading>
        </HStack>
        <Text color="gray.600">
          Aquí encontrarás tus asignaciones, plazos y retroalimentación. ¡Sigue avanzando!
        </Text>
      </VStack>

      {/* Métricas Personales */}
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={6} mb={10}>
        <Stat p={5} bg={bg} borderRadius="xl" borderWidth="1px" borderColor={borderColor}>
          <StatLabel display="flex"><Icon as={FiTarget} mr={2} /> Proyectos Activos</StatLabel>
          <StatNumber>2</StatNumber>
          <StatHelpText>Participación actual</StatHelpText>
        </Stat>

        <Stat p={5} bg={bg} borderRadius="xl" borderWidth="1px" borderColor={borderColor}>
          <StatLabel display="flex"><Icon as={FiCheckCircle} mr={2} /> Tareas Completadas</StatLabel>
          <StatNumber>14/20</StatNumber>
          <StatHelpText color="green.500">70% completado</StatHelpText>
        </Stat>

        <Stat p={5} bg={bg} borderRadius="xl" borderWidth="1px" borderColor={borderColor}>
          <StatLabel display="flex"><Icon as={FiCalendar} mr={2} /> Próximo Plazo</StatLabel>
          <StatNumber>{upcomingDeadlines[0]?.daysLeft || 0} días</StatNumber>
          <StatHelpText>{upcomingDeadlines[0]?.project || 'Ninguno'}</StatHelpText>
        </Stat>

        <Stat p={5} bg={bg} borderRadius="xl" borderWidth="1px" borderColor={borderColor}>
          <StatLabel display="flex"><Icon as={FiMessageSquare} mr={2} /> Retroalimentación</StatLabel>
          <StatNumber>4.7/5</StatNumber>
          <StatHelpText color="blue.500">Promedio de mentores</StatHelpText>
        </Stat>
      </SimpleGrid>

      {/* Calendario de Entregas */}
      <Card mb={10} bg={bg} borderWidth="1px" borderColor={borderColor} borderRadius="xl">
        <CardBody>
          <Heading size="md" mb={4} fontWeight="600">Próximos Plazos</Heading>
          <VStack align="stretch" spacing={3}>
            {upcomingDeadlines.map((item, i) => (
              <Flex key={i} justify="space-between" p={3} bg={item.daysLeft <= 3 ? 'red.50' : 'transparent'} borderRadius="md">
                <Text fontWeight={item.daysLeft <= 3 ? 'bold' : 'normal'}>{item.project}</Text>
                <HStack>
                  <Tag size="sm" colorScheme={item.daysLeft <= 0 ? 'red' : item.daysLeft <= 3 ? 'orange' : 'green'}>
                    {item.daysLeft <= 0 ? 'Vencido' : `${item.daysLeft} días`}
                  </Tag>
                  <Text fontSize="sm" color="gray.500">{item.date.toLocaleDateString()}</Text>
                </HStack>
              </Flex>
            ))}
          </VStack>
        </CardBody>
      </Card>

      {/* Mis Proyectos */}
      <Box mb={6}>
        <Heading size="lg" fontWeight="700">Mis Asignaciones</Heading>
        <Text fontSize="sm" color="gray.500" mt={1}>Detalles de tu participación en cada proyecto</Text>
      </Box>

      <VStack spacing={6} align="stretch">
        {myProjects.map((project) => (
          <Card 
            key={project.id} 
            borderWidth="1px" 
            borderColor={borderColor} 
            borderRadius="xl" 
            bg={bg}
            _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
            transition="all 0.3s"
          >
            <CardBody p={6}>
              <Flex justify="space-between" align="start" mb={4}>
                <Box>
                  <HStack spacing={3} mb={2}>
                    <Icon as={getIconByStatus(project.status)} color={`${getColorByStatus(project.status)}.500`} boxSize={5} />
                    <Heading size="md" fontWeight="700">{project.name}</Heading>
                  </HStack>
                  <Text color="gray.600" fontSize="sm">Rol: <Text as="span" fontWeight="medium">{project.role}</Text></Text>
                </Box>
                <Badge colorScheme={getColorByStatus(project.status)} fontSize="sm">
                  {project.status}
                </Badge>
              </Flex>

              <Divider mb={5} />

              <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mb={5}>
                <VStack align="start" spacing={1}>
                  <Text fontSize="sm" color="gray.500">Mi Progreso</Text>
                  <Progress value={(project.myTasks.completed / project.myTasks.total) * 100} size="sm" colorScheme="blue" borderRadius="full" />
                  <Text fontSize="sm" fontWeight="bold" color="blue.600">
                    {project.myTasks.completed}/{project.myTasks.total} tareas
                  </Text>
                </VStack>

                <VStack align="start" spacing={1}>
                  <Text fontSize="sm" color="gray.500">Progreso General</Text>
                  <Progress value={project.progress} size="sm" colorScheme="teal" borderRadius="full" />
                  <Text fontSize="sm" fontWeight="bold" color="teal.600">{project.progress}%</Text>
                </VStack>

                <VStack align="start" spacing={1}>
                  <Text fontSize="sm" color="gray.500">Mentor</Text>
                  <HStack>
                    <Avatar size="sm" name={project.mentor} bg="purple.500" />
                    <Text fontWeight="medium">{project.mentor}</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FiAward} color="yellow.500" />
                    <Text fontSize="sm">Feedback: {project.feedback}/5</Text>
                  </HStack>
                </VStack>
              </SimpleGrid>

              <Flex justify="space-between" align="center">
                <HStack spacing={4}>
                  <HStack>
                    <Icon as={FiCalendar} color="orange.500" />
                    <Text fontSize="sm">Próximo plazo: <Text as="span" fontWeight="bold">{new Date(project.nextDeadline).toLocaleDateString()}</Text></Text>
                  </HStack>
                </HStack>
                <Button leftIcon={<FiFileText />} colorScheme="teal" size="sm" variant="outline">
                  Ver Detalles
                </Button>
              </Flex>
            </CardBody>
          </Card>
        ))}
      </VStack>

      {/* Guía de Participación */}
      <Card mt={8} bg={useColorModeValue('blue.50', 'blue.900/30')} borderWidth="1px" borderColor="blue.200" borderRadius="xl">
        <CardBody>
          <HStack spacing={3} mb={3}>
            <Icon as={FiInfo} color="blue.600" boxSize={5} />
            <Heading size="md" color="blue.800">¿Necesitas ayuda?</Heading>
          </HStack>
          <Text color="blue.700" mb={4}>
            Como practicante, puedes solicitar apoyo en cualquier momento. Usa el botón "Solicitar Ayuda" en los detalles del proyecto.
          </Text>
          <Button leftIcon={<FiSend />} size="sm" colorScheme="blue" variant="solid">
            Solicitar Asistencia
          </Button>
        </CardBody>
      </Card>
    </Box>
  );
};

// ==================== COMPONENTE PRINCIPAL ====================

export default function ProjectsView() {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const role = localStorage.getItem('user_role') || 'practicante'; // fallback para testing
    setUserRole(role);
  }, []);

  const isAdmin = userRole === 'admin';

  return (
    <Box p={{ base: 4, md: 6 }} bg="gray.50" minH="100vh">
      {isAdmin ? <AdminProjectsSection /> : <PractitionerProjectsSection />}
    </Box>
  );
}