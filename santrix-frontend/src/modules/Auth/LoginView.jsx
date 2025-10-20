import { 
    Box, Flex, Heading, Text, VStack, FormControl, FormLabel, Input, Button, useToast, Divider, Select,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure
} from '@chakra-ui/react';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogIn, FiUserPlus } from 'react-icons/fi';

// Paleta de Colores Matrix
const MATRIX_GREEN = "#fc4e2fcc";
const MATRIX_DARK = "#000000";
const CARD_BG = "rgba(10, 10, 10, 0.9)";
const FONT_SIZE = 16;

// Estilos para el efecto de GLITCH
const matrixStyles = `
    @keyframes text-glitch {
        0% { text-shadow: 0.05em 0 0 ${MATRIX_GREEN}, -0.05em -0.025em 0 hsla(120, 78%, 49%, 0.58); }
        15% { text-shadow: 0 0.025em 0 ${MATRIX_GREEN}, -0.025em 0 0 #15ff00e1; }
        30% { text-shadow: -0.05em -0.015em 0 ${MATRIX_GREEN}, 0.025em 0 0 #00ff0db3; }
        50% { text-shadow: 0 0 0 ${MATRIX_GREEN}, 0 0 0 rgba(0, 255, 42, 0.7); }
        70% { text-shadow: 0.025em 0.05em 0 ${MATRIX_GREEN}, -0.05em -0.05em 0 #2cdb2cd3; }
        100% { text-shadow: 0 0 0 ${MATRIX_GREEN}, 0 0 0 #00ff22b3; }
    }
    .glitch-text {
        animation: text-glitch 5s steps(20) infinite;
        text-shadow: 0 0 5px ${MATRIX_GREEN};
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
            
            ctx.fillStyle = MATRIX_GREEN;
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
            
            // Credenciales de prueba - CAMBIADO: participant → practitioner
            if (email === 'admin@santrix.com' && password === '12345' && role === 'admin') {
                expectedRole = 'admin';
                success = true;
            } else if (email === 'user@santrix.com' && password === '12345' && role === 'practitioner') { // CAMBIADO
                expectedRole = 'practitioner'; // CAMBIADO
                success = true;
            }

            if (success) {
                localStorage.setItem('user_auth', 'true');
                localStorage.setItem('user_role', expectedRole);
                localStorage.setItem('user_email', email); 
                
                toast({ title: `Bienvenido, ${expectedRole.toUpperCase()}.`, description: 'Inicio de sesión exitoso. Recargando la Matriz...', status: 'success', duration: 1500, isClosable: true });
                
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
                maxW={'lg'} 
                w={'full'}
                bg={CARD_BG}
                boxShadow={isHovered ? `0 0 30px 10px ${MATRIX_GREEN}` : `0 0 10px 3px ${MATRIX_GREEN}`} 
                border={`1px solid ${MATRIX_GREEN}`}
                rounded={'3xl'} 
                p={{ base: 8, md: 12 }} 
                my={12}
                position="relative" 
                zIndex={1}
                transition="box-shadow 0.3s ease-in-out"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <VStack spacing={8} align="center"> 
                    <Heading 
                        fontSize={'4xl'} 
                        textAlign={'center'} 
                        color={MATRIX_GREEN} 
                        mb={2}
                        className="glitch-text"
                        fontFamily="monospace" 
                    >
                        // SISTEMA DE GESTION EMPRESARIAL 
                                    SANTRIX  //
                    </Heading>
                    <Text fontSize={'lg'} color={MATRIX_GREEN} mb={4} textAlign="center">
                       Bienvenido a santrix. por favor ingresa tus Credenciales para continuar.
                    </Text>
                    
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <VStack spacing={6}> 
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
                                    {/* CAMBIADO: participant → practitioner */}
                                    <option value="practitioner" style={{ background: CARD_BG, color: MATRIX_GREEN }}>
                                        Practitioner (Key: 12345)
                                    </option>
                                </Select>
                            </FormControl>
                            
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
                                boxShadow={`0 0 5px ${MATRIX_GREEN}`} 
                                borderRadius="2xl"
                                className="glitch-text"
                                _hover={{ 
                                    boxShadow: `0 0 15px 7px ${MATRIX_GREEN}, 0 0 30px 15px #f54b4b80`, 
                                    transform: 'scale(1.02)'
                                }}
                                _active={{
                                    bg: 'hsla(14, 80%, 56%, 1.00)',
                                }}
                            >
                                Iniciar Sesión 
                            </Button>
                        </VStack>
                    </form>
                    
                    <Divider borderColor={MATRIX_GREEN} opacity="0.3" />

                    <Button
                        leftIcon={<FiUserPlus />}
                        w="full"
                        color={MATRIX_GREEN}
                        variant="link"
                        onClick={onOpen}
                        _hover={{ textDecoration: 'underline', color: '#fc4322ff' }}
                        borderRadius="xl"
                        fontWeight="semibold"
                    >
                        Registro Simulado (Acceso Temporal)
                    </Button>

                </VStack>
            </Box>

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
                                {/* CAMBIADO: participant → practitioner */}
                                <option value="practitioner" style={{ background: CARD_BG, color: MATRIX_GREEN }}>Practitioner</option>
                            </Select>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='gray' mr={3} onClick={onClose} variant="ghost" rounded="lg" color="whiteAlpha.700">
                            Cancelar 
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