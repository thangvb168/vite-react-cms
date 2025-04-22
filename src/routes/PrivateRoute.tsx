import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStore } from '@/stores';

const PrivateRoute = () => {
  const isAuth = useAuthStore((state) => state.isAuth);

  console.log('IsAuth:', isAuth);

  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
