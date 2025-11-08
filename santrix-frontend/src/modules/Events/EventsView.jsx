import { 
  Box, Heading, Text, VStack, Button, Flex, SimpleGrid, 
  Card, CardBody, CardHeader, Tag, useColorModeValue, Icon,
  IconButton, Tooltip, Collapse, Input, InputGroup, InputLeftElement,
  Stat, StatLabel, StatNumber, StatHelpText, Grid, Menu, MenuButton,
  MenuList, MenuItem, HStack, Avatar, AvatarGroup, Progress, Badge,
  Tabs, TabList, TabPanels, Tab, TabPanel
} from '@chakra-ui/react';
import { useState, useEffect, useMemo } from 'react';
import { 
  FiBell, FiGift, FiMapPin, FiCalendar, FiEdit, FiTrash2, 
  FiPlus, FiUsers, FiClock, FiShare, FiHeart, FiCheckCircle,
  FiArrowRight, FiFilter, FiSearch, FiX, FiUser, FiStar,
  FiDollarSign, FiAward, FiCoffee, FiBook, FiTrendingUp,
  FiChevronDown, FiVideo, FiMusic, FiCamera, FiShoppingBag,
  FiShield, FiTarget, FiBarChart2
} from 'react-icons/fi';

// ==================== DATOS MOCK ====================

// --- Para administradores ---
const adminEvents = [
  { 
    id: 1, 
    title: 'Reunión de Directorio Q1', 
    date: '2025-01-30', 
    time: '09:00', 
    location: 'Sala de Junta A', 
    type: 'Reunión Ejecutiva',
    category: 'Corporativo',
    description: 'Revisión de resultados del trimestre y planificación estratégica.',
    attendees: 8,
    maxAttendees: 12,
    confirmedAttendees: ['CEO', 'CFO', 'CTO'],
    organizer: 'Presidencia',
    status: 'activo',
    priority: 'alta',
    budget: 0,
    required: true,
    confidential: true
  },
  { 
    id: 2, 
    title: 'Planning Anual de Eventos', 
    date: '2025-02-10', 
    time: '14:00', 
    location: 'Sala de Conferencias', 
    type: 'Reunión',
    category: 'Planificación',
    description: 'Definición del calendario de eventos corporativos para el año.',
    attendees: 5,
    maxAttendees: 8,
    confirmedAttendees: ['Directora RH', 'Gerente Marketing'],
    organizer: 'Recursos Humanos',
    status: 'activo',
    priority: 'alta',
    budget: 50000,
    required: true,
    confidential: false
  }
];

const adminBirthdays = [
  {
    id: 1,
    name: 'Carlos Mendoza',
    date: '2025-01-25',
    department: 'Dirección',
    position: 'CEO',
    yearsInCompany: 8,
    giftBudget: 500,
    celebrationPlanned: true
  },
  {
    id: 2,
    name: 'Ana Rodríguez',
    date: '2025-02-02',
    department: 'Finanzas',
    position: 'CFO',
    yearsInCompany: 6,
    giftBudget: 400,
    celebrationPlanned: false
  }
];

const budgetData = [
  { category: 'Eventos Corporativos', allocated: 25000, spent: 12000 },
  { category: 'Celebraciones', allocated: 15000, spent: 8000 },
  { category: 'Capacitaciones', allocated: 10000, spent: 3000 }
];

// --- Para empleados / practicantes ---
const employeeEvents = [
  { 
    id: 1, 
    title: 'After Office Mensual', 
    date: '2025-01-20', 
    time: '19:00', 
    location: 'Terraza del Oficina', 
    type: 'Social',
    category: 'Recreación',
    description: 'Tiempo de relax con música, comida y bebidas. ¡Trae tu mejor actitud!',
    attendees: 25,
    maxAttendees: 40,
    confirmedAttendees: ['María López', 'Juan Pérez', 'Sofía Castro'],
    organizer: 'Comité de Cultura',
    status: 'activo',
    priority: 'media',
    budget: 2000,
    required: false,
    confidential: false
  },
  { 
    id: 2, 
    title: 'Taller: Introducción a React', 
    date: '2025-01-22', 
    time: '15:00', 
    location: 'Sala de Capacitación B', 
    type: 'Capacitación',
    category: 'Desarrollo',
    description: 'Aprende los fundamentos de React con ejercicios prácticos. Para todos los niveles.',
    attendees: 18,
    maxAttendees: 20,
    confirmedAttendees: ['Pedro Martínez', 'Laura Díaz'],
    organizer: 'Departamento de Desarrollo',
    status: 'activo',
    priority: 'media',
    budget: 0,
    required: false,
    confidential: false
  },
  { 
    id: 3, 
    title: 'Torneo de FIFA', 
    date: '2025-01-28', 
    time: '17:00', 
    location: 'Zona de Descanso', 
    type: 'Entretenimiento',
    category: 'Recreación',
    description: '¡Demuestra tus habilidades en el torneo de videojuegos! Premios para los ganadores.',
    attendees: 12,
    maxAttendees: 16,
    confirmedAttendees: ['Carlos Ruiz', 'Miguel Ángel'],
    organizer: 'Comité de Recreación',
    status: 'activo',
    priority: 'baja',
    budget: 500,
    required: false,
    confidential: false
  }
];

