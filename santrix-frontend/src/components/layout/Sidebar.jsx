import { 
  Box, VStack, Link as ChakraLink, Text, Icon, Heading, Divider, Button 
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  FiHome, FiUsers, FiBriefcase, FiZap, FiTarget, FiCalendar, FiLogOut, FiClock
} from 'react-icons/fi';

// Nueva paleta de colores
const AZUL_MARINO = "#0A192F";
const ROJO_VINO = "#800020";
const GRIS = "#B0B0B0";
const BLANCO = "#FFFFFF";

const LinkItem = ({ icon, children, to }) => (
  <ChakraLink
    as={NavLink}
    to={to}
    w="full"
    p={3}
    borderRadius="md"
    _hover={{ bg: 'rgba(128, 0, 32, 0.2)', textDecoration: 'none', color: BLANCO }}
    _activeLink={{ bg: ROJO_VINO, fontWeight: 'bold', color: BLANCO }}
    display="flex"
    alignItems="center"
    transition="all 0.2s"
    color={GRIS}
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
    <Box h="100vh" display="flex" flexDirection="column" bg={AZUL_MARINO}>
      <VStack align="stretch" spacing={5} flex="1" overflowY="auto">
        
        {/* Encabezado */}
        <Box textAlign="center" py={4}>
          <Heading size="md" color={ROJO_VINO}>Santrix</Heading>
        </Box>
        <Divider borderColor={GRIS} opacity="0.3" />

        {/* Módulos Principales */}
        <VStack align="stretch" spacing={1} px={2} flex="1">
          <LinkItem icon={FiHome} to="/dashboard">Dashboard</LinkItem>
          
          {isAdmin && (
            <>
              <Text fontSize="xs" fontWeight="bold" color={GRIS} mt={4} mb={1} ml={3}>
                TALENTO HUMANO (ADMIN)
              </Text>
              <LinkItem icon={FiUsers} to="/empleados">Empleados</LinkItem>
              <LinkItem icon={FiZap} to="/practitioners">Practicantes</LinkItem>
              <LinkItem icon={FiCalendar} to="/vacaciones">Vacaciones</LinkItem>
              <LinkItem icon={FiClock} to="/horario">Gestión de Horarios</LinkItem>
            </>
          )}

          <Text fontSize="xs" fontWeight="bold" color={GRIS} mt={isAdmin ? 4 : 0} mb={1} ml={3}>
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
      <Box p={2} borderTop="1px" borderColor={GRIS} opacity="0.3">
        <Button 
          leftIcon={<FiLogOut />}
          w="full"
          variant="ghost"
          onClick={handleLogout}
          color={GRIS}
          _hover={{ bg: 'rgba(128, 0, 32, 0.2)', color: BLANCO }}
        >
          Cerrar Sesión
        </Button>
      </Box>
    </Box>
  );
}