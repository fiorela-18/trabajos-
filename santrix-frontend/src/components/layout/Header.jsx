import React from 'react';
import { 
    Box, Flex, Text, IconButton, InputGroup, InputLeftElement, Input, Menu, MenuButton, MenuList, MenuItem 
} from '@chakra-ui/react';
import { FiSearch, FiBell, FiUser, FiSettings } from 'react-icons/fi';

// Nueva paleta de colores
const AZUL_MARINO = "#0A192F";
const ROJO_VINO = "#800020";
const GRIS = "#B0B0B0";
const BLANCO = "#FFFFFF";

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
            bg={BLANCO}
            align="center"
            justify="space-between"
            p={4}
            borderBottom={`1px solid ${GRIS}`}
            boxShadow="sm"
        >
            {/* Título Principal */}
            <Text fontSize="lg" fontWeight="extrabold" color={AZUL_MARINO}>
                Gestión empresarial SANTRIX
            </Text>

            <Flex align="center">
                {/* Barra de Búsqueda */}
                <InputGroup w="300px" mr={4}>
                    <InputLeftElement pointerEvents="none" children={<FiSearch color={GRIS} />} />
                    <Input 
                        type="text" 
                        placeholder="Buscar empleados, proyectos..." 
                        rounded="lg" 
                        bg="gray.50" 
                        border={`1px solid ${GRIS}`}
                        _focus={{ borderColor: ROJO_VINO, boxShadow: `0 0 0 1px ${ROJO_VINO}` }}
                        color={AZUL_MARINO}
                    />
                </InputGroup>

                {/* Notificaciones */}
                <IconButton
                    icon={<FiBell />}
                    aria-label="Notificaciones"
                    size="md"
                    variant="ghost"
                    rounded="full"
                    color={AZUL_MARINO}
                    position="relative"
                    mr={3}
                    _hover={{ bg: 'rgba(128, 0, 32, 0.1)', color: ROJO_VINO }}
                >
                    <Box as="span" position="absolute" top="8px" right="8px" h="8px" w="8px" bg={ROJO_VINO} rounded="full" fontSize="xs" border={`1px solid ${BLANCO}`}/>
                </IconButton>

                {/* Perfil (Solo opciones de Configuración/Perfil) */}
                <Menu>
                    <MenuButton as={IconButton} 
                        icon={<FiUser />} 
                        aria-label="Perfil de Usuario"
                        size="lg"
                        bg={AZUL_MARINO}
                        color={BLANCO}
                        rounded="full"
                        _hover={{ bg: ROJO_VINO }}
                        transition="all 0.2s"
                    />
                    <MenuList border={`1px solid ${GRIS}`} boxShadow="lg">
                        <MenuItem fontWeight="bold" color={AZUL_MARINO} _hover={{ bg: 'rgba(128, 0, 32, 0.1)' }}>
                            {userEmail}
                        </MenuItem>
                        <MenuItem icon={<FiUser />} color={AZUL_MARINO} _hover={{ bg: 'rgba(128, 0, 32, 0.1)' }}>
                            Ver Perfil
                        </MenuItem>
                        <MenuItem icon={<FiSettings />} color={AZUL_MARINO} _hover={{ bg: 'rgba(128, 0, 32, 0.1)' }}>
                            Configuración
                        </MenuItem>
                        {/* Nota: La lógica de Cerrar Sesión va en el Sidebar */}
                    </MenuList>
                </Menu>
            </Flex>
        </Flex>
    );
}