const employeeBirthdays = [
  {
    id: 1,
    name: 'Laura García',
    date: '2025-01-18',
    department: 'Marketing',
    position: 'Diseñadora',
    yearsInCompany: 2
  },
  {
    id: 2,
    name: 'Roberto Silva',
    date: '2025-01-22',
    department: 'Desarrollo',
    position: 'Practicante',
    yearsInCompany: 1
  }
];

// ==================== COMPONENTES ====================

const ModernEventCard = ({ event, isAdmin, onRSVP, onShare }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const attendanceRate = Math.min(100, (event.attendees / event.maxAttendees) * 100);

  const getCategoryIcon = (category) => {
    const icons = {
      'Corporativo': FiShield,
      'Planificación': FiTarget,
      'Recreación': FiCoffee,
      'Desarrollo': FiBook,
      'Entretenimiento': FiVideo
    };
    return icons[category] || FiCalendar;
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Corporativo': 'red',
      'Planificación': 'purple',
      'Recreación': 'green',
      'Desarrollo': 'blue',
      'Entretenimiento': 'orange'
    };
    return colors[category] || 'gray';
  };

  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Card 
      bg={bg}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="2xl"
      overflow="hidden"
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={{ 
        transform: 'translateY(-6px)',
        shadow: 'xl',
        borderColor: useColorModeValue('blue.200', 'blue.600')
      }}
    >
      <Box h="4px" bg={`${getCategoryColor(event.category)}.500`} />

      <CardHeader p={5} pb={3}>
        <Flex justify="space-between" align="start" mb={2}>
          <HStack spacing={2}>
            {event.required && (
              <Badge colorScheme="purple" variant="subtle" fontSize="xs" px={2}>
                Obligatorio
              </Badge>
            )}
            {event.confidential && (
              <Badge colorScheme="red" variant="subtle" fontSize="xs" px={2}>
                Confidencial
              </Badge>
            )}
          </HStack>
          
          <Tag size="sm" colorScheme={getCategoryColor(event.category)} borderRadius="full">
            <Icon as={getCategoryIcon(event.category)} boxSize={3.5} mr={1} />
            {event.category}
          </Tag>
        </Flex>

        <Heading size="md" fontWeight="700" color="gray.800" mb={2}>{event.title}</Heading>

        <VStack align="start" spacing={1} fontSize="sm" color="gray.600">
          <Flex align="center" gap={2}>
            <Box p={1} bg="blue.50" borderRadius="md">
              <Icon as={FiCalendar} color="blue.600" boxSize={3.5} />
            </Box>
            <Text>{new Date(event.date).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' })} • {event.time}</Text>
          </Flex>
          <Flex align="center" gap={2}>
            <Box p={1} bg="purple.50" borderRadius="md">
              <Icon as={FiMapPin} color="purple.600" boxSize={3.5} />
            </Box>
            <Text>{event.location}</Text>
          </Flex>
          <Flex align="center" gap={2}>
            <Box p={1} bg="green.50" borderRadius="md">
              <Icon as={FiUsers} color="green.600" boxSize={3.5} />
            </Box>
            <Text>{event.attendees}/{event.maxAttendees} asistentes</Text>
          </Flex>
        </VStack>

        <Box mt={3}>
          <Flex justify="space-between" mb={1} fontSize="xs" color="gray.500">
            <span>Asistencia</span>
            <span>{Math.round(attendanceRate)}%</span>
          </Flex>
          <Progress 
            value={attendanceRate} 
            colorScheme={attendanceRate > 80 ? 'red' : 'green'} 
            size="sm" 
            borderRadius="full" 
            h="6px"
          />
        </Box>
      </CardHeader>

      <CardBody pt={0} px={5} pb={5}>
        <Collapse in={showDetails} animateOpacity>
          <VStack align="stretch" spacing={3} mb={4} fontSize="sm">
            <Text color="gray.600">{event.description}</Text>
            
            <Flex justify="space-between" wrap="wrap" gap={2}>
              <Box>
                <Text fontWeight="600" color="gray.700" fontSize="xs">Organizado por</Text>
                <Text color="gray.600">{event.organizer}</Text>
              </Box>
              
              {!event.confidential && event.confirmedAttendees.length > 0 && (
                <Box>
                  <Text fontWeight="600" color="gray.700" fontSize="xs">Confirmados</Text>
                  <AvatarGroup size="sm" max={4} mt={1}>
                    {event.confirmedAttendees.map((name, i) => (
                      <Avatar key={i} name={name} bg="blue.500" />
                    ))}
                  </AvatarGroup>
                </Box>
              )}
            </Flex>

            {isAdmin && (
              <HStack spacing={2} mt={2}>
                {event.budget > 0 && (
                  <Badge colorScheme="green" variant="subtle">
                    <Icon as={FiDollarSign} mr={1} /> ${event.budget}
                  </Badge>
                )}
                <Badge colorScheme={event.priority === 'alta' ? 'red' : 'orange'} variant="subtle">
                  Prioridad {event.priority}
                </Badge>
              </HStack>
            )}
          </VStack>
        </Collapse>

        <Flex justify="space-between" align="center" mt={4}>
          <HStack spacing={1}>
            {!isAdmin && (
              <>
                <Tooltip label={isLiked ? "Quitar me gusta" : "Me gusta"}>
                  <IconButton
                    size="xs"
                    icon={<FiHeart />}
                    color={isLiked ? 'red.500' : 'gray.400'}
                    variant="ghost"
                    onClick={() => setIsLiked(!isLiked)}
                    aria-label="Me gusta"
                    _hover={{ bg: 'transparent' }}
                  />
                </Tooltip>
                <Tooltip label="Confirmar asistencia">
                  <IconButton
                    size="xs"
                    icon={<FiCheckCircle />}
                    color="green.500"
                    variant="ghost"
                    onClick={() => onRSVP(event.id)}
                    aria-label="Confirmar"
                    _hover={{ bg: 'transparent' }}
                  />
                </Tooltip>
                <Tooltip label="Compartir">
                  <IconButton
                    size="xs"
                    icon={<FiShare />}
                    color="blue.500"
                    variant="ghost"
                    onClick={() => onShare(event.id)}
                    aria-label="Compartir"
                    _hover={{ bg: 'transparent' }}
                  />
                </Tooltip>
              </>
            )}
          </HStack>

          <HStack spacing={1}>
            <Tooltip label={showDetails ? "Ver menos" : "Ver más"}>
              <Button
                size="xs"
                variant="ghost"
                color="gray.500"
                onClick={() => setShowDetails(!showDetails)}
                rightIcon={<FiArrowRight style={{ transform: showDetails ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />}
              >
                {showDetails ? 'Menos' : 'Más'}
              </Button>
            </Tooltip>

            {isAdmin && (
              <HStack spacing={1}>
                <IconButton
                  size="xs"
                  icon={<FiEdit />}
                  colorScheme="blue"
                  variant="outline"
                  onClick={() => alert(`Editar: ${event.title}`)}
                  aria-label="Editar"
                />
                <IconButton
                  size="xs"
                  icon={<FiTrash2 />}
                  colorScheme="red"
                  variant="outline"
                  onClick={() => alert(`Eliminar: ${event.title}`)}
                  aria-label="Eliminar"
                />
              </HStack>
            )}
          </HStack>
        </Flex>
      </CardBody>
    </Card>
  );
};

const ModernBirthdayCard = ({ birthday, isAdmin }) => {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Card 
      bg={bg}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="2xl"
      overflow="hidden"
      transition="all 0.2s"
      _hover={{ borderColor: useColorModeValue('pink.200', 'pink.600') }}
    >
      <CardBody p={5}>
        <Flex align="center" justify="space-between" wrap="wrap" gap={4}>
          <HStack spacing={4}>
            <Box p={3} bg="pink.100" borderRadius="full">
              <Icon as={FiGift} boxSize={6} color="pink.600" />
            </Box>
            <Box>
              <Text fontWeight="700" fontSize="lg" color="gray.800">{birthday.name}</Text>
              <Text fontSize="sm" color="gray.600">{birthday.position} • {birthday.department}</Text>
              <Text fontSize="xs" color="gray.500">
                {birthday.yearsInCompany} año{birthday.yearsInCompany !== 1 ? 's' : ''} en la empresa
              </Text>
            </Box>
          </HStack>
          
          <VStack align="end" spacing={2}>
            <Text fontSize="lg" fontWeight="bold" color="pink.600">
              {new Date(birthday.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
            </Text>
            
            {isAdmin ? (
              <HStack>
                <Badge colorScheme={birthday.celebrationPlanned ? 'green' : 'orange'} fontSize="xs">
                  {birthday.celebrationPlanned ? '✅ Programado' : '⚠️ Pendiente'}
                </Badge>
                <Text fontSize="sm" color="gray.600">${birthday.giftBudget}</Text>
              </HStack>
            ) : (
              <Badge colorScheme="pink" variant="subtle" fontSize="xs">
                ¡Feliz cumpleaños!
              </Badge>
            )}
          </VStack>
        </Flex>
      </CardBody>
    </Card>
  );
};

const BudgetOverviewCard = () => {
  const totalAllocated = budgetData.reduce((sum, item) => sum + item.allocated, 0);
  const totalSpent = budgetData.reduce((sum, item) => sum + item.spent, 0);
  const percentage = Math.round((totalSpent / totalAllocated) * 100);

  return (
    <Card bg={useColorModeValue('white', 'gray.800')} borderRadius="2xl" p={6}>
      <Flex align="center" justify="space-between" mb={6}>
        <Box>
          <Heading size="md" fontWeight="700">Presupuesto General 2025</Heading>
          <Text color="gray.600" fontSize="sm">Distribución por categorías</Text>
        </Box>
        <Icon as={FiBarChart2} boxSize={8} color="blue.500" />
      </Flex>

      <Stat mb={6}>
        <StatLabel color="gray.600">Total Ejecutado</StatLabel>
        <StatNumber color="gray.800">${totalSpent.toLocaleString()}</StatNumber>
        <StatHelpText>
          de ${totalAllocated.toLocaleString()} ({percentage}%)
        </StatHelpText>
      </Stat>

      <VStack spacing={4} align="stretch">
        {budgetData.map((item, i) => {
          const pct = Math.round((item.spent / item.allocated) * 100);
          return (
            <Box key={i}>
              <Flex justify="space-between" mb={1} fontSize="sm">
                <Text fontWeight="600">{item.category}</Text>
                <Text>${item.spent.toLocaleString()} / ${item.allocated.toLocaleString()}</Text>
              </Flex>
              <Progress 
                value={pct} 
                colorScheme={pct > 80 ? 'red' : pct > 60 ? 'orange' : 'green'} 
                size="sm" 
                borderRadius="full" 
                h="8px"
              />
            </Box>
          );
        })}
      </VStack>
    </Card>
  );
};

// ==================== COMPONENTE PRINCIPAL ====================

export default function EventsView() {
  const [userRole, setUserRole] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  useEffect(() => {
    const role = localStorage.getItem('user_role') || 'practicante';
    setUserRole(role);
  }, []);

  const isAdmin = userRole === 'admin';

  // ✅ Aseguramos que las variables existan
  const events = isAdmin ? adminEvents : employeeEvents;
  const birthdays = isAdmin ? adminBirthdays : employeeBirthdays;

  const categories = ['Todos', ...new Set(events.map(e => e.category))];

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Todos' || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [events, searchTerm, selectedCategory]);

  return (
    <Box 
      p={{ base: 4, md: 6 }} 
      bg={useColorModeValue('gray.50', 'gray.900')} 
      minH="100vh"
    >
      <Box maxW="1400px" mx="auto">
        {/* Hero Header */}
        <VStack align="start" spacing={2} mb={8}>
          <HStack>
            <Box p={2} bg="blue.100" borderRadius="full">
              <Icon as={FiBell} boxSize={6} color="blue.600" />
            </Box>
            <Heading size="2xl" fontWeight="800" color="gray.800">
              {isAdmin ? 'Gestión de Eventos Corporativos' : 'Eventos y Celebraciones'}
            </Heading>
          </HStack>
          <Text color="gray.600" maxW="700px">
            {isAdmin 
              ? 'Supervisa reuniones ejecutivas, presupuestos y planificación estratégica.'
              : 'Descubre actividades, talleres y celebraciones para conectar con tu equipo.'
            }
          </Text>
        </VStack>

        {/* Filtros */}
        <Card mb={8} borderRadius="2xl" borderWidth="1px" borderColor={useColorModeValue('gray.200', 'gray.700')}>
          <CardBody p={5}>
            <Grid templateColumns={{ base: '1fr', md: '1fr auto' }} gap={4} alignItems="end">
              <InputGroup>
                <InputLeftElement pointerEvents="none" color="gray.400">
                  <FiSearch />
                </InputLeftElement>
                <Input
                  placeholder={isAdmin ? "Buscar reuniones o eventos..." : "Buscar actividades..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  borderRadius="full"
                  bg={useColorModeValue('white', 'gray.700')}
                />
              </InputGroup>

              <Menu>
                <MenuButton 
                  as={Button} 
                  rightIcon={<FiChevronDown />} 
                  variant="outline" 
                  borderRadius="full"
                  minW="180px"
                >
                  {selectedCategory === 'Todos' ? 'Todas las categorías' : selectedCategory}
                </MenuButton>
                <MenuList borderRadius="xl">
                  {categories.map(cat => (
                    <MenuItem 
                      key={cat} 
                      onClick={() => setSelectedCategory(cat)}
                      _hover={{ bg: 'blue.50' }}
                    >
                      {cat}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Grid>
          </CardBody>
        </Card>

        {/* Pestañas */}
        <Tabs colorScheme="blue" variant="enclosed">
          <TabList 
            bg={useColorModeValue('white', 'gray.800')} 
            borderRadius="2xl" 
            p={2}
            mb={6}
            borderWidth="1px"
            borderColor={useColorModeValue('gray.200', 'gray.700')}
          >
            <Tab 
              borderRadius="xl" 
              _selected={{ bg: 'blue.500', color: 'white', boxShadow: 'md' }}
            >
              📅 Eventos
            </Tab>
            <Tab 
              borderRadius="xl" 
              _selected={{ bg: 'blue.500', color: 'white', boxShadow: 'md' }}
            >
              🎂 Cumpleaños
            </Tab>
            {isAdmin && (
              <Tab 
                borderRadius="xl" 
                _selected={{ bg: 'blue.500', color: 'white', boxShadow: 'md' }}
              >
                💰 Presupuestos
              </Tab>
            )}
          </TabList>

          <TabPanels>
            {/* Eventos */}
            <TabPanel p={0}>
              {filteredEvents.length === 0 ? (
                <Card textAlign="center" py={12} borderRadius="2xl">
                  <Icon as={FiCalendar} boxSize={16} color="gray.300" />
                  <Text mt={4} fontSize="lg" color="gray.600">No hay eventos que coincidan</Text>
                </Card>
              ) : (
                <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6}>
                  {filteredEvents.map(event => (
                    <ModernEventCard 
                      key={event.id} 
                      event={event}
                      isAdmin={isAdmin}
                      onRSVP={() => {}}
                      onShare={() => {}}
                    />
                  ))}
                </SimpleGrid>
              )}
            </TabPanel>

            {/* Cumpleaños */}
            <TabPanel p={0}>
              <VStack spacing={6} align="stretch">
                {isAdmin ? (
                  <Card bg="blue.50" borderRadius="2xl" p={5}>
                    <Flex align="center" justify="space-between">
                      <Box>
                        <Heading size="md" fontWeight="700">Gestión de Cumpleaños Ejecutivos</Heading>
                        <Text color="blue.700">Asigna presupuestos y programa celebraciones</Text>
                      </Box>
                      <Button leftIcon={<FiGift />} colorScheme="blue" size="sm" borderRadius="full">
                        Nueva Celebración
                      </Button>
                    </Flex>
                  </Card>
                ) : (
                  <Card bg="green.50" borderRadius="2xl" p={5}>
                    <Heading size="md" fontWeight="700">🎉 Próximos Cumpleaños</Heading>
                    <Text color="green.700">¡No olvides felicitar a tus compañeros!</Text>
                  </Card>
                )}

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                  {birthdays.map(b => (
                    <ModernBirthdayCard key={b.id} birthday={b} isAdmin={isAdmin} />
                  ))}
                </SimpleGrid>
              </VStack>
            </TabPanel>

            {/* Presupuestos (solo admin) */}
            {isAdmin && (
              <TabPanel p={0}>
                <BudgetOverviewCard />
              </TabPanel>
            )}
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}