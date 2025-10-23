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

// Colores corporativos
const COLORS = {
  primary: '#0A192F',    // Azul Marino
  accent: '#800020',     // Rojo Vino
  gray: '#B0B0B0',       // Gris
  white: '#FFFFFF',      // Blanco
  lightGray: '#F7FAFC',  // Gris muy claro para fondos
};

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
  { name: 'Desarrollo', value: 45, color: '#0A192F' },
  { name: 'Diseño', value: 20, color: '#800020' },
  { name: 'Marketing', value: 25, color: '#4A5568' },
  { name: 'RRHH', value: 15, color: '#718096' },
  { name: 'Ventas', value: 20, color: '#B0B0B0' },
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
const MetricCard = ({ title, value, change, changeType, icon, accentColor = COLORS.accent }) => (
  <Stat p={5} shadow="lg" borderRadius="xl" bg={COLORS.white} borderLeft="4px" borderColor={accentColor}>
    <Flex justifyContent="space-between" alignItems="center">
      <Box>
        <StatLabel fontWeight="medium" fontSize="sm" color={COLORS.gray}>{title}</StatLabel>
        <StatNumber fontSize="3xl" fontWeight="bold" my={2} color={COLORS.primary}>{value}</StatNumber>
        <Text 
          fontSize="xs" 
          fontWeight="semibold"
          color={changeType === 'increase' ? 'green.500' : changeType === 'decrease' ? COLORS.accent : COLORS.gray} 
        >
          {change}
        </Text>
      </Box>
      <Flex 
        w="60px" 
        h="60px" 
        borderRadius="xl" 
        bg={COLORS.lightGray}
        align="center" 
        justify="center"
      >
        <Icon as={icon} w={7} h={7} color={accentColor} />
      </Flex>
    </Flex>
  </Stat>
);

