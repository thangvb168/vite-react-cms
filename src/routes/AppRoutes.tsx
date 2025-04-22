import { Route, Routes } from 'react-router';

import DashboardLayout from '@/layouts/DashboardLayout';
import LoginPage from '@/pages/auth/LoginPage';
import DashboardEmpty from '@/pages/dashboard/DashboardEmpty';
import EmployeePage from '@/pages/dashboard/employee/EmployeePage';

import PrivateRoute from './PrivateRoute';

const AppRoutes = () => {
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
