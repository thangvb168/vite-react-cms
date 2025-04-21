import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/contexts/auth';

const PrivateRoute = () => {
  const { isAuth } = useAuth();

  console.log('IsAuth:', isAuth);

  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
