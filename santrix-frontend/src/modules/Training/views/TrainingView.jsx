import { 
  Box, Heading, Text, SimpleGrid, Card, CardBody, Badge,
  Button, Flex, Icon, Progress, Avatar, HStack, VStack,
  Tabs, TabList, TabPanels, Tab, TabPanel, Divider, Tag,
  Table, Thead, Tbody, Tr, Th, Td, AvatarGroup
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { 
  FiBook, FiPlus, FiUsers, FiClock, FiCheckCircle, 
  FiAward, FiTrendingUp, FiCalendar, FiPlay, FiDownload,
  FiTarget, FiStar, FiVideo
} from 'react-icons/fi';
import { 
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line
} from 'recharts';

// ==================== DATOS MOCK ====================

const allTrainings = [
  {
    id: 1,
    name: 'Curso Avanzado de AWS',
    category: 'Tecnología',
    instructor: 'Externo - AWS Training',
    enrolled: 12,
    completed: 8,
    inProgress: 3,
    pending: 1,
    duration: '40 horas',
    startDate: '01 Sep 2025',
    endDate: '30 Nov 2025',
    status: 'En Curso',
    completionRate: 67,
    modality: 'Online'
  },
  {
    id: 2,
    name: 'Taller de Liderazgo para Gerentes',
    category: 'Soft Skills',
    instructor: 'María González - Coach',
    enrolled: 8,
    completed: 8,
    inProgress: 0,
    pending: 0,
    duration: '16 horas',
    startDate: '15 Ago 2025',
    endDate: '30 Ago 2025',
    status: 'Completado',
    completionRate: 100,
    modality: 'Presencial'
  },
  {
    id: 3,
    name: 'Inducción de Seguridad y Salud',
    category: 'Seguridad',
    instructor: 'Interno - RRHH',
    enrolled: 15,
    completed: 13,
    inProgress: 2,
    pending: 0,
    duration: '8 horas',
    startDate: '01 Oct 2025',
    endDate: '15 Oct 2025',
    status: 'En Curso',
    completionRate: 87,
    modality: 'Híbrido'
  },
  {
    id: 4,
    name: 'Módulo de Ética Empresarial',
    category: 'Compliance',
    instructor: 'Interno - Legal',
    enrolled: 50,
    completed: 50,
    inProgress: 0,
    pending: 0,
    duration: '4 horas',
    startDate: '01 Jul 2025',
    endDate: '31 Jul 2025',
    status: 'Completado',
    completionRate: 100,
    modality: 'Online'
  },
];

const myTrainings = [
  {
    id: 1,
    name: 'Curso Avanzado de AWS',
    progress: 75,
    status: 'En Curso',
    deadline: '30 Nov 2025',
    nextModule: 'EC2 y Auto Scaling',
    hoursCompleted: 30,
    totalHours: 40,
    certificate: false
  },
  {
    id: 3,
    name: 'Inducción de Seguridad y Salud',
    progress: 100,
    status: 'Completado',
    deadline: '15 Oct 2025',
    nextModule: null,
    hoursCompleted: 8,
    totalHours: 8,
    certificate: true
  },
  {
    id: 5,
    name: 'React Avanzado y Hooks',
    progress: 45,
    status: 'En Curso',
    deadline: '20 Dic 2025',
    nextModule: 'Custom Hooks',
    hoursCompleted: 18,
    totalHours: 40,
    certificate: false
  },
];

const myCertificates = [
  { name: 'Inducción de Seguridad y Salud', date: '15 Oct 2025', issuer: 'Santrix HRMS' },
  { name: 'Scrum Master Certification', date: '20 May 2025', issuer: 'Scrum Alliance' },
  { name: 'Git y GitHub Fundamentals', date: '10 Mar 2025', issuer: 'LinkedIn Learning' },
];

// ==================== COMPONENTES COMPARTIDOS ====================

const TrainingCard = ({ training, isAdmin, onEdit, onDelete, onManage }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'En Curso': return 'blue';
      case 'Completado': return 'green';
      case 'Programado': return 'purple';
      case 'Cancelado': return 'red';
      default: return 'gray';
    }
  };

  return (
    <Card shadow="lg" borderRadius="xl" _hover={{ transform: 'translateY(-4px)', shadow: '2xl' }} transition="all 0.3s">
      <CardBody p={6}>
        <Flex justify="space-between" align="start" mb={3}>
          <Box flex="1">
            <Heading size="md" mb={2}>{training.name}</Heading>
            <HStack spacing={2} mb={2}>
              <Badge colorScheme={getStatusColor(training.status)} fontSize="xs">
                {training.status}
              </Badge>
              <Badge colorScheme="gray" fontSize="xs">{training.modality}</Badge>
              <Badge colorScheme="purple" fontSize="xs">{training.category}</Badge>
            </HStack>
          </Box>
        </Flex>

        <VStack align="stretch" spacing={3}>
          <Flex justify="space-between" align="center" fontSize="sm">
            <HStack>
              <Icon as={FiUsers} color="gray.500" />
              <Text color="gray.600">Instructor:</Text>
            </HStack>
            <Text fontWeight="medium">{training.instructor}</Text>
          </Flex>

          <Flex justify="space-between" align="center" fontSize="sm">
            <HStack>
              <Icon as={FiClock} color="gray.500" />
              <Text color="gray.600">Duración:</Text>
            </HStack>
            <Text fontWeight="medium">{training.duration}</Text>
          </Flex>

          <Box>
            <Flex justify="space-between" mb={2}>
              <Text fontSize="sm" color="gray.600">Tasa de Finalización</Text>
              <Text fontSize="sm" fontWeight="bold" color="teal.600">{training.completionRate}%</Text>
            </Flex>
            <Progress 
              value={training.completionRate} 
              size="sm" 
              colorScheme={training.completionRate === 100 ? 'green' : 'teal'}
              borderRadius="full"
            />
          </Box>

          <Flex justify="space-around" pt={3} borderTop="1px" borderColor="gray.100" fontSize="sm">
            <VStack spacing={0}>
              <Text fontSize="xs" color="gray.500">Inscritos</Text>
              <Text fontWeight="bold">{training.enrolled}</Text>
            </VStack>
            <VStack spacing={0}>
              <Text fontSize="xs" color="gray.500">Completados</Text>
              <Text fontWeight="bold" color="green.600">{training.completed}</Text>
            </VStack>
            <VStack spacing={0}>
              <Text fontSize="xs" color="gray.500">En Curso</Text>
              <Text fontWeight="bold" color="blue.600">{training.inProgress}</Text>
            </VStack>
          </Flex>
        </VStack>

        {isAdmin && (
          <Flex gap={2} mt={4}>
            <Button size="sm" leftIcon={<FiUsers />} colorScheme="teal" variant="outline" flex="1" onClick={() => onManage(training.id)}>
              Gestionar
            </Button>
            <Button size="sm" leftIcon={<FiBook />} colorScheme="blue" variant="ghost" onClick={() => onEdit(training.id)}>
              Editar
            </Button>
          </Flex>
        )}
      </CardBody>
    </Card>
  );
};