// Componente de Lista con acciones
const QuickInfoCard = ({ title, items, actionLabel, onAction, icon }) => (
  <Box p={5} shadow="lg" borderRadius="xl" bg={COLORS.white} h="full">
    <Flex justify="space-between" align="center" mb={4}>
      <HStack>
        {icon && <Icon as={icon} color={COLORS.accent} w={5} h={5} />}
        <Heading size="md" color={COLORS.primary}>{title}</Heading>
      </HStack>
      {actionLabel && (
        <Button 
          size="sm" 
          bg={COLORS.accent} 
          color={COLORS.white}
          variant="ghost" 
          onClick={onAction}
          _hover={{ bg: COLORS.accent, opacity: 0.9 }}
        >
          {actionLabel}
        </Button>
      )}
    </Flex>
    <VStack align="stretch" spacing={3} maxH="300px" overflowY="auto">
      {items.map((item, idx) => (
        <Flex 
          key={idx} 
          justify="space-between" 
          align="center" 
          p={3} 
          bg={COLORS.lightGray} 
          borderRadius="lg" 
          _hover={{ bg: '#E2E8F0' }} 
          transition="all 0.2s"
        >
          <HStack flex="1">
            {item.avatar && <Avatar size="sm" name={item.name} bg={COLORS.primary} />}
            <Box>
              <Text fontWeight="semibold" fontSize="sm" color={COLORS.primary}>{item.name}</Text>
              <Text fontSize="xs" color={COLORS.gray}>{item.detail}</Text>
            </Box>
          </HStack>
          {item.badge && (
            <Badge 
              colorScheme={item.badgeColor || 'gray'} 
              fontSize="xs" 
              px={2} 
              py={1}
              bg={item.badgeColor === 'red' ? COLORS.accent : undefined}
              color={item.badgeColor === 'red' ? COLORS.white : undefined}
            >
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
    <Box p={5} shadow="lg" borderRadius="xl" bg={COLORS.white}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="md" color={COLORS.primary}>Empleados Recientes</Heading>
        <Button 
          size="sm" 
          leftIcon={<FiUserPlus />} 
          bg={COLORS.white}
          color={COLORS.accent}
          border="1px"
          borderColor={COLORS.accent}
          variant="outline"
          _hover={{ bg: COLORS.accent, color: COLORS.white }}
        >
          Ver Todos
        </Button>
      </Flex>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr bg={COLORS.lightGray}>
            <Th color={COLORS.primary}>Nombre</Th>
            <Th color={COLORS.primary}>Cargo</Th>
            <Th color={COLORS.primary}>Departamento</Th>
            <Th color={COLORS.primary}>Fecha Ingreso</Th>
            <Th color={COLORS.primary}>Estado</Th>
          </Tr>
        </Thead>
        <Tbody>
          {recentEmployees.map((emp, idx) => (
            <Tr key={idx} _hover={{ bg: COLORS.lightGray }}>
              <Td>
                <HStack>
                  <Avatar size="xs" name={emp.name} bg={COLORS.primary} />
                  <Text fontWeight="medium" fontSize="sm" color={COLORS.primary}>{emp.name}</Text>
                </HStack>
              </Td>
              <Td fontSize="sm" color={COLORS.gray}>{emp.position}</Td>
              <Td fontSize="sm" color={COLORS.gray}>{emp.department}</Td>
              <Td fontSize="sm" color={COLORS.gray}>{emp.date}</Td>
              <Td>
                <Tag size="sm" bg="green.500" color={COLORS.white}>{emp.status}</Tag>
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
    { name: 'Carlos López', detail: 'Gerente - 28 Oct', avatar: true, badge: 'En 8 días', badgeColor: 'cyan' },
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
    <Box p={6} bg={COLORS.lightGray} minH="100vh">
      {/* Header */}
      <Flex justify="space-between" align="center" mb={8}>
        <Box>
          <Heading size="xl" color={COLORS.primary}>Panel de Administración</Heading>
          <Text color={COLORS.gray} mt={1}>Bienvenido, administrador. Aquí está el resumen de hoy.</Text>
        </Box>
        <HStack>
          <Button 
            leftIcon={<FiDownload />} 
            bg={COLORS.white}
            color={COLORS.accent}
            border="1px"
            borderColor={COLORS.accent}
            variant="outline" 
            size="sm"
            _hover={{ bg: COLORS.accent, color: COLORS.white }}
          >
            Exportar Reporte
          </Button>
          <Button 
            leftIcon={<FiSettings />} 
            bg={COLORS.white}
            color={COLORS.gray}
            border="1px"
            borderColor={COLORS.gray}
            variant="outline" 
            size="sm"
            _hover={{ bg: COLORS.gray, color: COLORS.white }}
          >
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
          accentColor={COLORS.primary}
        />
        <MetricCard 
          title="Proyectos Activos" 
          value="18" 
          change="↑ 2 nuevos este mes" 
          changeType="increase" 
          icon={FiBriefcase}
          accentColor={COLORS.accent}
        />
        <MetricCard 
          title="Solicitudes Pendientes" 
          value="7" 
          change="Requieren atención" 
          changeType="neutral" 
          icon={FiAlertTriangle}
          accentColor="#ED8936"
        />
        <MetricCard 
          title="Desempeño Promedio" 
          value="94%" 
          change="↑ 6% vs trimestre anterior" 
          changeType="increase" 
          icon={FiTrendingUp}
          accentColor="#48BB78"
        />
      </SimpleGrid>

      {/* Gráficos principales */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mb={8}>
        {/* Gráfico de crecimiento */}
        <Box p={6} shadow="lg" borderRadius="xl" bg={COLORS.white}>
          <Heading size="md" mb={4} color={COLORS.primary}>Crecimiento de Personal</Heading>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={employeeGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" stroke={COLORS.gray} />
              <YAxis stroke={COLORS.gray} />
              <Tooltip />
              <Line type="monotone" dataKey="empleados" stroke={COLORS.accent} strokeWidth={3} dot={{ fill: COLORS.accent, r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        {/* Gráfico de distribución por departamento */}
        <Box p={6} shadow="lg" borderRadius="xl" bg={COLORS.white}>
          <Heading size="md" mb={4} color={COLORS.primary}>Distribución por Departamento</Heading>
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
<Box p={6} shadow="lg" borderRadius="xl" bg={COLORS.white} mb={8}>
  <Heading size="md" mb={4} color={COLORS.primary}>
    Tendencia de Desempeño General
  </Heading>
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={performanceData}>
      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
      <XAxis dataKey="mes" stroke={COLORS.gray} />
      <YAxis stroke={COLORS.gray} />
      <Tooltip />
      <Legend />
      <Bar dataKey="rendimiento" radius={[8, 8, 0, 0]}>
        {performanceData.map((_, index) => (
          <Cell
            key={`cell-${index}`}
            fill={[
              "#800020", // vino tinto
              "#B03060", // vino claro
              "#C75B7A", // rosa vino
              "#D6A2AD", // rosado suave
              "#F4D58D", // dorado pastel
              "#9D174D", // borgoña intenso
              "#FBBF24", // amarillo cálido
              "#6B728E", // gris lila
              "#4A5568", // gris oscuro
              "#0A192F"  // azul marino corporativo
            ][index % 10]}
          />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
</Box>


      {/* Tabla de empleados recientes */}
      <RecentEmployeesTable />

      {/* Acciones rápidas */}
      <Box p={6} shadow="lg" borderRadius="xl" bg={COLORS.white} mt={8}>
        <Heading size="md" mb={4} color={COLORS.primary}>Acciones Rápidas</Heading>
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
          <Button 
            leftIcon={<FiUserPlus />} 
            bg={COLORS.accent}
            color={COLORS.white}
            size="lg" 
            h="60px"
            _hover={{ bg: COLORS.accent, opacity: 0.9 }}
          >
            Nuevo Empleado
          </Button>
          <Button 
            leftIcon={<FiFileText />} 
            bg={COLORS.white}
            color={COLORS.primary}
            border="1px"
            borderColor={COLORS.primary}
            variant="outline" 
            size="lg" 
            h="60px"
            _hover={{ bg: COLORS.primary, color: COLORS.white }}
          >
            Generar Reporte
          </Button>
          <Button 
            leftIcon={<FiCalendar />} 
            bg={COLORS.white}
            color={COLORS.primary}
            border="1px"
            borderColor={COLORS.primary}
            variant="outline" 
            size="lg" 
            h="60px"
            _hover={{ bg: COLORS.primary, color: COLORS.white }}
          >
            Programar Evaluación
          </Button>
          <Button 
            leftIcon={<FiCheckCircle />} 
            bg={COLORS.white}
            color="green.600"
            border="1px"
            borderColor="green.600"
            variant="outline" 
            size="lg" 
            h="60px"
            _hover={{ bg: 'green.600', color: COLORS.white }}
          >
            Aprobar Solicitudes
          </Button>
        </SimpleGrid>
      </Box>
    </Box>
  );
}