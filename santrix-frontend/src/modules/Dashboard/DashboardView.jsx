import React, { useState, useEffect } from 'react';
import AdminDashboard from './AdminDashboard';
import PractitionerDashboard from './PractitionerDashboard';

export default function DashboardView() {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const role = localStorage.getItem('user_role');
    setUserRole(role || '');
  }, []);

  if (userRole === 'admin') {
    return <AdminDashboard />;
  }

  return <PractitionerDashboard />;
}