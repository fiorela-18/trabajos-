import { 
  Box, Heading, Text, SimpleGrid, Card, CardBody, Stack, Badge,
  Button, Flex, Icon, Progress, Avatar, HStack, VStack, AvatarGroup,
  Tabs, TabList, TabPanels, Tab, TabPanel, Divider, Tag
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { 
  FiBriefcase, FiPlus, FiEdit, FiTrash2, FiUsers, FiClock,
  FiCheckCircle, FiAlertCircle, FiTrendingUp, FiCalendar,
  FiTarget, FiFileText, FiBarChart2
} from 'react-icons/fi';
import { 
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line
} from 'recharts';

// ==================== DATOS MOCK ====================

const allProjects = [
  {
    id: 1,
    name: 'Modernización IT',
    description: 'Actualización de infraestructura tecnológica',
    leader: 'Juan Pérez',
    team: ['Juan Pérez', 'María García', 'Carlos López'],
    status: 'En Curso',
    progress: 75,
    priority: 'Alta',
    startDate: '01 Ene 2025',
    endDate: '30 Nov 2025',
    budget: '$150,000',
    spent: '$112,500',
    tasks: { total: 45, completed: 34, inProgress: 8, pending: 3 }
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
    budget: '$80,000',
    spent: '$12,000',
    tasks: { total: 30, completed: 5, inProgress: 3, pending: 22 }
  },
  {
    id: 3,
    name: 'Sistema ERP',
    description: 'Implementación de sistema de gestión empresarial',
    leader: 'Roberto Díaz',
    team: ['Roberto Díaz', 'Laura Torres', 'Miguel Ángel'],
    status: 'En Curso',
    progress: 60,
    priority: 'Alta',
    startDate: '01 Mar 2025',
    endDate: '31 Dic 2025',
    budget: '$200,000',
    spent: '$120,000',
    tasks: { total: 60, completed: 36, inProgress: 15, pending: 9 }
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
    budget: '$120,000',
    spent: '$118,000',
    tasks: { total: 50, completed: 50, inProgress: 0, pending: 0 }
  },
];

const myProjects = [
  {
    id: 1,
    name: 'Modernización IT',
    role: 'Líder de Proyecto',
    progress: 75,
    myTasks: { total: 12, completed: 9, inProgress: 2, pending: 1 },
    nextDeadline: '25 Oct 2025',
    status: 'En Curso'
  },
  {
    id: 3,
    name: 'Sistema ERP',
    role: 'Desarrollador Frontend',
    progress: 60,
    myTasks: { total: 8, completed: 5, inProgress: 2, pending: 1 },
    nextDeadline: '30 Oct 2025',
    status: 'En Curso'
  },
];

// ==================== COMPONENTES COMPARTIDOS ====================

const ProjectCard = ({ project, isAdmin, onEdit, onDelete, onView }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'En Curso': return 'blue';
      case 'Completado': return 'green';
      case 'Pendiente': return 'orange';
      case 'En Pausa': return 'gray';
      default: return 'red';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Alta': return 'red';
      case 'Media': return 'orange';
      case 'Baja': return 'green';
      default: return 'gray';
    }
  };

  return (
    <Card shadow="lg" borderRadius="xl" _hover={{ transform: 'translateY(-4px)', shadow: '2xl' }} transition="all 0.3s">
      <CardBody p={6}>
        <Flex justify="space-between" align="start" mb={4}>
          <Box flex="1">
            <Heading size="md" mb={2}>{project.name}</Heading>
            <Text fontSize="sm" color="gray.600" noOfLines={2}>{project.description}</Text>
          </Box>
          <VStack align="end" spacing={2}>
            <Badge colorScheme={getStatusColor(project.status)} fontSize="xs">
              {project.status}
            </Badge>
            {project.priority && (
              <Badge colorScheme={getPriorityColor(project.priority)} fontSize="xs">
                {project.priority}
              </Badge>
            )}
          </VStack>
        </Flex>

        <Divider mb={4} />

        <VStack align="stretch" spacing={3}>
          <Flex justify="space-between" align="center">
            <HStack>
              <Icon as={FiUsers} color="gray.500" />
              <Text fontSize="sm" color="gray.600">Líder:</Text>
            </HStack>
            <Text fontSize="sm" fontWeight="medium">{project.leader}</Text>
          </Flex>

          {project.team && (
            <Flex justify="space-between" align="center">
              <HStack>
                <Icon as={FiUsers} color="gray.500" />
                <Text fontSize="sm" color="gray.600">Equipo:</Text>
              </HStack>
              <AvatarGroup size="xs" max={3}>
                {project.team.map((member, idx) => (
                  <Avatar key={idx} name={member} bg="teal.500" />
                ))}
              </AvatarGroup>
            </Flex>
          )}

          <Box>
            <Flex justify="space-between" mb={2}>
              <Text fontSize="sm" color="gray.600">Progreso</Text>
              <Text fontSize="sm" fontWeight="bold" color="teal.600">{project.progress}%</Text>
            </Flex>
            <Progress 
              value={project.progress} 
              size="sm" 
              colorScheme={project.progress === 100 ? 'green' : 'teal'}
              borderRadius="full"
            />
          </Box>

          {project.tasks && (
            <Flex justify="space-around" pt={2} borderTop="1px" borderColor="gray.100">
              <VStack spacing={0}>
                <Text fontSize="xs" color="gray.500">Total</Text>
                <Text fontSize="sm" fontWeight="bold">{project.tasks.total}</Text>
              </VStack>
              <VStack spacing={0}>
                <Text fontSize="xs" color="gray.500">Completadas</Text>
                <Text fontSize="sm" fontWeight="bold" color="green.600">{project.tasks.completed}</Text>
              </VStack>
              <VStack spacing={0}>
                <Text fontSize="xs" color="gray.500">En Curso</Text>
                <Text fontSize="sm" fontWeight="bold" color="blue.600">{project.tasks.inProgress}</Text>
              </VStack>
            </Flex>
          )}
        </VStack>

        <Flex gap={2} mt={4}>
          {isAdmin ? (
            <>
              <Button size="sm" leftIcon={<FiEdit />} colorScheme="blue" variant="outline" flex="1" onClick={() => onEdit(project.id)}>
                Editar
              </Button>
              <Button size="sm" leftIcon={<FiTrash2 />} colorScheme="red" variant="outline" onClick={() => onDelete(project.id)}>
                Eliminar
              </Button>
            </>
          ) : (
            <Button size="sm" leftIcon={<FiFileText />} colorScheme="teal" variant="outline" flex="1" onClick={() => onView(project.id)}>
              Ver Detalles
            </Button>
          )}
        </Flex>
      </CardBody>
    </Card>
  );
};

