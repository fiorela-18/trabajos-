import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.jsx';
import './index.css'; 

// 1. Inicializamos el cliente de React Query
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Proveedor de Datos (React Query) */}
    <QueryClientProvider client={queryClient}>
      {/* 3. Proveedor de Enrutamiento (React Router DOM) */}
      <BrowserRouter>
        {/* 4. Proveedor de Estilos y Componentes (Chakra UI) */}
        <ChakraProvider>
          {/* 5. El componente principal de tu aplicación */}
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);