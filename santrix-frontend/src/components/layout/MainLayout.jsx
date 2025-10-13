import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

// Fija el ancho del Sidebar
const SIDEBAR_WIDTH = "250px"; 

export default function MainLayout({ children }) {
  return (
    <Flex h="100vh">
      {/* 1. Barra Lateral (Fija) */}
      <Box 
        as="nav"
        position="fixed"
        left="0"
        top="0"
        h="100%"
        w={SIDEBAR_WIDTH}
        zIndex="sticky"
        bg="gray.800" 
        color="white"
        p="4"
        display={{ base: 'none', md: 'block' }} // Visible solo en desktop
      >
        <Sidebar />
      </Box>

      {/* 2. Contenedor Principal (Contenido y Header) */}
      <Box 
        flex="1" 
        ml={{ base: 0, md: SIDEBAR_WIDTH }} // Margen para dejar espacio al Sidebar
        h="100%"
        overflowY="auto"
        bg="gray.50"
      >
        {/* 3. Header (Fijo en la parte superior) */}
        <Box 
          as="header" 
          position="sticky" 
          top="0" 
          zIndex="banner"
          bg="white"
          boxShadow="sm"
        >
          <Header />
        </Box>

        {/* 4. Área de Contenido (Las vistas que se cargan) */}
        <Box as="main" p={6}>
          {children}
        </Box>
      </Box>
    </Flex>
  );
}