// ==================== VISTA ADMINISTRADOR ====================

// ==================== VISTA ADMINISTRADOR ====================

const AdminProjectsSection = () => {
  const statusData = [
    { name: 'En Curso', value: 2, color: '#3182CE' },
    { name: 'Completado', value: 1, color: '#38A169' },
    { name: 'Pendiente', value: 1, color: '#DD6B20' },
  ];

  const handleEdit = (id) => console.log('Editar proyecto:', id);
  const handleDelete = (id) => console.log('Eliminar proyecto:', id);

  return (
    <Box>
      {/* Header */}
      <Flex justify="space-between" align="center" mb={8}>
        <Box>
          <Heading size="xl" color="gray.800">Gestión de Proyectos</Heading>
          <Text color="gray.600" mt={1}>Administra todos los proyectos de la organización</Text>
        </Box>
        <Button leftIcon={<FiPlus />} colorScheme="teal">
          Nuevo Proyecto
        </Button>
      </Flex>

      {/* Métricas */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <Card shadow="lg" borderRadius="xl" borderTop="4px" borderColor="teal.500">
          <CardBody p={5}>
            <HStack justify="space-between" mb={2}>
              <Icon as={FiBriefcase} w={8} h={8} color="teal.500" />
              <Text fontSize="3xl" fontWeight="bold">4</Text>
            </HStack>
            <Text fontSize="sm" color="gray.600">Total Proyectos</Text>
            <Text fontSize="xs" color="gray.500" mt={1}>3 activos, 1 completado</Text>
          </CardBody>
        </Card>

        <Card shadow="lg" borderRadius="xl" borderTop="4px" borderColor="blue.500">
          <CardBody p={5}>
            <HStack justify="space-between" mb={2}>
              <Icon as={FiTrendingUp} w={8} h={8} color="blue.500" />
              <Text fontSize="3xl" fontWeight="bold">62%</Text>
            </HStack>
            <Text fontSize="sm" color="gray.600">Progreso Promedio</Text>
            <Text fontSize="xs" color="gray.500" mt={1}>↑ 8% vs mes anterior</Text>
          </CardBody>
        </Card>

        <Card shadow="lg" borderRadius="xl" borderTop="4px" borderColor="green.500">
          <CardBody p={5}>
            <HStack justify="space-between" mb={2}>
              <Icon as={FiCheckCircle} w={8} h={8} color="green.500" />
              <Text fontSize="3xl" fontWeight="bold">125</Text>
            </HStack>
            <Text fontSize="sm" color="gray.600">Tareas Completadas</Text>
            <Text fontSize="xs" color="gray.500" mt={1}>De 185 totales</Text>
          </CardBody>
        </Card>

        <Card shadow="lg" borderRadius="xl" borderTop="4px" borderColor="orange.500">
          <CardBody p={5}>
            <HStack justify="space-between" mb={2}>
              <Icon as={FiAlertCircle} w={8} h={8} color="orange.500" />
              <Text fontSize="3xl" fontWeight="bold">26</Text>
            </HStack>
            <Text fontSize="sm" color="gray.600">Tareas En Curso</Text>
            <Text fontSize="xs" color="gray.500" mt={1}>Requieren seguimiento</Text>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Lista de proyectos */}
      <Box mb={4}>
        <Heading size="md" mb={4}>Todos los Proyectos</Heading>
      </Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {allProjects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            isAdmin={true}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

// ==================== VISTA PARTICIPANTE ====================

// ==================== VISTA PRACTICANTE ====================

const PractitionerProjectsSection = () => {
  const handleView = (id) => console.log('Ver proyecto:', id);

  return (
    <Box>
      {/* Header - Mismo tamaño que admin */}
      <Flex justify="space-between" align="center" mb={8}>
        <Box>
          <Heading size="xl" color="gray.800">Mis Proyectos</Heading>
          <Text color="gray.600" mt={1}>Proyectos en los que estoy participando como practicante</Text>
        </Box>
      </Flex>

      {/* Métricas - Mismo tamaño que admin */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <Card shadow="lg" borderRadius="xl" borderTop="4px" borderColor="teal.500">
          <CardBody p={5}>
            <HStack justify="space-between" mb={2}>
              <Icon as={FiBriefcase} w={8} h={8} color="teal.500" />
              <Text fontSize="3xl" fontWeight="bold">2</Text>
            </HStack>
            <Text fontSize="sm" color="gray.600">Proyectos Activos</Text>
            <Text fontSize="xs" color="gray.500" mt={1}>Como practicante</Text>
          </CardBody>
        </Card>

        <Card shadow="lg" borderRadius="xl" borderTop="4px" borderColor="blue.500">
          <CardBody p={5}>
            <HStack justify="space-between" mb={2}>
              <Icon as={FiTarget} w={8} h={8} color="blue.500" />
              <Text fontSize="3xl" fontWeight="bold">20</Text>
            </HStack>
            <Text fontSize="sm" color="gray.600">Tareas Asignadas</Text>
            <Text fontSize="xs" color="gray.500" mt={1}>Total de mis tareas</Text>
          </CardBody>
        </Card>

        <Card shadow="lg" borderRadius="xl" borderTop="4px" borderColor="green.500">
          <CardBody p={5}>
            <HStack justify="space-between" mb={2}>
              <Icon as={FiCheckCircle} w={8} h={8} color="green.500" />
              <Text fontSize="3xl" fontWeight="bold">14</Text>
            </HStack>
            <Text fontSize="sm" color="gray.600">Tareas Completadas</Text>
            <Text fontSize="xs" color="gray.500" mt={1}>Como practicante</Text>
          </CardBody>
        </Card>

        <Card shadow="lg" borderRadius="xl" borderTop="4px" borderColor="orange.500">
          <CardBody p={5}>
            <HStack justify="space-between" mb={2}>
              <Icon as={FiClock} w={8} h={8} color="orange.500" />
              <Text fontSize="3xl" fontWeight="bold">4</Text>
            </HStack>
            <Text fontSize="sm" color="gray.600">En Progreso</Text>
            <Text fontSize="xs" color="gray.500" mt={1}>Tareas pendientes</Text>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Proyectos - Mismo tamaño que admin */}
      <Box mb={4}>
        <Heading size="md" mb={4}>Mis Proyectos como Practicante</Heading>
      </Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {myProjects.map((project) => (
          <Card key={project.id} shadow="lg" borderRadius="xl">
            <CardBody p={6}>
              <Flex justify="space-between" align="start" mb={4}>
                <Box flex="1">
                  <Heading size="md" mb={2}>{project.name}</Heading>
                  <Text fontSize="sm" color="gray.600">Practicante como {project.role}</Text>
                </Box>
                <Badge colorScheme="blue" fontSize="xs">
                  {project.status}
                </Badge>
              </Flex>

              <Divider mb={4} />

              <VStack align="stretch" spacing={3}>
                <Box>
                  <Flex justify="space-between" mb={2}>
                    <Text fontSize="sm" color="gray.600">Progreso General</Text>
                    <Text fontSize="sm" fontWeight="bold" color="teal.600">{project.progress}%</Text>
                  </Flex>
                  <Progress 
                    value={project.progress} 
                    size="sm" 
                    colorScheme="teal"
                    borderRadius="full"
                  />
                </Box>

                <Text fontSize="sm" fontWeight="semibold">Mis Tareas:</Text>
                <Flex justify="space-around" pt={2} borderTop="1px" borderColor="gray.100">
                  <VStack spacing={0}>
                    <Text fontSize="xs" color="gray.500">Total</Text>
                    <Text fontSize="sm" fontWeight="bold">{project.myTasks.total}</Text>
                  </VStack>
                  <VStack spacing={0}>
                    <Text fontSize="xs" color="gray.500">Completadas</Text>
                    <Text fontSize="sm" fontWeight="bold" color="green.600">{project.myTasks.completed}</Text>
                  </VStack>
                  <VStack spacing={0}>
                    <Text fontSize="xs" color="gray.500">En Curso</Text>
                    <Text fontSize="sm" fontWeight="bold" color="blue.600">{project.myTasks.inProgress}</Text>
                  </VStack>
                </Flex>

                <Flex justify="space-between" align="center" pt={2} borderTop="1px" borderColor="gray.100">
                  <HStack>
                    <Icon as={FiCalendar} color="orange.500" />
                    <Text fontSize="xs" color="gray.600">Próximo deadline:</Text>
                  </HStack>
                  <Text fontSize="xs" fontWeight="bold" color="orange.600">{project.nextDeadline}</Text>
                </Flex>
              </VStack>

              <Button 
                size="sm" 
                leftIcon={<FiFileText />} 
                colorScheme="teal" 
                variant="outline" 
                w="full" 
                mt={4}
                onClick={() => handleView(project.id)}
              >
                Ver Detalles del Proyecto
              </Button>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};
// ==================== COMPONENTE PRINCIPAL ====================

// ==================== COMPONENTE PRINCIPAL ====================

export default function ProjectsView() {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const role = localStorage.getItem('user_role');
    setUserRole(role || '');
  }, []);

  const isAdmin = userRole === 'admin';

  return (
    <Box p={6} bg="gray.50" minH="100vh">
      {isAdmin ? <AdminProjectsSection /> : <PractitionerProjectsSection />}
    </Box>
  );
}