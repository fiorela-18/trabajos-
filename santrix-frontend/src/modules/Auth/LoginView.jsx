import { 
    Box, Flex, Heading, Text, VStack, FormControl, FormLabel, Input, Button, useToast, Divider, Select,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure
} from '@chakra-ui/react';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogIn, FiUserPlus } from 'react-icons/fi'; // CORREGIDO: Usando react-icons/fi en lugar de lucide-react

// Paleta de Colores Matrix
const MATRIX_GREEN = "#00FF41"; // El verde icónico
const MATRIX_DARK = "#000000"; // Fondo Negro
const CARD_BG = "rgba(10, 10, 10, 0.9)"; // Fondo de la tarjeta semi-transparente
const FONT_SIZE = 16; // Tamaño de la letra en el Canvas

// Estilos para el efecto de GLITCH
const matrixStyles = `
    /* Efecto de GLITCH sutil */
    @keyframes text-glitch {
        0% { text-shadow: 0.05em 0 0 ${MATRIX_GREEN}, -0.05em -0.025em 0 rgba(0,255,65,0.7); }
        15% { text-shadow: 0 0.025em 0 ${MATRIX_GREEN}, -0.025em 0 0 rgba(0,255,65,0.7); }
        30% { text-shadow: -0.05em -0.015em 0 ${MATRIX_GREEN}, 0.025em 0 0 rgba(0,255,65,0.7); }
        50% { text-shadow: 0 0 0 ${MATRIX_GREEN}, 0 0 0 rgba(0,255,65,0.7); }
        70% { text-shadow: 0.025em 0.05em 0 ${MATRIX_GREEN}, -0.05em -0.05em 0 rgba(0,255,65,0.7); }
        100% { text-shadow: 0 0 0 ${MATRIX_GREEN}, 0 0 0 rgba(0,255,65,0.7); }
    }
    .glitch-text {
        animation: text-glitch 5s steps(20) infinite;
        text-shadow: 0 0 5px ${MATRIX_GREEN};
    }

    /* Estilo para el canvas */
    #matrix-canvas {
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
    }
`;


