import { 
    Box, Flex, Heading, Text, VStack, FormControl, FormLabel, Input, Button, useToast, Divider, Select,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure
} from '@chakra-ui/react';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogIn, FiUserPlus } from 'react-icons/fi';

// 🎨 Mantener los mismos colores pero añadir efecto de contorno
const WINE_RED = '#800020';           
const WINE_LIGHT = "#FF4444";         
const WINE_NEON = "#FF2266";          
const MATRIX_DARK = "#0b0002";        
const CARD_BG = "rgba(15, 0, 3, 0.95)"; 
const TEXT_LIGHT = "#FFFFFF";         
const LABEL_COLOR = "#FF6B6B";        
const FONT_SIZE = 16;


const matrixStyles = `
    @keyframes text-glitch {
        0% { text-shadow: 0.05em 0 0 ${WINE_RED}, -0.05em -0.025em 0 ${WINE_LIGHT}; }
        15% { text-shadow: 0 0.025em 0 ${WINE_RED}, -0.025em 0 0 ${WINE_LIGHT}; }
        30% { text-shadow: -0.05em -0.015em 0 ${WINE_RED}, 0.025em 0 0 ${WINE_LIGHT}; }
        50% { text-shadow: 0 0 0 ${WINE_RED}, 0 0 0 ${WINE_LIGHT}; }
        70% { text-shadow: 0.025em 0.05em 0 ${WINE_RED}, -0.05em -0.05em 0 ${WINE_LIGHT}; }
        100% { text-shadow: 0 0 0 ${WINE_RED}, 0 0 0 ${WINE_LIGHT}; }
    }
    
    .glitch-text {
        animation: text-glitch 5s steps(20) infinite;
        text-shadow: 0 0 5px ${WINE_RED};
    }

    .label-outline {
        color: ${LABEL_COLOR} !important;
        text-shadow: 
            -1px -1px 0 #000,
            1px -1px 0 #000,
            -1px 1px 0 #000,
            1px 1px 0 #000,
            0 0 8px ${WINE_RED};  /* Contorno negro + brillo rojo */
        font-weight: 900;
        letter-spacing: 0.3px;
    }

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
    const navigate = useNavigate(); 
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure(); 
    const canvasRef = useRef(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(''); 
    const [quickRole, setQuickRole] = useState(''); 
    const [isLoading, setIsLoading] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        let width, height, columns;
        let drops;
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%^&*()_+{}|:"<>?~';

        const initializeCanvas = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            columns = Math.floor(width / FONT_SIZE);
            drops = [];
            for (let i = 0; i < columns; i++) {
                drops[i] = 1;
            }
        };

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; 
            ctx.fillRect(0, 0, width, height);
            
            ctx.fillStyle = WINE_RED;
            ctx.font = `${FONT_SIZE}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                const x = i * FONT_SIZE;
                const y = drops[i] * FONT_SIZE;
                ctx.fillText(text, x, y);

                if (y * FONT_SIZE > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        const handleResize = () => {
            cancelAnimationFrame(animationFrameId);
            initializeCanvas();
            draw();
        };

        initializeCanvas();
        draw();

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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

            if (email === 'admin@santrix.com' && password === '12345' && role === 'admin') {
                expectedRole = 'admin';
                success = true;
            } else if (email === 'user@santrix.com' && password === '12345' && role === 'practitioner') {
                expectedRole = 'practitioner';
                success = true;
            }

            if (success) {
                localStorage.setItem('user_auth', 'true');
                localStorage.setItem('user_role', expectedRole);
                localStorage.setItem('user_email', email); 
                
                toast({ 
                    title: `Bienvenido, ${expectedRole.toUpperCase()}.`, 
                    description: 'Inicio de sesión exitoso.', 
                    status: 'success', 
                    duration: 1500, 
                    isClosable: true 
                });
                
                setTimeout(() => {
                    window.location.href = '/dashboard'; 
                }, 1500); 
            } else {
                toast({ 
                    title: 'Error de acceso.', 
                    description: 'Credenciales o rol incorrectos.', 
                    status: 'error', 
                    duration: 3000, 
                    isClosable: true 
                });
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
                description: `Simulación de registro como ${quickRole.toUpperCase()}.`,
                status: 'success',
                duration: 1500,
                isClosable: true,
            });
            
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1500);
        }, 1000);
    };

    return (
        <Flex 
            minH={'100vh'} 
            w={'100vw'} 
            align={'center'} 
            justify={'center'} 
            bg={MATRIX_DARK}
            position="relative"
        >
            <style>{matrixStyles}</style>
            <canvas id="matrix-canvas" ref={canvasRef}></canvas>

            <Box 
                maxW={'500px'}  // Aumentado el ancho máximo
                w={'90%'}       // Más ancho relativo
                bg={CARD_BG}
                boxShadow={isHovered ? `0 0 30px 10px ${WINE_RED}` : `0 0 10px 3px ${WINE_RED}`} 
                border={`1px solid ${WINE_RED}`}
                rounded={'3xl'} 
                p={{ base: 6, md: 8 }}  // Reducido el padding para menor altura
                my={8}                   // Reducido el margen vertical
                position="relative" 
                zIndex={1}
                transition="box-shadow 0.3s ease-in-out"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <VStack spacing={6} align="center">  {/* Reducido el espaciado */}
                    <Heading 
                        fontSize={'2xl'}  // Título más pequeño
                        textAlign={'center'} 
                        color={WINE_RED} 
                        mb={1}           // Menos margen inferior
                        className="glitch-text"
                        fontFamily="monospace" 
                    >
                         SISTEMA DE GESTIÓN EMPRESARIAL SANTRIX 
                    </Heading>
                    <Text fontSize={'sm'} color={WINE_RED} mb={2} textAlign="center">  {/* Texto más pequeño */}
                        Bienvenido a Santrix. Ingresa tus credenciales para continuar.
                    </Text>
                    
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <VStack spacing={4}>  {/* Reducido el espaciado entre campos */}
                            <FormControl id="email" isRequired>
                                <FormLabel fontSize="sm" fontWeight="bold" color={WINE_RED}>  {/* Label más pequeño */}
                                    Usuario (Correo Electrónico)
                                </FormLabel>
                                <Input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} 
                                    size="md"  // Input más pequeño
                                    borderRadius="xl"
                                    bg="rgba(0, 0, 0, 0.5)" 
                                    color={WINE_RED} 
                                    borderColor={WINE_RED}
                                    _focus={{ borderColor: WINE_LIGHT, boxShadow: `0 0 8px ${WINE_LIGHT}` }}
                                />
                            </FormControl>
                            
                            <FormControl id="role" isRequired>
                                <FormLabel fontSize="sm" fontWeight="bold" color={WINE_RED}>  {/* Label más pequeño */}
                                    Identidad (Selecciona tu Rol)
                                </FormLabel>
                                <Select 
                                    placeholder="Elige tu rol..." 
                                    value={role} 
                                    onChange={(e) => setRole(e.target.value)}
                                    size="md"  // Select más pequeño
                                    borderRadius="xl"
                                    bg="rgba(0, 0, 0, 0.5)"
                                    color={WINE_RED}
                                    borderColor={WINE_RED}
                                    _focus={{ borderColor: WINE_LIGHT, boxShadow: `0 0 8px ${WINE_LIGHT}` }}
                                >
                                    <option value="admin" style={{ background: CARD_BG, color: WINE_RED }}>
                                        Administrador 
                                    </option>
                                    <option value="practitioner" style={{ background: CARD_BG, color: WINE_RED }}>
                                        Practitioner 
                                    </option>
                                </Select>
                            </FormControl>
                            
                            <FormControl id="password" isRequired>
                                <FormLabel fontSize="sm" fontWeight="bold" color={WINE_RED}>  {/* Label más pequeño */}
                                    Contraseña (Clave de Acceso)
                                </FormLabel>
                                <Input 
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} 
                                    size="md"  // Input más pequeño
                                    borderRadius="xl"
                                    bg="rgba(0, 0, 0, 0.5)"
                                    color={WINE_RED}
                                    borderColor={WINE_RED}
                                    _focus={{ borderColor: WINE_LIGHT, boxShadow: `0 0 8px ${WINE_LIGHT}` }}
                                />
                            </FormControl>
                            
                            <Button
                                type="submit"
                                bg={WINE_RED}
                                color="white" 
                                size="md"  // Botón más pequeño
                                w="full"
                                mt={4}    // Menos margen superior
                                leftIcon={<FiLogIn />}
                                isLoading={isLoading}
                                loadingText="Cargando..."
                                fontWeight="extrabold"
                                boxShadow={`0 0 5px ${WINE_RED}`} 
                                borderRadius="2xl"
                                className="glitch-text"
                                _hover={{ 
                                    boxShadow: `0 0 15px 7px ${WINE_RED}`, 
                                    transform: 'scale(1.02)'
                                }}
                                _active={{
                                    bg: WINE_LIGHT,
                                }}
                            >
                                Iniciar Sesión 
                            </Button>
                        </VStack>
                    </form>
                    
                    <Divider borderColor={WINE_RED} opacity="0.3" />

                    <Button
                        leftIcon={<FiUserPlus />}
                        w="full"
                        color={WINE_RED}
                        variant="link"
                        onClick={onOpen}
                        _hover={{ textDecoration: 'underline', color: WINE_LIGHT }}
                        borderRadius="xl"
                        fontWeight="semibold"
                        size="sm"  // Botón más pequeño
                    >
                        Registro Simulado (Acceso Temporal)
                    </Button>

                </VStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent rounded="xl" bg={CARD_BG} border={`1px solid ${WINE_RED}`}>
                    <ModalHeader color={WINE_RED}>Simular Registro y Acceso</ModalHeader>
                    <ModalCloseButton color={WINE_RED} />
                    <ModalBody>
                        <Text mb={4} color="whiteAlpha.800">
                            Selecciona la identidad con la que deseas acceder para la simulación.
                        </Text>
                        <FormControl id="quick-register-role" isRequired>
                            <FormLabel color={WINE_RED}>Identidad de Registro</FormLabel>
                            <Select 
                                placeholder="Selecciona un rol" 
                                value={quickRole} 
                                onChange={(e) => setQuickRole(e.target.value)}
                                borderRadius="lg"
                                bg="rgba(0, 0, 0, 0.5)"
                                color={WINE_RED}
                                borderColor={WINE_RED}
                            >
                                <option value="admin" style={{ background: CARD_BG, color: WINE_RED }}>Administrador</option>
                                <option value="practitioner" style={{ background: CARD_BG, color: WINE_RED }}>Practitioner</option>
                            </Select>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='gray' mr={3} onClick={onClose} variant="ghost" rounded="lg" color="whiteAlpha.700">
                            Cancelar 
                        </Button>
                        <Button 
                            bg={WINE_RED}
                            color="white"
                            onClick={handleQuickRegister} 
                            isLoading={isLoading}
                            boxShadow={`0 0 5px ${WINE_RED}`}
                            rounded="lg"
                            fontWeight="extrabold"
                            _hover={{ 
                                boxShadow: `0 0 10px ${WINE_RED}`, 
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