import { Outlet, useLocation } from 'react-router-dom';

import { Layout } from 'antd';

import SideBar from '@/containers/SideBar';
import TopBar from '@/containers/TopBar';

const TITLE_MAP: Record<string, string> = {
  '/': 'Dashboard',
  '/employees': 'Nhân viên',
  '/customers': 'Khách hàng',
  '/orders': 'Đơn hàng',
  '/warehouses': 'Kho hàng',
  '/shipments': 'Vận chuyển',
  '/finance/expenses': 'Chi phí',
  '/finance/revenue': 'Doanh thu',
  '/finance/profit': 'Lợi nhuận',
  '/promotions': 'Khuyến mãi',
  '/categories/products': 'Danh mục sản phẩm',
  '/categories/services': 'Danh mục dịch vụ',
  '/categories/suppliers': 'Danh mục nhà cung cấp',
  '/categories/customers': 'Danh mục khách hàng',
};

const DashboardLayout = () => {
  const location = useLocation();

  const title = TITLE_MAP[location.pathname] || 'Dashboard';

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideBar />
      <Layout>
        <TopBar title={title} />
        <Outlet />
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
