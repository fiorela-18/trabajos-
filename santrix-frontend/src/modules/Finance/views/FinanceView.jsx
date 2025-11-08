import {
  Box, Heading, Text, SimpleGrid, Flex, Icon, HStack, Card, CardBody, VStack,
  Alert, AlertIcon, Progress, Stat, StatLabel, StatNumber, StatHelpText, Grid, GridItem,
  Badge, Tag, Table, Thead, Tbody, Tr, Th, Td, Input, InputGroup, InputLeftElement,
  Button, Menu, MenuButton, MenuList, MenuItem, IconButton
} from '@chakra-ui/react';
import React from 'react';
import {
  FiDollarSign, FiTrendingUp, FiTrendingDown, FiCreditCard, FiAlertCircle,
  FiServer, FiGlobe, FiUsers, FiFileText, FiShoppingCart, FiZap, FiCode,
  FiCalendar, FiCheck, FiX, FiEye, FiMoreVertical, FiSearch, FiPlus, FiFilter
} from 'react-icons/fi';

const PanelFinanciero = () => {
  // Datos de ejemplo
  const hostingData = [
    { id: 1, nombre: 'Servidor Principal', proveedor: 'AWS', costo: '$450/mes', estado: 'Activo', vencimiento: '15 Feb 2024' },
    { id: 2, nombre: 'Base de Datos', proveedor: 'Google Cloud', costo: '$320/mes', estado: 'Activo', vencimiento: '20 Feb 2024' },
    { id: 3, nombre: 'CDN', proveedor: 'Cloudflare', costo: '$85/mes', estado: 'Activo', vencimiento: '10 Mar 2024' }
  ];

  const dominiosData = [
    { id: 1, dominio: 'empresa.com', proveedor: 'GoDaddy', costo: '$15/año', estado: 'Activo', vencimiento: '30 Jun 2024' },
    { id: 2, dominio: 'app-empresa.com', proveedor: 'Namecheap', costo: '$12/año', estado: 'Activo', vencimiento: '15 Ago 2024' },
    { id: 3, dominio: 'api-empresa.com', proveedor: 'Google Domains', costo: '$18/año', estado: 'Por vencer', vencimiento: '05 Feb 2024' }
  ];

  const proveedoresData = [
    { id: 1, nombre: 'Microsoft', servicio: 'Office 365', costo: '$240/mes', estado: 'Activo' },
    { id: 2, nombre: 'Slack', servicio: 'Workspace Pro', costo: '$85/mes', estado: 'Activo' },
    { id: 3, nombre: 'Adobe', servicio: 'Creative Cloud', costo: '$120/mes', estado: 'Activo' },
    { id: 4, nombre: 'GitHub', servicio: 'Team Plan', costo: '$45/mes', estado: 'Activo' }
  ];

  const serviciosData = [
    { id: 1, nombre: 'VPN Corporativa', costo: '$65/mes', categoria: 'Seguridad', estado: 'Activo' },
    { id: 2, nombre: 'Backup Cloud', costo: '$95/mes', categoria: 'Infraestructura', estado: 'Activo' },
    { id: 3, nombre: 'Monitoring', costo: '$75/mes', categoria: 'DevOps', estado: 'Activo' },
    { id: 4, nombre: 'CRM', costo: '$180/mes', categoria: 'Productividad', estado: 'Activo' }
  ];

  return (
    <Box 
      p={6} 
      bg="gray.50" 
      minH="100%"
      maxW="100%"  // 👈 Limita el ancho al viewport
      overflowX="hidden"  // 👈 Elimina el scroll horizontal
    >
      {/* Header */}
      <Box mb={8}>
        <Heading as="h1" size="xl" color="gray.700" mb={2}>
          Finanzas y Recursos IT
        </Heading>
        <Text color="gray.600" fontSize="lg">
          Control financiero, infraestructura y gastos operativos
        </Text>
      </Box>

      {/* BARRA DE NAVEGACIÓN Y BÚSQUEDA */}
      <Card borderRadius="xl" boxShadow="sm" border="1px" borderColor="gray.100" mb={8}>
        <CardBody p={4}>
          <Flex direction={{ base: "column", md: "row" }} gap={4} align={{ base: "stretch", md: "center" }}>
            {/* Barra de búsqueda */}
            <InputGroup flex="1" maxW={{ base: "100%", md: "300px" }}>
              <InputLeftElement pointerEvents="none">
                <Icon as={FiSearch} color="gray.400" />
              </InputLeftElement>
              <Input 
                placeholder="Buscar servicios, proveedores, dominios..." 
                borderRadius="lg"
                bg="white"
              />
            </InputGroup>

            {/* Filtros y acciones */}
            <HStack spacing={3} flex="1" justify={{ base: "stretch", md: "flex-end" }}>
              <Menu>
                <MenuButton 
                  as={Button} 
                  leftIcon={<FiFilter />}
                  variant="outline"
                  size="md"
                  flex={{ base: "1", md: "none" }}
                >
                  Filtros
                </MenuButton>
                <MenuList>
                  <MenuItem>Todos los servicios</MenuItem>
                  <MenuItem>Por vencer</MenuItem>
                  <MenuItem>Activos</MenuItem>
                  <MenuItem>Inactivos</MenuItem>
                </MenuList>
              </Menu>

              <Menu>
                <MenuButton 
                  as={Button} 
                  leftIcon={<FiCalendar />}
                  variant="outline"
                  size="md"
                  flex={{ base: "1", md: "none" }}
                >
                  Período
                </MenuButton>
                <MenuList>
                  <MenuItem>Este mes</MenuItem>
                  <MenuItem>Últimos 3 meses</MenuItem>
                  <MenuItem>Este año</MenuItem>
                  <MenuItem>Personalizado</MenuItem>
                </MenuList>
              </Menu>

              <Button 
                leftIcon={<FiPlus />} 
                colorScheme="blue"
                size="md"
                flex={{ base: "1", md: "none" }}
              >
                Nuevo Servicio
              </Button>
            </HStack>
          </Flex>
        </CardBody>
      </Card>

      {/* Alerta de vencimientos */}
      <Alert status="warning" borderRadius="lg" mb={8}>
        <AlertIcon />
        <Text fontWeight="semibold">
          Próximos vencimientos: 5 pagos en los próximos 15 días - Total: $1,817
        </Text>
      </Alert>

      {/* Grid de métricas principales - REDUCIDO */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={8}>
        {/* Ingresos */}
        <Box w="100%" maxW="100px" mx="auto">
          <Card borderRadius="xl" boxShadow="sm" border="1px" borderColor="gray.100">
            <CardBody p={5}>
              <Stat>
                <StatLabel color="gray.500" fontSize="sm" fontWeight="medium">
                  Ingresos
                </StatLabel>
                <StatNumber fontSize="xl" fontWeight="bold" color="gray.800">
                  $125 mil
                </StatNumber>
                <StatHelpText color="green.500" fontSize="sm" fontWeight="medium">
                  <Icon as={FiTrendingUp} mr={1} />
                  1.82%
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </Box>

        {/* Gastos */}
        <Box w="100%" maxW="200px" mx="auto">
          <Card borderRadius="xl" boxShadow="sm" border="1px" borderColor="gray.100">
            <CardBody p={5}>
              <Stat>
                <StatLabel color="gray.500" fontSize="sm" fontWeight="medium">
                  Gastos
                </StatLabel>
                <StatNumber fontSize="xl" fontWeight="bold" color="gray.800">
                  $87.5K
                </StatNumber>
                <StatHelpText color="red.500" fontSize="sm" fontWeight="medium">
                  <Icon as={FiTrendingUp} mr={1} />
                  1.41%
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </Box>

        {/* Balance */}
        <Box w="100%" maxW="200px" mx="auto">
          <Card borderRadius="xl" boxShadow="sm" border="1px" borderColor="gray.100">
            <CardBody p={5}>
              <Stat>
                <StatLabel color="gray.500" fontSize="sm" fontWeight="medium">
                  Balance
                </StatLabel>
                <StatNumber fontSize="xl" fontWeight="bold" color="gray.800">
                  $37.5K
                </StatNumber>
                <StatHelpText color="gray.600" fontSize="sm">
                  Utilidad Neta
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </Box>

        {/* Flujo de Caja */}
        <Box w="100%" maxW="200px" mx="auto">
          <Card borderRadius="xl" boxShadow="sm" border="1px" borderColor="gray.100">
            <CardBody p={5}>
              <Stat>
                <StatLabel color="gray.500" fontSize="sm" fontWeight="medium">
                  Flujo Caja
                </StatLabel>
                <StatNumber fontSize="xl" fontWeight="bold" color="gray.800">
                  $68 mil
                </StatNumber>
                <StatHelpText color="gray.600" fontSize="sm">
                  Disponible
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </Box>

        {/* Por Pagar */}
        <Box w="100%" maxW="200px" mx="auto">
          <Card borderRadius="xl" boxShadow="sm" border="1px" borderColor="gray.100">
            <CardBody p={5}>
              <Stat>
                <StatLabel color="gray.500" fontSize="sm" fontWeight="medium">
                  Por Pagar
                </StatLabel>
                <StatNumber fontSize="xl" fontWeight="bold" color="gray.800">
                  $12.8K
                </StatNumber>
                <StatHelpText color="gray.600" fontSize="sm">
                  5 conceptos
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </Box>

        {/* Presupuesto */}
        <Box w="100%" maxW="200px" mx="auto">
          <Card borderRadius="xl" boxShadow="sm" border="1px" borderColor="gray.100">
            <CardBody p={5}>
              <Stat>
                <StatLabel color="gray.500" fontSize="sm" fontWeight="medium">
                  Presupuesto
                </StatLabel>
                <StatNumber fontSize="xl" fontWeight="bold" color="gray.800">
                  82%
                </StatNumber>
                <StatHelpText color="gray.600" fontSize="sm">
                  Utilizado
                </StatHelpText>
              </Stat>
              <Progress value={82} colorScheme="blue" size="sm" mt={2} borderRadius="full" />
            </CardBody>
          </Card>
        </Box>
      </SimpleGrid>

      {/* Sección de gráficos y distribución */}
      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8} mb={8}>
        {/* Tendencia Financiera */}
        <Card borderRadius="xl" boxShadow="sm" border="1px" borderColor="gray.100">
          <CardBody p={6}>
            <Heading as="h3" size="md" color="gray.800" mb={4}>
              Tendencia Financiera Mensual
            </Heading>
            <Box 
              bgGradient="linear(to-r, blue.500, green.500)" 
              borderRadius="lg" 
              height="200px" 
              display="flex" 
              alignItems="center" 
              justifyContent="center"
              mb={4}
            >
              <Text color="white" fontWeight="semibold">
                Gráfico de Tendencia
              </Text>
            </Box>
            <HStack justify="center" spacing={6}>
              <HStack>
                <Box w={3} h={3} bg="blue.500" borderRadius="full" />
                <Text color="gray.600" fontSize="sm">INGRESOS</Text>
              </HStack>
              <HStack>
                <Box w={3} h={3} bg="red.500" borderRadius="full" />
                <Text color="gray.600" fontSize="sm">GASTOS</Text>
              </HStack>
              <HStack>
                <Box w={3} h={3} bg="green.500" borderRadius="full" />
                <Text color="gray.600" fontSize="sm">BALANCE</Text>
              </HStack>
            </HStack>
          </CardBody>
        </Card>

        {/* Distribución de Gastos */}
        <Card borderRadius="xl" boxShadow="sm" border="1px" borderColor="gray.100">
          <CardBody p={6}>
            <Heading as="h3" size="md" color="gray.800" mb={4}>
              Distribución de Gastos
            </Heading>
            <VStack spacing={4} align="stretch">
              <Flex justify="space-between" align="center">
                <HStack>
                  <Box w={4} h={4} bg="purple.500" borderRadius="md" />
                  <Text color="gray.700">Infraestructura IT</Text>
                </HStack>
                <Text fontWeight="semibold" color="gray.800">32%</Text>
              </Flex>
              <Flex justify="space-between" align="center">
                <HStack>
                  <Box w={4} h={4} bg="blue.500" borderRadius="md" />
                  <Text color="gray.700">Nómina y Recursos</Text>
                </HStack>
                <Text fontWeight="semibold" color="gray.800">28%</Text>
              </Flex>
              <Flex justify="space-between" align="center">
                <HStack>
                  <Box w={4} h={4} bg="green.500" borderRadius="md" />
                  <Text color="gray.700">Licencias Software</Text>
                </HStack>
                <Text fontWeight="semibold" color="gray.800">18%</Text>
              </Flex>
              <Flex justify="space-between" align="center">
                <HStack>
                  <Box w={4} h={4} bg="yellow.500" borderRadius="md" />
                  <Text color="gray.700">Servicios Cloud</Text>
                </HStack>
                <Text fontWeight="semibold" color="gray.800">13%</Text>
              </Flex>
              <Flex justify="space-between" align="center">
                <HStack>
                  <Box w={4} h={4} bg="red.500" borderRadius="md" />
                  <Text color="gray.700">Oficina y Marketing</Text>
                </HStack>
                <Text fontWeight="semibold" color="gray.800">9%</Text>
              </Flex>
            </VStack>
          </CardBody>
        </Card>
      </Grid>

      {/* Sección de Servicios IT */}
      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8} mb={8}>
        {/* Hosting y Servidores */}
        <Card borderRadius="xl" boxShadow="sm" border="1px" borderColor="gray.100">
          <CardBody p={6}>
            <Flex justify="space-between" align="center" mb={4}>
              <Heading as="h3" size="md" color="gray.800">
                <Icon as={FiServer} mr={2} />
                Hosting & Servidores
              </Heading>
              <Badge colorScheme="green" fontSize="sm">
                3 Activos
              </Badge>
            </Flex>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Nombre</Th>
                  <Th>Proveedor</Th>
                  <Th isNumeric>Costo</Th>
                  <Th>Estado</Th>
                </Tr>
              </Thead>
              <Tbody>
                {hostingData.map((item) => (
                  <Tr key={item.id}>
                    <Td fontWeight="medium">{item.nombre}</Td>
                    <Td>{item.proveedor}</Td>
                    <Td isNumeric>{item.costo}</Td>
                    <Td>
                      <Badge colorScheme="green" size="sm">
                        {item.estado}
                      </Badge>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>

        {/* Dominios */}
        <Card borderRadius="xl" boxShadow="sm" border="1px" borderColor="gray.100">
          <CardBody p={6}>
            <Flex justify="space-between" align="center" mb={4}>
              <Heading as="h3" size="md" color="gray.800">
                <Icon as={FiGlobe} mr={2} />
                Dominios
              </Heading>
              <Badge colorScheme="orange" fontSize="sm">
                1 Por vencer
              </Badge>
            </Flex>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Dominio</Th>
                  <Th>Proveedor</Th>
                  <Th isNumeric>Costo</Th>
                  <Th>Vencimiento</Th>
                </Tr>
              </Thead>
              <Tbody>
                {dominiosData.map((item) => (
                  <Tr key={item.id}>
                    <Td fontWeight="medium">{item.dominio}</Td>
                    <Td>{item.proveedor}</Td>
                    <Td isNumeric>{item.costo}</Td>
                    <Td>
                      <Badge 
                        colorScheme={item.estado === 'Por vencer' ? 'red' : 'green'} 
                        size="sm"
                      >
                        {item.vencimiento}
                      </Badge>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      </Grid>

      {/* Sección de Proveedores y Servicios */}
      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8}>
        {/* Proveedores de Software */}
        <Card borderRadius="xl" boxShadow="sm" border="1px" borderColor="gray.100">
          <CardBody p={6}>
            <Flex justify="space-between" align="center" mb={4}>
              <Heading as="h3" size="md" color="gray.800">
                <Icon as={FiShoppingCart} mr={2} />
                Proveedores Software
              </Heading>
              <Badge colorScheme="blue" fontSize="sm">
                4 Activos
              </Badge>
            </Flex>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Proveedor</Th>
                  <Th>Servicio</Th>
                  <Th isNumeric>Costo</Th>
                  <Th>Estado</Th>
                </Tr>
              </Thead>
              <Tbody>
                {proveedoresData.map((item) => (
                  <Tr key={item.id}>
                    <Td fontWeight="medium">{item.nombre}</Td>
                    <Td>{item.servicio}</Td>
                    <Td isNumeric>{item.costo}</Td>
                    <Td>
                      <Badge colorScheme="green" size="sm">
                        {item.estado}
                      </Badge>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>

        {/* Servicios Adicionales */}
        <Card borderRadius="xl" boxShadow="sm" border="1px" borderColor="gray.100">
          <CardBody p={6}>
            <Flex justify="space-between" align="center" mb={4}>
              <Heading as="h3" size="md" color="gray.800">
                <Icon as={FiZap} mr={2} />
                Servicios Adicionales
              </Heading>
              <Badge colorScheme="purple" fontSize="sm">
                4 Activos
              </Badge>
            </Flex>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Servicio</Th>
                  <Th>Categoría</Th>
                  <Th isNumeric>Costo</Th>
                  <Th>Estado</Th>
                </Tr>
              </Thead>
              <Tbody>
                {serviciosData.map((item) => (
                  <Tr key={item.id}>
                    <Td fontWeight="medium">{item.nombre}</Td>
                    <Td>
                      <Tag colorScheme="blue" size="sm">
                        {item.categoria}
                      </Tag>
                    </Td>
                    <Td isNumeric>{item.costo}</Td>
                    <Td>
                      <Badge colorScheme="green" size="sm">
                        {item.estado}
                      </Badge>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      </Grid>
    </Box>
  );
};

export default PanelFinanciero;