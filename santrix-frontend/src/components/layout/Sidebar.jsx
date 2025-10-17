import { 
  Box, VStack, Link as ChakraLink, Text, Icon, Heading, Divider, Button 
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  FiHome, FiUsers, FiBriefcase, FiZap, FiTarget, FiCalendar, FiLogOut, FiClock
} from 'react-icons/fi';

const LinkItem = ({ icon, children, to }) => (
  <ChakraLink
    as={NavLink}
    to={to}
    w="full"
    p={3}
    borderRadius="md"
    _hover={{ bg: 'teal.600', textDecoration: 'none' }}
    _activeLink={{ bg: 'teal.500', fontWeight: 'bold' }}
    display="flex"
    alignItems="center"
    transition="all 0.2s"
    color="white"
  >
    <Icon as={icon} mr={3} fontSize="lg" />
    <Text fontSize="sm">{children}</Text>
  </ChakraLink>
);

export default function Sidebar() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(''); 

  useEffect(() => {
    const role = localStorage.getItem('user_role');
    setUserRole(role || '');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user_auth');
    localStorage.removeItem('user_role');
    navigate('/login', { replace: true });
  };

  const isAdmin = userRole === 'admin';
  
  return (
    <Box h="100vh" display="flex" flexDirection="column">
      <VStack align="stretch" spacing={5} flex="1" overflowY="auto">
        
        {/* Encabezado */}
        <Box textAlign="center" py={4}>
          <Heading size="md" color="teal.300">Santrix HRMS</Heading>
        </Box>
        <Divider borderColor="gray.700" />

        {/* Módulos Principales */}
        <VStack align="stretch" spacing={1} px={2} flex="1">
          <LinkItem icon={FiHome} to="/dashboard">Dashboard</LinkItem>
          
          {isAdmin && (
            <>
              <Text fontSize="xs" fontWeight="bold" color="gray.400" mt={4} mb={1} ml={3}>
                TALENTO HUMANO (ADMIN)
              </Text>
              <LinkItem icon={FiUsers} to="/empleados">Empleados</LinkItem>
              <LinkItem icon={FiZap} to="/participantes">Participantes</LinkItem>
              <LinkItem icon={FiCalendar} to="/vacaciones">Vacaciones</LinkItem>
              <LinkItem icon={FiClock} to="/horario">Gestión de Horarios</LinkItem>
            </>
          )}

          <Text fontSize="xs" fontWeight="bold" color="gray.400" mt={isAdmin ? 4 : 0} mb={1} ml={3}>
            {isAdmin ? 'GESTIÓN OPERATIVA' : 'MI ESPACIO'}
          </Text>
          <LinkItem icon={FiTarget} to="/desempeno">Desempeño</LinkItem>
          <LinkItem icon={FiBriefcase} to="/proyectos">Proyectos</LinkItem>
          <LinkItem icon={FiZap} to="/capacitaciones">Capacitaciones</LinkItem>
          
          {/* EVENTOS - visible para todos */}
          <LinkItem icon={FiCalendar} to="/eventos">
            {isAdmin ? 'Eventos Corporativos' : 'Eventos'}
          </LinkItem>

          {/* HORARIO - solo para participantes */}
          {!isAdmin && (
            <LinkItem icon={FiClock} to="/horario">Mi Horario</LinkItem>
          )}
        </VStack>
      </VStack>
      
      {/* Botón de Cerrar Sesión - SIEMPRE VISIBLE */}
      <Box p={2} borderTop="1px" borderColor="gray.700">
        <Button 
          leftIcon={<FiLogOut />}
          w="full"
          colorScheme="red"
          variant="ghost"
          onClick={handleLogout}
          color="red.300"
          _hover={{ bg: 'gray.700' }}
        >
          Cerrar Sesión
        </Button>
      </Box>
    </Box>
  );
}