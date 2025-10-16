import React from 'react';
import { 
    Box, Flex, Text, IconButton, InputGroup, InputLeftElement, Input, Menu, MenuButton, MenuList, MenuItem 
} from '@chakra-ui/react';
import { FiSearch, FiBell, FiUser, FiSettings } from 'react-icons/fi';

// Colores definidos en el DashboardLayout
const PRIMARY_COLOR = "teal.500"; 
const HEADER_BG = "white"; 

/**
 * Header (Barra Superior) - Contiene la Búsqueda y Perfil.
 * @param {object} props - Propiedades del componente.
 * @param {string} props.userEmail - Email del usuario logueado.
 */
export default function Header({ userEmail }) {
    return (
        <Flex 
            w="full" 
            h="70px" 
            bg={HEADER_BG}
            align="center"
            justify="space-between"
            p={4}
            borderBottom="1px solid #E2E8F0"
        >
            {/* Título Principal */}
            <Text fontSize="lg" fontWeight="extrabold" color="#2C3E50">
                Recursos humanos de Santrix
            </Text>

            <Flex align="center">
                {/* Barra de Búsqueda */}
                <InputGroup w="300px" mr={4}>
                    <InputLeftElement pointerEvents="none" children={<FiSearch color="gray.300" />} />
                    <Input 
                        type="text" 
                        placeholder="Buscar empleados, proyectos..." 
                        rounded="lg" 
                        bg="gray.50" 
                        border="none"
                        _focus={{ ring: 1, ringColor: PRIMARY_COLOR }}
                    />
                </InputGroup>

                {/* Notificaciones */}
                <IconButton
                    icon={<FiBell />}
                    aria-label="Notificaciones"
                    size="md"
                    variant="ghost"
                    rounded="full"
                    color="gray.600"
                    position="relative"
                    mr={3}
                    _hover={{ bg: 'gray.100' }}
                >
                    <Box as="span" position="absolute" top="8px" right="8px" h="8px" w="8px" bg="red.500" rounded="full" fontSize="xs" border="1px solid white"/>
                </IconButton>

                {/* Perfil (Solo opciones de Configuración/Perfil) */}
                <Menu>
                    <MenuButton as={IconButton} 
                        icon={<FiUser />} 
                        aria-label="Perfil de Usuario"
                        size="lg"
                        bg="#2C3E50"
                        color="white"
                        rounded="full"
                        _hover={{ bg: PRIMARY_COLOR }}
                    />
                    <MenuList>
                        <MenuItem fontWeight="bold">{userEmail}</MenuItem>
                        <MenuItem icon={<FiUser />}>Ver Perfil</MenuItem>
                        <MenuItem icon={<FiSettings />}>Configuración</MenuItem>
                        {/* Nota: La lógica de Cerrar Sesión va en el Sidebar */}
                    </MenuList>
                </Menu>
            </Flex>
        </Flex>
    );
}
