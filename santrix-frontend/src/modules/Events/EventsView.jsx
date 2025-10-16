import { 
  Box, Heading, Text, VStack, Button, Flex, Spacer, SimpleGrid, 
  Card, CardBody, CardHeader, Tag, useColorModeValue, Icon
} from '@chakra-ui/react';
import React from 'react';
import { FiBell, FiGift, FiMapPin, FiCalendar } from 'react-icons/fi';

// Datos de eventos de ejemplo
const mockEvents = [
  { 
    id: 1, 
    title: 'Celebración Anual de Logros', 
    date: '2025-12-15', 
    time: '18:00', 
    location: 'Salón Principal "El Faro"', 
    type: 'Fiesta',
    description: 'Noche de gala para reconocer el esfuerzo de todo el equipo durante el año.',
  },
  { 
    id: 2, 
    title: 'Webinar: Liderazgo Ágil', 
    date: '2025-10-28', 
    time: '10:00', 
    location: 'Plataforma Zoom', 
    type: 'Capacitación',
    description: 'Sesión virtual sobre nuevas metodologías de gestión de equipos.',
  },
  { 
    id: 3, 
    title: 'Día del Empleado Santrix', 
    date: '2025-11-05', 
    time: 'Todo el día', 
    location: 'Oficinas Centrales', 
    type: 'Celebración',
    description: 'Desayuno especial, juegos y sorpresas en la oficina.',
  },
];

const EventCard = ({ event }) => (
    <Card 
        shadow="lg" 
        borderRadius="xl" 
        bg={useColorModeValue('white', 'gray.700')}
        transition="transform 0.3s"
        _hover={{ transform: 'translateY(-5px)', shadow: '2xl' }}
    >
        <CardHeader pb={0}>
            <Flex align="center" justify="space-between">
                <Heading size="md" color="teal.600">{event.title}</Heading>
                <Tag colorScheme={event.type === 'Fiesta' ? 'purple' : event.type === 'Celebración' ? 'orange' : 'teal'}>
                    {event.type}
                </Tag>
            </Flex>
        </CardHeader>
        <CardBody pt={2}>
            <VStack align="start" spacing={2} fontSize="sm" color="gray.600">
                <Flex align="center">
                    <Icon as={FiCalendar} mr={2} color="teal.500" />
                    <Text>
                        <Text as="span" fontWeight="bold">Fecha:</Text> {event.date} a las {event.time}
                    </Text>
                </Flex>
                <Flex align="center">
                    <Icon as={FiMapPin} mr={2} color="teal.500" />
                    <Text>
                        <Text as="span" fontWeight="bold">Lugar:</Text> {event.location}
                    </Text>
                </Flex>
                <Text mt={2} fontStyle="italic">{event.description}</Text>
            </VStack>
            <Flex justify="flex-end" mt={4}>
                <Button size="sm" colorScheme="teal" variant="outline">
                    Ver Detalles
                </Button>
            </Flex>
        </CardBody>
    </Card>
);


export default function EventsView() {
  
  return (
    <Box p={6}>
      <Flex mb={8} align="center">
        <Heading size="lg" display="flex" alignItems="center">
          <FiBell style={{ marginRight: '10px' }} />
          Próximos Eventos Corporativos
        </Heading>
        <Spacer />
        {/* Este botón podría ser visible solo para Administradores */}
        <Button leftIcon={<FiGift />} colorScheme="teal">
            Crear Nuevo Evento
        </Button>
      </Flex>

      <Text mb={6} color="gray.600">
        Mantente al tanto de las actividades y celebraciones importantes de Santrix.
      </Text>

      <SimpleGrid minChildWidth="300px" spacing="20px">
        {mockEvents.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
        {mockEvents.length === 0 && (
            <Box p={5} textAlign="center" border="1px" borderColor="gray.200" borderRadius="lg" colSpan={3}>
                <Text fontSize="lg" color="gray.500">No hay eventos próximos registrados.</Text>
            </Box>
        )}
      </SimpleGrid>
    </Box>
  );
}
