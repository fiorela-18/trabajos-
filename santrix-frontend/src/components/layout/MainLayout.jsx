import { Box, Flex, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header'; 

// Fija el ancho del Sidebar
const SIDEBAR_WIDTH = "250px"; 

export default function MainLayout({ children }) {
    const navigate = useNavigate();
    const toast = useToast();
    
    // 1. Obtener y gestionar el estado de autenticación
    const [userRole, setUserRole] = useState(localStorage.getItem('user_role') || '');
    const [userEmail, setUserEmail] = useState(localStorage.getItem('user_email') || '');

    // 2. Comprobar la autenticación al cargar
    useEffect(() => {
        if (!userRole || !userEmail) {
            navigate('/');
            toast({
                title: 'Sesión expirada o no iniciada.',
                description: 'Por favor, inicia sesión para continuar.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    }, [navigate, userRole, userEmail, toast]);

    // Función de Logout que se pasa al Header y Sidebar
    const handleLogout = () => {
        localStorage.removeItem('user_role');
        localStorage.removeItem('user_email');
        toast({
            title: 'Sesión Cerrada',
            description: 'Has cerrado la sesión con éxito.',
            status: 'info',
            duration: 2000,
            isClosable: true,
        });
        navigate('/');
    };

    if (!userRole) {
        return null; // No renderizar nada si no está autenticado
    }

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
                // Pasar el rol para que el menú se renderice dinámicamente
                display={{ base: 'none', md: 'block' }} 
            >
                <Sidebar userRole={userRole} handleLogout={handleLogout} /> 
            </Box>

            {/* 2. Contenedor Principal (Contenido y Header) */}
            <Box 
                flex="1" 
                ml={{ base: 0, md: SIDEBAR_WIDTH }} 
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
                    {/* Pasar el email y la función de logout al Header */}
                    <Header 
                        userEmail={userEmail} 
                        userRole={userRole} 
                        handleLogout={handleLogout} 
                    />
                </Box>

                {/* 4. Área de Contenido (Las vistas que se cargan) */}
                <Box as="main" p={6}>
                    {children}
                </Box>
            </Box>
        </Flex>
    );
}
