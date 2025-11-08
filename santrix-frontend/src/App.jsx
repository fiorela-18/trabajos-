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
import PractitionerListView from './modules/practitioners/views/PractitionerListView';
import PractitionerFormView from './modules/practitioners/views/PractitionerFormView';

// MÓDULOS DE GESTIÓN OPERATIVA
import PerformanceView from './modules/Performance/views/PerformanceView';
import VacationView from './modules/Vacations/views/VacationView';
import ProjectsView from './modules/Projects/views/ProjectsView';
import TrainingView from './modules/Training/views/TrainingView';

// MÓDULOS NUEVOS
import HorarioView from './modules/Horario/HorarioView';
import EventsView from './modules/Events/EventsView';
import FinanceView from './modules/Finance/views/FinanceView';


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
      
      {/* Practitioners */}
      <Route path="/practitioners" element={<ProtectedLayout><PractitionerListView /></ProtectedLayout>} />
      <Route path="/practitioners/nuevo" element={<ProtectedLayout><PractitionerFormView /></ProtectedLayout>} />
      <Route path="/practitioners/editar/:id" element={<ProtectedLayout><PractitionerFormView isEdit={true} /></ProtectedLayout>} />
      
      {/* MÓDULOS DE GESTIÓN OPERATIVA */}
      <Route path="/desempeno" element={<ProtectedLayout><PerformanceView /></ProtectedLayout>} />
      <Route path="/vacaciones" element={<ProtectedLayout><VacationView /></ProtectedLayout>} />
      <Route path="/proyectos" element={<ProtectedLayout><ProjectsView /></ProtectedLayout>} />
      <Route path="/capacitaciones" element={<ProtectedLayout><TrainingView /></ProtectedLayout>} />
      
      {/* MÓDULOS NUEVOS: HORARIO Y EVENTOS */}
      <Route path="/horario" element={<ProtectedLayout><HorarioView /></ProtectedLayout>} />
      <Route path="/eventos" element={<ProtectedLayout><EventsView /></ProtectedLayout>} />
      <Route path="/finanzas" element={<ProtectedLayout><FinanceView /></ProtectedLayout>} />

      

      {/* 404 */}
      <Route path="*" element={<ProtectedLayout><NotFound /></ProtectedLayout>} />
      
    </Routes>
  );
}