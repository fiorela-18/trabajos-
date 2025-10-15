import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Layouts
import MainLayout from './components/layout/MainLayout';

// VISTAS PRINCIPALES
import DashboardView from './modules/Dashboard/DashboardView';
import LoginView from "./modules/Auth/LoginView.jsx";
import NotFound from './modules/shared/NotFound'; 

// MÓDULOS DE TALENTO HUMANO (CRUD)
import EmployeeListView from './modules/Employees/views/EmployeeListView';
import EmployeeFormView from './modules/Employees/views/EmployeeFormView';
import ParticipantListView from './modules/Participants/views/ParticipantListView';
import ParticipantFormView from './modules/Participants/views/ParticipantFormView.jsx'; // ¡Asegurando la importación!


// MÓDULOS NUEVOS (Gestión Operativa)
import PerformanceView from './modules/Performance/views/PerformanceView'; // Módulo Desempeño
import VacationView from './modules/Vacations/views/VacationView'; // Módulo Vacaciones (Carpeta 'Vacations')
import ProjectsView from './modules/Projects/views/ProjectsView'; // Módulo Proyectos
import TrainingView from './modules/Training/views/TrainingView'; // Módulo Capacitaciones


/**
 * Componente que simula la protección de rutas.
 */
const AuthGuard = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('user_auth') === 'true'; 

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};


// Layout para rutas protegidas: Aplica AuthGuard y MainLayout
const ProtectedLayout = ({ children }) => (
  <AuthGuard>
    <MainLayout>{children}</MainLayout>
  </AuthGuard>
);


export default function App() {
  return (
    <Routes>
      
      {/* 1. RUTA PÚBLICA (Login) - SIN NINGÚN LAYOUT ENVOLVENTE */}
      <Route path="/login" element={<LoginView />} />
      
      {/* 2. RUTAS PROTEGIDAS - USAN EL ProtectedLayout */}
      <Route path="/" element={<ProtectedLayout><Navigate to="/dashboard" replace /></ProtectedLayout>} />
      <Route path="/dashboard" element={<ProtectedLayout><DashboardView /></ProtectedLayout>} />
      
      {/* MÓDULOS DE GESTIÓN DE PERSONAL (CRUDs) */}
      
      {/* Empleados */}
      <Route path="/empleados" element={<ProtectedLayout><EmployeeListView /></ProtectedLayout>} />
      <Route path="/empleados/nuevo" element={<ProtectedLayout><EmployeeFormView /></ProtectedLayout>} />
      <Route path="/empleados/editar/:id" element={<ProtectedLayout><EmployeeFormView isEdit={true} /></ProtectedLayout>} />
      
      {/* Participantes */}
      <Route path="/participantes" element={<ProtectedLayout><ParticipantListView /></ProtectedLayout>} />
      <Route path="/participantes/nuevo" element={<ProtectedLayout><ParticipantFormView /></ProtectedLayout>} />
      <Route path="/participantes/editar/:id" element={<ProtectedLayout><ParticipantFormView isEdit={true} /></ProtectedLayout>} />
      
      {/* MÓDULOS DE GESTIÓN OPERATIVA (Vistas Nuevas) */}
      
      <Route path="/desempeno" element={<ProtectedLayout><PerformanceView /></ProtectedLayout>} />
      <Route path="/vacaciones" element={<ProtectedLayout><VacationView /></ProtectedLayout>} />
      <Route path="/proyectos" element={<ProtectedLayout><ProjectsView /></ProtectedLayout>} />
      <Route path="/capacitaciones" element={<ProtectedLayout><TrainingView /></ProtectedLayout>} />

      {/* 404 */}
      <Route path="*" element={<ProtectedLayout><NotFound /></ProtectedLayout>} />
      
    </Routes>
  );
}
