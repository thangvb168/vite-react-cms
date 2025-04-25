import { BrowserRouter, Route, Routes } from 'react-router';

import DashboardLayout from '@/layouts/DashboardLayout';
import LoginPage from '@/pages/auth/LoginPage';
import DashboardEmpty from '@/pages/dashboard/DashboardEmpty';
import EmployeeAdd from '@/pages/dashboard/employee/EmployeeAdd';
import EmployeeEdit from '@/pages/dashboard/employee/EmployeeEdit';
import EmployeePage from '@/pages/dashboard/employee/EmployeePage';

import PrivateRoute from './PrivateRoute';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<DashboardLayout />}>
            <Route index path="/" element={<DashboardEmpty />} />
            <Route path="/employees/:id" element={<EmployeeAdd />} />
            <Route path="/employees/add" element={<EmployeeAdd />} />
            <Route path="/employees/edit/:id" element={<EmployeeEdit />} />
            <Route path="/employees" element={<EmployeePage />} />
            <Route path="*" element={<DashboardEmpty />} />
          </Route>
          <Route path="*" element={<div>NOT FOUND</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