export default function LoginView() {
    // Aunque usamos useNavigate para consistencia, forzaremos la recarga al final
    const navigate = useNavigate(); 
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure(); 
    
    // Referencia al elemento Canvas
    const canvasRef = useRef(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(''); 
    const [quickRole, setQuickRole] = useState(''); 
    const [isLoading, setIsLoading] = useState(false);
    
    // Estado para gestionar el efecto de resplandor del borde al pasar el ratón
    const [isHovered, setIsHovered] = useState(false);

    // **********************************************
    // EFECTO DE LLUVIA DE CÓDIGO MATRIX EN CANVAS
    // **********************************************
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return; // Asegurar que el canvas existe
        
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        let width, height, columns;
        let drops;
        // Caracteres aleatorios que caen
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%^&*()_+{}|:"<>?~';

        const initializeCanvas = () => {
            // Asegurar que el canvas ocupe toda la ventana
            width = window.innerWidth;
            height = window.innerHeight;
            
            // Ajustar el tamaño del Canvas a la ventana
            canvas.width = width;
            canvas.height = height;

            // Calcular el número de columnas basado en el tamaño de la fuente
            columns = Math.floor(width / FONT_SIZE);
            
            // Inicializar las "gotas" (la posición Y inicial de cada columna)
            drops = [];
            for (let i = 0; i < columns; i++) {
                drops[i] = 1; // Comienza en la primera fila
            }
        };

        const draw = () => {
            // Fondo ligeramente transparente para crear el efecto de "rastro"
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; 
            ctx.fillRect(0, 0, width, height);
            
            ctx.fillStyle = MATRIX_GREEN; // Color de la fuente
            ctx.font = `${FONT_SIZE}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                // Seleccionar un caracter aleatorio
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                
                // Dibujar el caracter en la posición (x, y)
                const x = i * FONT_SIZE;
                const y = drops[i] * FONT_SIZE;
                ctx.fillText(text, x, y);

                // Si la gota ha llegado al fondo, o aleatoriamente, reiníciala
                if (y * FONT_SIZE > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                
                // Mover la gota hacia abajo
                drops[i]++;
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        // Escucha cambios de tamaño de la ventana
        const handleResize = () => {
            cancelAnimationFrame(animationFrameId);
            initializeCanvas();
            draw();
        };

        // Inicialización
        initializeCanvas();
        draw();

        window.addEventListener('resize', handleResize);

        // Limpieza: detener la animación y el listener
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Se ejecuta solo una vez al montar el componente

    // **********************************************
    // LÓGICA DE AUTENTICACIÓN
    // **********************************************
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!email || !password || !role) {
            toast({ title: 'Campos incompletos.', description: 'Por favor, complete todos los campos.', status: 'warning', duration: 3000, isClosable: true });
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);

            let expectedRole = null;
            let success = false;
            
            // Credenciales de prueba
            if (email === 'admin@santrix.com' && password === '12345' && role === 'admin') {
                expectedRole = 'admin';
                success = true;
            } else if (email === 'user@santrix.com' && password === '12345' && role === 'participant') {
                expectedRole = 'participant';
                success = true;
            }

            if (success) {
                localStorage.setItem('user_auth', 'true');
                localStorage.setItem('user_role', expectedRole);
                localStorage.setItem('user_email', email); 
                
                toast({ title: `Bienvenido, ${expectedRole.toUpperCase()}.`, description: 'Inicio de sesión exitoso. Recargando la Matriz...', status: 'success', duration: 1500, isClosable: true });
                
                // FIX: Usar window.location.href para forzar la recarga
                setTimeout(() => {
                    window.location.href = '/dashboard'; 
                }, 1500); 
            } else {
                toast({ title: 'Error de acceso.', description: 'Credenciales o rol incorrectos.', status: 'error', duration: 3000, isClosable: true });
            }
        }, 1000); 
    };

    const handleQuickRegister = () => {
        if (!quickRole) {
            toast({ title: 'Selección Requerida', description: 'Por favor, elija un rol para simular el registro.', status: 'warning', duration: 3000, isClosable: true });
            return;
        }

        onClose(); 
        setIsLoading(true);
        
        const simulatedEmail = quickRole === 'admin' ? 'quick.admin@santrix.com' : 'quick.user@santrix.com';

        setTimeout(() => {
            setIsLoading(false);
            
            localStorage.setItem('user_auth', 'true');
            localStorage.setItem('user_role', quickRole);
            localStorage.setItem('user_email', simulatedEmail); 

            toast({
                title: 'Registro y Acceso Exitoso.',
                description: `Simulación de registro como ${quickRole.toUpperCase()}. Recargando la Matriz...`,
                status: 'success',
                duration: 1500,
                isClosable: true,
            });
            
            // FIX: Usar window.location.href para forzar la recarga
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1500);
        }, 1000);
    };


    return (
        // Contenedor principal con fondo negro
        <Flex 
            minH={'100vh'} 
            w={'100vw'} 
            align={'center'} 
            justify={'center'} 
            bg={MATRIX_DARK} // Fondo completamente negro
            position="relative"
        >
            {/* INYECTA ESTILOS CSS DEL EFECTO GLITCH Y CANVAS */}
            <style>{matrixStyles}</style>
            
            {/* ELEMENTO DE FONDO CON EL EFECTO DE CÓDIGO DINÁMICO (CANVAS) */}
            <canvas id="matrix-canvas" ref={canvasRef}></canvas>

            {/* Tarjeta de Login (Z-index 1 para estar sobre el fondo) */}
            <Box 
                maxW={'lg'} 
                w={'full'}
                bg={CARD_BG} // Fondo semi-transparente
                // Borde y sombra dinámica con pulso
                boxShadow={isHovered ? `0 0 30px 10px ${MATRIX_GREEN}` : `0 0 10px 3px ${MATRIX_GREEN}`} 
                border={`1px solid ${MATRIX_GREEN}`}
                rounded={'3xl'} 
                p={{ base: 8, md: 12 }} 
                my={12}
                position="relative" 
                zIndex={1}
                transition="box-shadow 0.3s ease-in-out" // Transición suave para el pulso del hover
                onMouseEnter={() => setIsHovered(true)} // Interacción
                onMouseLeave={() => setIsHovered(false)} // Interacción
            >
                <VStack spacing={8} align="center"> 
                    <Heading 
                        fontSize={'4xl'} 
                        textAlign={'center'} 
                        color={MATRIX_GREEN} 
                        mb={2}
                        // APLICA EL EFECTO GLITCH AL TÍTULO
                        className="glitch-text"
                        fontFamily="monospace" 
                    >
                        // INGRESO AL SISTEMA //
                    </Heading>
                    <Text fontSize={'lg'} color={MATRIX_GREEN} mb={4} textAlign="center">
                        La Matriz tiene tu respuesta. Inicia sesión.
                    </Text>
                    
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <VStack spacing={6}> 
                            {/* 1. Correo Electrónico */}
                            <FormControl id="email" isRequired>
                                <FormLabel fontSize="md" fontWeight="bold" color={MATRIX_GREEN}>
                                    Usuario (Correo Electrónico)
                                </FormLabel>
                                <Input 
                                    name="email"
                                    type="email" 
                                    placeholder="ejemplo@santrix.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} 
                                    size="lg"
                                    borderRadius="xl"
                                    bg="rgba(0, 0, 0, 0.5)" 
                                    color={MATRIX_GREEN} 
                                    borderColor={MATRIX_GREEN}
                                    _focus={{ borderColor: MATRIX_GREEN, boxShadow: `0 0 8px ${MATRIX_GREEN}` }}
                                />
                            </FormControl>
                            
                            {/* 2. Selección de Rol */}
                            <FormControl id="role" isRequired>
                                <FormLabel fontSize="md" fontWeight="bold" color={MATRIX_GREEN}>
                                    Identidad (Selecciona tu Rol)
                                </FormLabel>
                                <Select 
                                    placeholder="Elige tu rol..." 
                                    value={role} 
                                    onChange={(e) => setRole(e.target.value)}
                                    size="lg"
                                    borderRadius="xl"
                                    bg="rgba(0, 0, 0, 0.5)"
                                    color={MATRIX_GREEN}
                                    borderColor={MATRIX_GREEN}
                                    _focus={{ borderColor: MATRIX_GREEN, boxShadow: `0 0 8px ${MATRIX_GREEN}` }}
                                >
                                    <option value="admin" style={{ background: CARD_BG, color: MATRIX_GREEN }}>
                                        Administrador (Key: 12345)
                                    </option>
                                    <option value="participant" style={{ background: CARD_BG, color: MATRIX_GREEN }}>
                                        Participante (Key: 12345)
                                    </option>
                                </Select>
                            </FormControl>
                            
                            {/* 3. Contraseña */}
                            <FormControl id="password" isRequired>
                                <FormLabel fontSize="md" fontWeight="bold" color={MATRIX_GREEN}>
                                    Contraseña (Clave de Acceso)
                                </FormLabel>
                                <Input 
                                    name="password"
                                    type="password" 
                                    placeholder="12345"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} 
                                    size="lg"
                                    borderRadius="xl"
                                    bg="rgba(0, 0, 0, 0.5)"
                                    color={MATRIX_GREEN}
                                    borderColor={MATRIX_GREEN}
                                    _focus={{ borderColor: MATRIX_GREEN, boxShadow: `0 0 8px ${MATRIX_GREEN}` }}
                                />
                            </FormControl>
                            
                            {/* 4. Botón de Iniciar Sesión (Efecto de Neón/Brillo/Glitch) */}
                            <Button
                                type="submit"
                                bg={MATRIX_GREEN}
                                color={MATRIX_DARK} 
                                size="lg"
                                w="full"
                                mt={6}
                                leftIcon={<FiLogIn />}
                                isLoading={isLoading}
                                loadingText="Cargando realidad..."
                                fontWeight="extrabold"
                                // Sombra sutil, el Glitch y el Hover manejan el efecto dinámico
                                boxShadow={`0 0 5px ${MATRIX_GREEN}`} 
                                borderRadius="2xl"
                                className="glitch-text" // APLICA EL EFECTO GLITCH AL BOTÓN
                                _hover={{ 
                                    boxShadow: `0 0 15px 7px ${MATRIX_GREEN}, 0 0 30px 15px rgba(0, 255, 65, 0.5)`, 
                                    transform: 'scale(1.02)'
                                }}
                                _active={{
                                    bg: '#00cc33',
                                }}
                            >
                                Iniciar Sesión (Píldora Roja)
                            </Button>
                        </VStack>
                    </form>
                    
                    <Divider borderColor={MATRIX_GREEN} opacity="0.3" />

                    {/* Opción de Registro (Estilo más sutil) */}
                    <Button
                        leftIcon={<FiUserPlus />}
                        w="full"
                        color={MATRIX_GREEN}
                        variant="link"
                        onClick={onOpen}
                        _hover={{ textDecoration: 'underline', color: '#33FF77' }}
                        borderRadius="xl"
                        fontWeight="semibold"
                    >
                        Registro Simulado (Acceso Temporal)
                    </Button>

                </VStack>
            </Box>

            {/* Modal de Registro Simplificado */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent rounded="xl" bg={CARD_BG} border={`1px solid ${MATRIX_GREEN}`}>
                    <ModalHeader color={MATRIX_GREEN}>Simular Registro y Acceso</ModalHeader>
                    <ModalCloseButton color={MATRIX_GREEN} />
                    <ModalBody>
                        <Text mb={4} color="whiteAlpha.800">
                            Selecciona la identidad con la que deseas acceder para la simulación.
                        </Text>
                        <FormControl id="quick-register-role" isRequired>
                            <FormLabel color={MATRIX_GREEN}>Identidad de Registro</FormLabel>
                            <Select 
                                placeholder="Selecciona un rol" 
                                value={quickRole} 
                                onChange={(e) => setQuickRole(e.target.value)}
                                borderRadius="lg"
                                bg="rgba(0, 0, 0, 0.5)"
                                color={MATRIX_GREEN}
                                borderColor={MATRIX_GREEN}
                            >
                                <option value="admin" style={{ background: CARD_BG, color: MATRIX_GREEN }}>Administrador</option>
                                <option value="participant" style={{ background: CARD_BG, color: MATRIX_GREEN }}>Participante</option>
                            </Select>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='gray' mr={3} onClick={onClose} variant="ghost" rounded="lg" color="whiteAlpha.700">
                            Cancelar (Píldora Azul)
                        </Button>
                        <Button 
                            bg={MATRIX_GREEN}
                            color={MATRIX_DARK}
                            onClick={handleQuickRegister} 
                            isLoading={isLoading}
                            boxShadow={`0 0 5px ${MATRIX_GREEN}`}
                            rounded="lg"
                            fontWeight="extrabold"
                            _hover={{ 
                                boxShadow: `0 0 10px ${MATRIX_GREEN}`, 
                            }}
                        >
                            Registrar y Acceder
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
}
