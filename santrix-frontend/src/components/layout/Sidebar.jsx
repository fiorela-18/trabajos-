import { Box, VStack, Text, Heading, Link as ChakraLink, Icon, Flex } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  FiHome, FiUsers, FiClock, FiBriefcase, FiZap, FiCalendar, FiBookOpen
} from 'react-icons/fi';

const navGroups = [
  {
    title: 'Principal',
    items: [{ name: 'Dashboard', path: '/dashboard', icon: FiHome }],
  },
  {
    title: 'Talento Humano',
    items: [
      { name: 'Empleados', path: '/empleados', icon: FiUsers },
      { name: 'Participantes', path: '/participantes', icon: FiUsers },
      { name: 'Desempeño', path: '/desempeno', icon: FiZap },
      { name: 'Vacaciones y Permisos', path: '/vacaciones', icon: FiCalendar },
    ],
  },
  {
    title: 'Operaciones',
    items: [
      { name: 'Proyectos', path: '/proyectos', icon: FiBriefcase },
      { name: 'Capacitaciones', path: '/capacitaciones', icon: FiBookOpen },
    ],
  },
];

const NavItem = ({ name, path, icon }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(path) && (location.pathname.length === path.length || location.pathname[path.length] === '/');

  return (
    <ChakraLink 
      as={RouterLink} 
      to={path} 
      w="full"
      p={2}
      borderRadius="md"
      _hover={{ bg: 'gray.700' }}
      bg={isActive ? 'gray.700' : 'transparent'}
      fontWeight={isActive ? 'bold' : 'normal'}
      borderLeft={isActive ? '4px solid white' : 'none'}
      pl={isActive ? '10px' : '12px'}
      color={isActive ? 'white' : 'gray.300'}
    >
      <Flex align="center">
        <Icon as={icon} mr={3} w={5} h={5} />
        <Text>{name}</Text>
      </Flex>
    </ChakraLink>
  );
};

export default function Sidebar() {
  return (
    <Box p={4} h="full" overflowY="auto" >
      <Heading size="lg" mb={8} color="white">Santrix</Heading>
      
      {navGroups.map((group) => (
        <Box key={group.title} mb={6}>
          <Text fontSize="xs" color="gray.400" textTransform="uppercase" mb={2}>
            {group.title}
          </Text>
          <VStack align="stretch" spacing={1}>
            {group.items.map((item) => (
              <NavItem key={item.name} {...item} />
            ))}
          </VStack>
        </Box>
      ))}
    </Box>
  );
}