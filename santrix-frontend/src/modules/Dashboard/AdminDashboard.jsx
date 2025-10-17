import { 
  Box, SimpleGrid, Stat, StatLabel, StatNumber, 
  Heading, Text, VStack, Icon, Flex, Button, Badge, Avatar, HStack,
  Table, Thead, Tbody, Tr, Th, Td, Progress, Divider, Tag
} from '@chakra-ui/react';
import { 
  FiUsers, FiBriefcase, FiAlertTriangle, FiCheckCircle, 
  FiTrendingUp, FiCalendar, FiClock, FiAward, FiFileText,
  FiUserPlus, FiSettings, FiDownload
} from 'react-icons/fi';
import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Datos para gráficos
const employeeGrowthData = [
  { month: 'Ene', empleados: 98 },
  { month: 'Feb', empleados: 102 },
  { month: 'Mar', empleados: 108 },
  { month: 'Abr', empleados: 115 },
  { month: 'May', empleados: 118 },
  { month: 'Jun', empleados: 125 },
];

const departmentData = [
  { name: 'Desarrollo', value: 45, color: '#0088FE' },
  { name: 'Diseño', value: 20, color: '#00C49F' },
  { name: 'Marketing', value: 25, color: '#FFBB28' },
  { name: 'RRHH', value: 15, color: '#FF8042' },
  { name: 'Ventas', value: 20, color: '#8884D8' },
];

const performanceData = [
  { mes: 'Ene', rendimiento: 85 },
  { mes: 'Feb', rendimiento: 88 },
  { mes: 'Mar', rendimiento: 86 },
  { mes: 'Abr', rendimiento: 90 },
  { mes: 'May', rendimiento: 92 },
  { mes: 'Jun', rendimiento: 94 },
];

// Componente de Métrica
const MetricCard = ({ title, value, change, changeType, icon, colorScheme = "teal" }) => (
  <Stat p={5} shadow="lg" borderRadius="xl" bg="white" borderLeft="4px" borderColor={`${colorScheme}.500`}>
    <Flex justifyContent="space-between" alignItems="center">
      <Box>
        <StatLabel fontWeight="medium" fontSize="sm" color="gray.600">{title}</StatLabel>
        <StatNumber fontSize="3xl" fontWeight="bold" my={2} color="gray.800">{value}</StatNumber>
        <Text 
          fontSize="xs" 
          fontWeight="semibold"
          color={changeType === 'increase' ? 'green.500' : changeType === 'decrease' ? 'red.500' : 'gray.500'} 
        >
          {change}
        </Text>
      </Box>
      <Flex 
        w="60px" 
        h="60px" 
        borderRadius="xl" 
        bg={`${colorScheme}.50`} 
        align="center" 
        justify="center"
      >
        <Icon as={icon} w={7} h={7} color={`${colorScheme}.500`} />
      </Flex>
    </Flex>
  </Stat>
);

