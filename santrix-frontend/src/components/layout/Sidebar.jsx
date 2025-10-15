import { 
  Box, VStack, Link as ChakraLink, Text, Icon, Heading, Divider, Button 
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  FiHome, FiUsers, FiBriefcase, FiZap, FiTarget, FiCalendar, FiLogOut 
} from 'react-icons/fi';

const LinkItem = ({ icon, children, to }) => (
  <ChakraLink
    as={NavLink}
    to={to}
    w="full"
    p={3}
    borderRadius="md"
    _hover={{ bg: 'teal.600', textDecoration: 'none' }}
    _activeLink={{ bg: 'teal.500', fontWeight: 'bold' }} // Estilo para el enlace activo
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
  // 1. Estado para almacenar y actualizar el rol: Inicializado a string vacío para mayor seguridad.
  const [userRole, setUserRole] = useState(''); 

  useEffect(() => {
    // 2. Leer el rol del localStorage al cargar el componente
    // Usamos || '' para asegurar que siempre sea un string, incluso si localStorage devuelve null
    const role = localStorage.getItem('user_role');
    setUserRole(role || '');
  }, []); // Se ejecuta una vez al montar

  // Función de Logout
  const handleLogout = () => {
    // Limpiar la autenticación y el rol
    localStorage.removeItem('user_auth');
    localStorage.removeItem('user_role'); // Limpiar el rol también
    navigate('/login', { replace: true });
  };

  // Determinar permisos
  const isAdmin = userRole === 'admin';
  
  return (
    <Box>
      <VStack align="stretch" spacing={5}>
        
        {/* Encabezado */}
        <Box textAlign="center" py={4}>
          <Heading size="md" color="teal.300">Santrix HRMS</Heading>
        </Box>
        <Divider borderColor="gray.700" />

        {/* 1. Módulos Principales (Comunes) */}
        <VStack align="stretch" spacing={1} px={2}>
          <LinkItem icon={FiHome} to="/dashboard">Dashboard</LinkItem>
          
          {/* SECCIÓN TALENTO HUMANO (VISIBLE SOLO PARA ADMIN) */}
          {isAdmin && (
            <>
              <Text fontSize="xs" fontWeight="bold" color="gray.400" mt={4} mb={1} ml={3}>
                TALENTO HUMANO (ADMIN)
              </Text>
              <LinkItem icon={FiUsers} to="/empleados">Empleados</LinkItem>
              <LinkItem icon={FiZap} to="/participantes">Participantes</LinkItem>
              <LinkItem icon={FiCalendar} to="/vacaciones">Vacaciones</LinkItem>
            </>
          )}

          {/* MÓDULOS COMUNES / AUTOGESTIÓN */}
          <Text fontSize="xs" fontWeight="bold" color="gray.400" mt={isAdmin ? 4 : 0} mb={1} ml={3}>
            {isAdmin ? 'GESTIÓN OPERATIVA' : 'MI ESPACIO'}
          </Text>
          <LinkItem icon={FiTarget} to="/desempeno">Desempeño</LinkItem>
          <LinkItem icon={FiBriefcase} to="/proyectos">Proyectos</LinkItem>
          <LinkItem icon={FiZap} to="/capacitaciones">Capacitaciones</LinkItem>
          
        </VStack>
        
        {/* 2. Botón de Cerrar Sesión (al final) */}
        <Box mt="auto" pt={8} px={2}>
            <Button 
                leftIcon={<FiLogOut />}
                w="full"
                colorScheme="red"
                variant="ghost"
                onClick={handleLogout} // <-- LLAMADA AL LOGOUT
                color="red.300"
                _hover={{ bg: 'gray.700' }}
            >
                Cerrar Sesión
            </Button>
        </Box>
      </VStack>
    </Box>
  );
}
