import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // SOLUCIÓN AL ERROR DE CACHÉ DE CHAKRA UI
  optimizeDeps: {
    // Incluye dependencias comunes que a veces se pierden en la optimización
    include: ['@chakra-ui/react', '@emotion/react', '@emotion/styled', 'framer-motion'],
    // Excluye la dependencia principal para asegurar que se maneje correctamente
    exclude: ['@chakra-ui/react'], 
  },
});