// Componente de Lista con acciones
const QuickInfoCard = ({ title, items, actionLabel, onAction, icon }) => (
  <Box p={5} shadow="lg" borderRadius="xl" bg="white" h="full">
    <Flex justify="space-between" align="center" mb={4}>
      <HStack>
        {icon && <Icon as={icon} color="teal.500" w={5} h={5} />}
        <Heading size="md">{title}</Heading>
      </HStack>
      {actionLabel && (
        <Button size="sm" colorScheme="teal" variant="ghost" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </Flex>
    <VStack align="stretch" spacing={3} maxH="300px" overflowY="auto">
      {items.map((item, idx) => (
        <Flex key={idx} justify="space-between" align="center" p={3} bg="gray.50" borderRadius="lg" _hover={{ bg: 'gray.100' }} transition="all 0.2s">
          <HStack flex="1">
            {item.avatar && <Avatar size="sm" name={item.name} bg="teal.500" />}
            <Box>
              <Text fontWeight="semibold" fontSize="sm">{item.name}</Text>
              <Text fontSize="xs" color="gray.500">{item.detail}</Text>
            </Box>
          </HStack>
          {item.badge && (
            <Badge colorScheme={item.badgeColor || 'gray'} fontSize="xs" px={2} py={1}>
              {item.badge}
            </Badge>
          )}
        </Flex>
      ))}
    </VStack>
  </Box>
);

// Componente de tabla de empleados recientes
const RecentEmployeesTable = () => {
  const recentEmployees = [
    { name: 'Ana Torres', position: 'Frontend Dev', department: 'Desarrollo', status: 'Activo', date: '15 Oct 2025' },
    { name: 'Carlos Ruiz', position: 'UX Designer', department: 'Diseño', status: 'Activo', date: '12 Oct 2025' },
    { name: 'Laura Vega', position: 'Marketing Mgr', department: 'Marketing', status: 'Activo', date: '10 Oct 2025' },
    { name: 'Pedro Silva', position: 'HR Specialist', department: 'RRHH', status: 'Activo', date: '08 Oct 2025' },
  ];

  return (
    <Box p={5} shadow="lg" borderRadius="xl" bg="white">
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="md">Empleados Recientes</Heading>
        <Button size="sm" leftIcon={<FiUserPlus />} colorScheme="teal" variant="outline">
          Ver Todos
        </Button>
      </Flex>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr bg="gray.50">
            <Th>Nombre</Th>
            <Th>Cargo</Th>
            <Th>Departamento</Th>
            <Th>Fecha Ingreso</Th>
            <Th>Estado</Th>
          </Tr>
        </Thead>
        <Tbody>
          {recentEmployees.map((emp, idx) => (
            <Tr key={idx} _hover={{ bg: 'gray.50' }}>
              <Td>
                <HStack>
                  <Avatar size="xs" name={emp.name} bg="teal.500" />
                  <Text fontWeight="medium" fontSize="sm">{emp.name}</Text>
                </HStack>
              </Td>
              <Td fontSize="sm">{emp.position}</Td>
              <Td fontSize="sm">{emp.department}</Td>
              <Td fontSize="sm" color="gray.600">{emp.date}</Td>
              <Td>
                <Tag size="sm" colorScheme="green">{emp.status}</Tag>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default function AdminDashboard() {
  const upcomingBirthdays = [
    { name: 'Juan Pérez', detail: 'Desarrollador - 20 Oct', avatar: true, badge: 'Mañana', badgeColor: 'purple' },
    { name: 'María García', detail: 'Diseñadora - 25 Oct', avatar: true, badge: 'En 5 días', badgeColor: 'blue' },
    { name: 'Carlos López', detail: 'Gerente - 28 Oct', avatar: true, badge: 'En 8 días', badgeColor: 'teal' },
    { name: 'Ana Martínez', detail: 'Analista - 30 Oct', avatar: true, badge: 'En 10 días', badgeColor: 'cyan' },
  ];

  const pendingApprovals = [
    { name: 'Solicitud de Vacaciones', detail: 'Ana Martínez - 5 días', badge: 'Urgente', badgeColor: 'red' },
    { name: 'Cambio de Horario', detail: 'Pedro Ruiz - Lun-Vie', badge: 'Pendiente', badgeColor: 'orange' },
    { name: 'Reembolso', detail: 'Laura Torres - $250', badge: 'Pendiente', badgeColor: 'orange' },
    { name: 'Solicitud de Capacitación', detail: 'Roberto Díaz - React', badge: 'Revisar', badgeColor: 'yellow' },
  ];

  const upcomingEvaluations = [
    { name: 'Evaluación Trimestral', detail: 'Equipo de Desarrollo - 25 Oct', badge: 'Próximo', badgeColor: 'blue' },
    { name: 'Revisión de Desempeño', detail: 'Equipo de Diseño - 28 Oct', badge: 'Próximo', badgeColor: 'blue' },
    { name: '360° Feedback', detail: 'Liderazgo - 30 Oct', badge: 'Programado', badgeColor: 'purple' },
  ];

  return (
    <Box p={6} bg="gray.50" minH="100vh">
      {/* Header */}
      <Flex justify="space-between" align="center" mb={8}>
        <Box>
          <Heading size="xl" color="gray.800">Panel de Administración</Heading>
          <Text color="gray.600" mt={1}>Bienvenido, administrador. Aquí está el resumen de hoy.</Text>
        </Box>
        <HStack>
          <Button leftIcon={<FiDownload />} colorScheme="teal" variant="outline" size="sm">
            Exportar Reporte
          </Button>
          <Button leftIcon={<FiSettings />} colorScheme="gray" variant="outline" size="sm">
            Configuración
          </Button>
        </HStack>
      </Flex>
      
      {/* Métricas principales */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <MetricCard 
          title="Empleados Activos" 
          value="125" 
          change="↑ 5.2% vs mes anterior" 
          changeType="increase" 
          icon={FiUsers}
          colorScheme="teal"
        />
        <MetricCard 
          title="Proyectos Activos" 
          value="18" 
          change="↑ 2 nuevos este mes" 
          changeType="increase" 
          icon={FiBriefcase}
          colorScheme="blue"
        />
        <MetricCard 
          title="Solicitudes Pendientes" 
          value="7" 
          change="Requieren atención" 
          changeType="neutral" 
          icon={FiAlertTriangle}
          colorScheme="orange"
        />
        <MetricCard 
          title="Desempeño Promedio" 
          value="94%" 
          change="↑ 6% vs trimestre anterior" 
          changeType="increase" 
          icon={FiTrendingUp}
          colorScheme="green"
        />
      </SimpleGrid>

      {/* Gráficos principales */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mb={8}>
        {/* Gráfico de crecimiento */}
        <Box p={6} shadow="lg" borderRadius="xl" bg="white">
          <Heading size="md" mb={4}>Crecimiento de Personal</Heading>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={employeeGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" stroke="#718096" />
              <YAxis stroke="#718096" />
              <Tooltip />
              <Line type="monotone" dataKey="empleados" stroke="#319795" strokeWidth={3} dot={{ fill: '#319795', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        {/* Gráfico de distribución por departamento */}
        <Box p={6} shadow="lg" borderRadius="xl" bg="white">
          <Heading size="md" mb={4}>Distribución por Departamento</Heading>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </SimpleGrid>

      {/* Sección de gestión */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={8}>
        <QuickInfoCard 
          title="Cumpleaños Próximos" 
          items={upcomingBirthdays}
          actionLabel="Ver Todos"
          onAction={() => console.log('Ver cumpleaños')}
          icon={FiCalendar}
        />
        <QuickInfoCard 
          title="Aprobaciones Pendientes" 
          items={pendingApprovals}
          actionLabel="Gestionar"
          onAction={() => console.log('Gestionar')}
          icon={FiAlertTriangle}
        />
        <QuickInfoCard 
          title="Evaluaciones Próximas" 
          items={upcomingEvaluations}
          actionLabel="Ver Calendario"
          onAction={() => console.log('Ver evaluaciones')}
          icon={FiAward}
        />
      </SimpleGrid>

      {/* Gráfico de desempeño */}
      <Box p={6} shadow="lg" borderRadius="xl" bg="white" mb={8}>
        <Heading size="md" mb={4}>Tendencia de Desempeño General</Heading>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="mes" stroke="#718096" />
            <YAxis stroke="#718096" />
            <Tooltip />
            <Bar dataKey="rendimiento" fill="#38B2AC" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Tabla de empleados recientes */}
      <RecentEmployeesTable />

      {/* Acciones rápidas */}
      <Box p={6} shadow="lg" borderRadius="xl" bg="white" mt={8}>
        <Heading size="md" mb={4}>Acciones Rápidas</Heading>
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
          <Button leftIcon={<FiUserPlus />} colorScheme="teal" size="lg" h="60px">
            Nuevo Empleado
          </Button>
          <Button leftIcon={<FiFileText />} colorScheme="blue" variant="outline" size="lg" h="60px">
            Generar Reporte
          </Button>
          <Button leftIcon={<FiCalendar />} colorScheme="purple" variant="outline" size="lg" h="60px">
            Programar Evaluación
          </Button>
          <Button leftIcon={<FiCheckCircle />} colorScheme="green" variant="outline" size="lg" h="60px">
            Aprobar Solicitudes
          </Button>
        </SimpleGrid>
      </Box>
    </Box>
  );
}