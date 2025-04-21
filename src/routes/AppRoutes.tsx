import { Route, Routes } from 'react-router';

import { useAuth } from '@/contexts/auth';
import DashboardLayout from '@/layouts/DashboardLayout';
import LoginPage from '@/pages/auth/LoginPage';
import DashboardEmpty from '@/pages/dashboard/DashboardEmpty';
import EmployeePage from '@/pages/dashboard/employee/EmployeePage';

import PrivateRoute from './PrivateRoute';

const AppRoutes = () => {
  const { initializing } = useAuth();

  if (initializing)
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<DashboardLayout />}>
            <Route index path="/" element={<DashboardEmpty />} />
            <Route path="/employees" element={<EmployeePage />} />
            <Route path="*" element={<DashboardEmpty />} />
          </Route>
          <Route path="*" element={<div>NOT FOUND</div>} />
        </Route>
      </Routes>
    );
};

export default AppRoutes;
