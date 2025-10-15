import { 
    Box, Heading, Text, Button, Table, Thead, Tbody, Tr, Th, Td, TableContainer, 
    useToast, Flex, Tag, Badge
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { FiCalendar, FiCheckCircle, FiXCircle } from 'react-icons/fi';
// Importar el servicio simulado (se crearía un 'vacationService.js' real)

// Datos simulados para llenar la tabla
const mockVacationRequests = [
    { id: 101, name: 'Alejandro Pérez', startDate: '2025-01-15', endDate: '2025-01-20', days: 5, status: 'Pendiente' },
    { id: 102, name: 'Carla Soto', startDate: '2025-02-10', endDate: '2025-02-17', days: 7, status: 'Aprobada' },
    { id: 103, name: 'Roberto Gómez', startDate: '2025-03-01', endDate: '2025-03-03', days: 3, status: 'Rechazada' },
    { id: 104, name: 'Sofía Reyes', startDate: '2025-04-22', endDate: '2025-04-26', days: 4, status: 'Aprobada' },
];

export default function VacationListView() {
    const toast = useToast();
    const [requests, setRequests] = useState(mockVacationRequests);
    const [isLoading, setIsLoading] = useState(false);
    
    // Función para simular el cambio de estado (Aprobar/Rechazar)
    const handleUpdateStatus = (id, newStatus) => {
        setIsLoading(true);
        // En una app real, aquí llamarías a la API para actualizar el estado
        setTimeout(() => {
            const updatedRequests = requests.map(req => 
                req.id === id ? { ...req, status: newStatus } : req
            );
            setRequests(updatedRequests);
            setIsLoading(false);

            toast({
                title: 'Solicitud Actualizada',
                description: `La solicitud de ${updatedRequests.find(r => r.id === id)?.name} ha sido ${newStatus.toLowerCase()}.`,
                status: newStatus === 'Aprobada' ? 'success' : 'warning',
                duration: 3000,
                isClosable: true,
            });

        }, 500);
    };

    // Función auxiliar para renderizar el color del Badge según el estado
    const getStatusBadge = (status) => {
        switch (status) {
            case 'Aprobada':
                return <Badge colorScheme="green">{status}</Badge>;
            case 'Rechazada':
                return <Badge colorScheme="red">{status}</Badge>;
            case 'Pendiente':
            default:
                return <Badge colorScheme="orange">{status}</Badge>;
        }
    };

    return (
        <Box p={5}>
            <Flex justify="space-between" align="center" mb={6}>
                <Box>
                    <Heading as="h1" size="xl" color="teal.700" display="flex" alignItems="center">
                        <FiCalendar style={{ marginRight: '10px' }} />
                        Gestión de Vacaciones
                    </Heading>
                    <Text mt={2} color="gray.600">
                        Visualización y gestión de las solicitudes de días libres del personal.
                    </Text>
                </Box>
                {/* Botón de ejemplo para futuras funcionalidades */}
                <Button
                    colorScheme="teal"
                    variant="outline"
                    onClick={() => toast({ title: 'Resumen Anual', description: 'Funcionalidad de resumen no implementada.', status: 'info', duration: 3000 })}
                >
                    Ver Calendario
                </Button>
            </Flex>

            <TableContainer 
                bg="white" 
                shadow="xl" 
                rounded="lg" 
                p={4}
            >
                <Table variant="simple" size="md">
                    <Thead bg="teal.50">
                        <Tr>
                            <Th>ID</Th>
                            <Th>Participante</Th>
                            <Th>Fecha de Inicio</Th>
                            <Th>Fecha de Fin</Th>
                            <Th isNumeric>Días Solicitados</Th>
                            <Th>Estado</Th>
                            <Th>Acciones</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {requests.map((req) => (
                            <Tr key={req.id} _hover={{ bg: 'gray.50' }}>
                                <Td>{req.id}</Td>
                                <Td fontWeight="bold">{req.name}</Td>
                                <Td>{req.startDate}</Td>
                                <Td>{req.endDate}</Td>
                                <Td isNumeric>
                                    <Tag colorScheme="blue">{req.days}</Tag>
                                </Td>
                                <Td>{getStatusBadge(req.status)}</Td>
                                <Td>
                                    {req.status === 'Pendiente' ? (
                                        <Flex gap={2}>
                                            <Button 
                                                size="sm" 
                                                leftIcon={<FiCheckCircle />} 
                                                colorScheme="green"
                                                onClick={() => handleUpdateStatus(req.id, 'Aprobada')}
                                                isLoading={isLoading}
                                            >
                                                Aprobar
                                            </Button>
                                            <Button 
                                                size="sm" 
                                                leftIcon={<FiXCircle />} 
                                                colorScheme="red"
                                                variant="outline"
                                                onClick={() => handleUpdateStatus(req.id, 'Rechazada')}
                                                isLoading={isLoading}
                                            >
                                                Rechazar
                                            </Button>
                                        </Flex>
                                    ) : (
                                        <Text fontSize="sm" color="gray.500">
                                            Revisado
                                        </Text>
                                    )}
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
}
