import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const ProtectedRoutes = () => {
  const auth = localStorage.getItem('JWT');
  const location = useLocation();

  if (!auth) return <Navigate to='/auth' state={{ from: location }} />;

  return <Outlet />;
};
