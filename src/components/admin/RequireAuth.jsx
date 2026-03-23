import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// import { useAuthStore } from '../../store/authStore';

export const RequireAuth = () => {  
  // const { user } = useAuthStore();

  // Uncomment these later to actually enforce auth flow once backend is ready
  /*
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />; // unauthorized
  }
  */

  return <Outlet />;
};
