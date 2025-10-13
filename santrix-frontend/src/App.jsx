import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';

// 1. Importaciones de VISTAS 
import DashboardView from './modules/Dashboard/DashboardView';
import EmployeeListView from './modules/Employees/views/EmployeeListView';
import ParticipantListView from './modules/Participants/views/ParticipantListView';
import LoginView from './modules/Auth/LoginView'; 
import NotFound from './modules/shared/NotFound'; 

// 2. Componente Envoltorio: Aplica el MainLayout a las rutas internas
const LayoutRoute = ({ children }) => <MainLayout>{children}</MainLayout>;

export default function App() {
  return (
    <Routes>
      {/* RUTA PÚBLICA (Login - SIN Layout) */}
      <Route path="/login" element={<LoginView />} />
      
      {/* RUTAS PROTEGIDAS (USANDO el Layout Fijo) */}
      <Route path="/" element={<LayoutRoute><DashboardView /></LayoutRoute>} />
      <Route path="/dashboard" element={<LayoutRoute><DashboardView /></LayoutRoute>} />
      
      {/* Módulos de Talento Humano */}
      <Route path="/empleados" element={<LayoutRoute><EmployeeListView /></LayoutRoute>} />
      <Route path="/participantes" element={<LayoutRoute><ParticipantListView /></LayoutRoute>} />
      
      {/* 404 (Debe ir siempre al final) */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}