// ==================== VISTA ADMINISTRADOR ====================

const AdminTrainingsSection = () => {
  const categoryData = [
    { name: 'Tecnología', value: 35, color: '#3182CE' },
    { name: 'Soft Skills', value: 25, color: '#38A169' },
    { name: 'Seguridad', value: 20, color: '#DD6B20' },
    { name: 'Compliance', value: 20, color: '#805AD5' },
  ];

  const completionTrend = [
    { month: 'Jul', rate: 75 },
    { month: 'Ago', rate: 82 },
    { month: 'Sep', rate: 87 },
    { month: 'Oct', rate: 90 },
  ];

  const employeeProgress = [
    { name: 'Juan Pérez', courses: 3, completed: 2, hours: 64 },
    { name: 'María García', courses: 4, completed: 4, hours: 88 },
    { name: 'Carlos López', courses: 2, completed: 1, hours: 44 },
    { name: 'Ana Martínez', courses: 3, completed: 3, hours: 68 },
    { name: 'Pedro Silva', courses: 2, completed: 2, hours: 48 },
  ];

  return (
    <Box p={6} bg="gray.50" minH="100vh">
      {/* Header */}
      <Flex justify="space-between" align="center" mb={8}>
        <Box>
          <Heading size="xl" color="gray.800">Gestión de Capacitaciones</Heading>
          <Text color="gray.600" mt={1}>Administra cursos, inscripciones y progreso del equipo</Text>
        </Box>
        <HStack>
          <Button leftIcon={<FiPlus />} colorScheme="teal">
            Nueva Capacitación
          </Button>
          <Button leftIcon={<FiDownload />} colorScheme="blue" variant="outline">
            Exportar Reportes
          </Button>
        </HStack>
      </Flex>

      {/* Métricas */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <Card shadow="lg" borderRadius="xl" borderTop="4px" borderColor="teal.500">
          <CardBody>
            <HStack justify="space-between" mb={2}>
              <Icon as={FiBook} w={8} h={8} color="teal.500" />
              <Text fontSize="3xl" fontWeight="bold">4</Text>
            </HStack>
            <Text fontSize="sm" color="gray.600">Cursos Activos</Text>
            <Text fontSize="xs" color="gray.500" mt={1}>2 completados este mes</Text>
          </CardBody>
        </Card>

        <Card shadow="lg" borderRadius="xl" borderTop="4px" borderColor="blue.500">
          <CardBody>
            <HStack justify="space-between" mb={2}>
              <Icon as={FiUsers} w={8} h={8} color="blue.500" />
              <Text fontSize="3xl" fontWeight="bold">85</Text>
            </HStack>
            <Text fontSize="sm" color="gray.600">Participantes Totales</Text>
            <Text fontSize="xs" color="gray.500" mt={1}>En todos los cursos</Text>
          </CardBody>
        </Card>

        <Card shadow="lg" borderRadius="xl" borderTop="4px" borderColor="green.500">
          <CardBody>
            <HStack justify="space-between" mb={2}>
              <Icon as={FiTrendingUp} w={8} h={8} color="green.500" />
              <Text fontSize="3xl" fontWeight="bold">90%</Text>
            </HStack>
            <Text fontSize="sm" color="gray.600">Tasa de Finalización</Text>
            <Text fontSize="xs" color="gray.500" mt={1}>↑ 5% vs mes anterior</Text>
          </CardBody>
        </Card>

        <Card shadow="lg" borderRadius="xl" borderTop="4px" borderColor="purple.500">
          <CardBody>
            <HStack justify="space-between" mb={2}>
              <Icon as={FiAward} w={8} h={8} color="purple.500" />
              <Text fontSize="3xl" fontWeight="bold">79</Text>
            </HStack>
            <Text fontSize="sm" color="gray.600">Certificados Emitidos</Text>
            <Text fontSize="xs" color="gray.500" mt={1}>En el último trimestre</Text>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Gráficos */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mb={8}>
        <Box p={6} shadow="lg" borderRadius="xl" bg="white">
          <Heading size="md" mb={4}>Distribución por Categoría</Heading>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>

        <Box p={6} shadow="lg" borderRadius="xl" bg="white">
          <Heading size="md" mb={4}>Tendencia de Finalización (%)</Heading>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={completionTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" stroke="#718096" />
              <YAxis stroke="#718096" domain={[0, 100]} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="rate" 
                stroke="#38B2AC" 
                strokeWidth={3}
                dot={{ fill: '#38B2AC', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </SimpleGrid>

      {/* Lista de capacitaciones */}
      <Box mb={4}>
        <Heading size="md" mb={4}>Todas las Capacitaciones</Heading>
      </Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={8}>
        {allTrainings.map((training) => (
          <TrainingCard 
            key={training.id} 
            training={training}
            isAdmin={true}
            onEdit={(id) => console.log('Editar:', id)}
            onManage={(id) => console.log('Gestionar:', id)}
          />
        ))}
      </SimpleGrid>

      {/* Tabla de progreso de empleados */}
      <Box p={6} shadow="lg" borderRadius="xl" bg="white">
        <Heading size="md" mb={4}>Progreso de Empleados</Heading>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr bg="gray.50">
              <Th>Empleado</Th>
              <Th>Cursos Asignados</Th>
              <Th>Completados</Th>
              <Th>Horas Totales</Th>
              <Th>Progreso</Th>
            </Tr>
          </Thead>
          <Tbody>
            {employeeProgress.map((emp, idx) => (
              <Tr key={idx} _hover={{ bg: 'gray.50' }}>
                <Td>
                  <HStack>
                    <Avatar size="sm" name={emp.name} bg="teal.500" />
                    <Text fontWeight="medium" fontSize="sm">{emp.name}</Text>
                  </HStack>
                </Td>
                <Td fontSize="sm">{emp.courses}</Td>
                <Td fontSize="sm">
                  <Badge colorScheme="green">{emp.completed}</Badge>
                </Td>
                <Td fontSize="sm">{emp.hours}h</Td>
                <Td>
                  <HStack>
                    <Progress 
                      value={(emp.completed / emp.courses) * 100} 
                      size="sm" 
                      colorScheme="teal"
                      width="100px"
                      borderRadius="full"
                    />
                    <Text fontSize="xs" fontWeight="bold" color="teal.600">
                      {Math.round((emp.completed / emp.courses) * 100)}%
                    </Text>
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

// ==================== VISTA PRACTICANTE ====================

const PractitionerTrainingsSection = () => {
  const myLearningHours = [
    { week: 'Sem 1', hours: 8 },
    { week: 'Sem 2', hours: 12 },
    { week: 'Sem 3', hours: 10 },
    { week: 'Sem 4', hours: 14 },
  ];

  return (
    <Box p={6} bg="gray.50" minH="100vh">
      {/* Header - Mismo tamaño que admin */}
      <Flex justify="space-between" align="center" mb={8}>
        <Box>
          <Heading size="xl" color="gray.800">Mis Capacitaciones</Heading>
          <Text color="gray.600" mt={1}>Cursos asignados y mi progreso de aprendizaje como practicante</Text>
        </Box>
        <Button leftIcon={<FiBook />} colorScheme="teal" variant="outline">
          Explorar Cursos
        </Button>
      </Flex>

      {/* Métricas - Mismo tamaño que admin */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <Card shadow="lg" borderRadius="xl" borderTop="4px" borderColor="teal.500">
          <CardBody>
            <HStack justify="space-between" mb={2}>
              <Icon as={FiBook} w={8} h={8} color="teal.500" />
              <Text fontSize="3xl" fontWeight="bold">3</Text>
            </HStack>
            <Text fontSize="sm" color="gray.600">Cursos Activos</Text>
            <Text fontSize="xs" color="gray.500" mt={1}>Como practicante</Text>
          </CardBody>
        </Card>

        <Card shadow="lg" borderRadius="xl" borderTop="4px" borderColor="green.500">
          <CardBody>
            <HStack justify="space-between" mb={2}>
              <Icon as={FiCheckCircle} w={8} h={8} color="green.500" />
              <Text fontSize="3xl" fontWeight="bold">1</Text>
            </HStack>
            <Text fontSize="sm" color="gray.600">Completados</Text>
            <Text fontSize="xs" color="gray.500" mt={1}>Este trimestre</Text>
          </CardBody>
        </Card>

        <Card shadow="lg" borderRadius="xl" borderTop="4px" borderColor="blue.500">
          <CardBody>
            <HStack justify="space-between" mb={2}>
              <Icon as={FiClock} w={8} h={8} color="blue.500" />
              <Text fontSize="3xl" fontWeight="bold">56h</Text>
            </HStack>
            <Text fontSize="sm" color="gray.600">Horas de Estudio</Text>
            <Text fontSize="xs" color="gray.500" mt={1}>Total acumulado</Text>
          </CardBody>
        </Card>

        <Card shadow="lg" borderRadius="xl" borderTop="4px" borderColor="purple.500">
          <CardBody>
            <HStack justify="space-between" mb={2}>
              <Icon as={FiAward} w={8} h={8} color="purple.500" />
              <Text fontSize="3xl" fontWeight="bold">3</Text>
            </HStack>
            <Text fontSize="sm" color="gray.600">Certificados</Text>
            <Text fontSize="xs" color="gray.500" mt={1}>Obtenidos</Text>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Gráfico de horas de aprendizaje - Mismo tamaño que admin */}
      <Box p={6} shadow="lg" borderRadius="xl" bg="white" mb={8}>
        <Heading size="md" mb={4}>Mis Horas de Estudio Semanales</Heading>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={myLearningHours}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="week" stroke="#718096" />
            <YAxis stroke="#718096" />
            <Tooltip />
            <Bar dataKey="hours" fill="#38B2AC" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Mis Cursos - Mismo tamaño que admin */}
      <Box mb={4}>
        <Heading size="md" mb={4}>Mis Cursos como Practicante</Heading>
      </Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={8}>
        {myTrainings.map((training) => (
          <Card key={training.id} shadow="lg" borderRadius="xl">
            <CardBody p={6}>
              <Flex justify="space-between" align="start" mb={4}>
                <Box flex="1">
                  <Heading size="md" mb={2}>{training.name}</Heading>
                  <Badge colorScheme={training.status === 'Completado' ? 'green' : 'blue'}>
                    {training.status}
                  </Badge>
                </Box>
                {training.certificate && (
                  <Icon as={FiAward} w={8} h={8} color="gold" />
                )}
              </Flex>

              <VStack align="stretch" spacing={3}>
                <Box>
                  <Flex justify="space-between" mb={2}>
                    <Text fontSize="sm" color="gray.600">Mi Progreso</Text>
                    <Text fontSize="sm" fontWeight="bold" color="teal.600">{training.progress}%</Text>
                  </Flex>
                  <Progress 
                    value={training.progress} 
                    size="md" 
                    colorScheme={training.progress === 100 ? 'green' : 'teal'}
                    borderRadius="full"
                  />
                </Box>

                <Flex justify="space-between" fontSize="sm">
                  <HStack>
                    <Icon as={FiClock} color="gray.500" />
                    <Text color="gray.600">Horas:</Text>
                  </HStack>
                  <Text fontWeight="medium">{training.hoursCompleted} / {training.totalHours}h</Text>
                </Flex>

                {training.nextModule && (
                  <Flex justify="space-between" fontSize="sm" bg="blue.50" p={3} borderRadius="md">
                    <HStack>
                      <Icon as={FiPlay} color="blue.500" />
                      <Text color="gray.700">Próximo módulo:</Text>
                    </HStack>
                    <Text fontWeight="medium" color="blue.700">{training.nextModule}</Text>
                  </Flex>
                )}

                <Flex justify="space-between" fontSize="sm" pt={2} borderTop="1px" borderColor="gray.100">
                  <HStack>
                    <Icon as={FiCalendar} color="orange.500" />
                    <Text color="gray.600">Deadline:</Text>
                  </HStack>
                  <Text fontWeight="bold" color="orange.600">{training.deadline}</Text>
                </Flex>
              </VStack>

              <HStack mt={4}>
                {training.status === 'En Curso' && (
                  <Button size="sm" leftIcon={<FiPlay />} colorScheme="teal" flex="1">
                    Continuar Curso
                  </Button>
                )}
                {training.certificate && (
                  <Button size="sm" leftIcon={<FiDownload />} colorScheme="green" variant="outline">
                    Descargar Certificado
                  </Button>
                )}
              </HStack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      {/* Certificados - Mismo tamaño que admin */}
      <Box p={6} shadow="lg" borderRadius="xl" bg="white">
        <Heading size="md" mb={4}>Mis Certificados Obtenidos</Heading>
        <VStack align="stretch" spacing={4}>
          {myCertificates.map((cert, idx) => (
            <Flex 
              key={idx}
              p={4}
              bg="gradient"
              bgGradient="linear(to-r, teal.50, blue.50)"
              borderRadius="lg"
              border="2px"
              borderColor="teal.200"
              justify="space-between"
              align="center"
            >
              <HStack spacing={4}>
                <Flex
                  w="50px"
                  h="50px"
                  borderRadius="full"
                  bg="teal.100"
                  align="center"
                  justify="center"
                >
                  <Icon as={FiAward} w={6} h={6} color="teal.600" />
                </Flex>
                <Box>
                  <Text fontWeight="bold" fontSize="md">{cert.name}</Text>
                  <Text fontSize="sm" color="gray.600">
                    Emisor: {cert.issuer} • {cert.date}
                  </Text>
                </Box>
              </HStack>
              <Button size="sm" leftIcon={<FiDownload />} colorScheme="teal" variant="outline">
                Descargar
              </Button>
            </Flex>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};
// ==================== COMPONENTE PRINCIPAL ====================

export default function TrainingView() {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const role = localStorage.getItem('user_role');
    setUserRole(role || '');
  }, []);

  const isAdmin = userRole === 'admin';

  return isAdmin ? <AdminTrainingsSection /> : <PractitionerTrainingsSection />;
}