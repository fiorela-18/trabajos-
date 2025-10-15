import { 
    Flex, Box, IconButton, Menu, MenuButton, 
    MenuList, MenuItem, MenuDivider, Text, useToast, // <-- useToast es clave
} from '@chakra-ui/react';
import { FiLogOut, FiSettings, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom'; // <-- useNavigate es clave
import React from 'react';

export default function Header() { 
    const navigate = useNavigate();
    const toast = useToast();

    const handleLogout = () => {
        // 1. Limpiar la sesión
        localStorage.removeItem('user_auth');
        
        toast({
            title: 'Sesión Finalizada.',
            description: 'Has cerrado sesión correctamente.',
            status: 'info',
            duration: 3000,
            isClosable: true,
        });

        // 2. Redirigir al Login y limpiar el historial
        navigate('/login', { replace: true });
    };

    return (
        <Flex 
            px="4" 
            h="16" 
            alignItems="center" 
            justifyContent="space-between" 
        >
            {/* IZQUIERDA: Logo o Título */}
            <Box>
                <Text fontSize="xl" fontWeight="bold" color="teal.600">Santrix HR</Text>
            </Box>

            {/* DERECHA: Opciones de Usuario / Logout */}
            <Flex alignItems={'center'}>
                <Menu>
                    <MenuButton 
                        py={2} 
                        transition="all 0.3s" 
                        _focus={{ boxShadow: 'none' }}
                        // Aquí podrías usar un Avatar si lo tuvieras importado
                    >
                        <Text fontWeight="medium">admin@santrix.com</Text>
                    </MenuButton>
                    <MenuList 
                        bg="white" 
                        borderColor="gray.200"
                    >
                        <MenuItem icon={<FiUser />}>Perfil</MenuItem>
                        <MenuItem icon={<FiSettings />}>Configuración</MenuItem>
                        <MenuDivider />
                        
                        {/* BOTÓN DE CERRAR SESIÓN */}
                        <MenuItem 
                            icon={<FiLogOut />} 
                            onClick={handleLogout} 
                            color="red.500"
                        >
                            Cerrar Sesión
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Flex>
    );
}