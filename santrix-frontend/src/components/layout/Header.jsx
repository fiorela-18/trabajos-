import {
  Box, Flex, Heading,
  IconButton, Menu, MenuButton, MenuList, MenuItem, Avatar,
  Text, Spacer
} from '@chakra-ui/react';
import { FiBell, FiChevronDown } from 'react-icons/fi';
import React from 'react';

export default function Header() {
  const userName = "Administrador";

  return (
    <Flex h="16" align="center" justify="space-between" px={6} borderBottom="1px" borderColor="gray.100">
      
      {/* Ocultar Logo/Nombre en desktop (ya está en Sidebar) */}
      <Heading size="sm" color="gray.800" display={{ base: 'block', md: 'none' }}>
        Santrix
      </Heading>

      <Spacer /> {/* Usamos Spacer para empujar el contenido a la derecha */}

      {/* La Búsqueda Global ha sido removida para evitar el error de caché. */}
      <Box w={{ base: 'full', md: '400px' }} mx={4} display={{ base: 'none', md: 'block' }}>
        {/* Espacio vacío donde antes estaba la búsqueda */}
      </Box>

      {/* Iconos y Perfil */}
      <Flex align="center">
        <IconButton icon={<FiBell />} aria-label="Notificaciones" variant="ghost" size="md" mr={4} />
        
        {/* Menú de Usuario */}
        <Menu>
          <MenuButton 
            as={Flex} 
            alignItems="center" 
            cursor="pointer"
            p={1}
            borderRadius="lg"
            _hover={{ bg: 'gray.100' }}
          >
            <Avatar size="sm" name={userName} mr={2} />
            <Text fontSize="sm" fontWeight="medium" display={{ base: 'none', lg: 'block' }}>
              {userName}
            </Text>
            <FiChevronDown size={16} style={{ marginLeft: '4px' }} />
          </MenuButton>
          <MenuList>
            <MenuItem>Mi Perfil</MenuItem>
            <MenuItem>Configuración</MenuItem>
            <MenuItem color="red.500">Cerrar Sesión</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}