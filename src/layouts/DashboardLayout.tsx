import { Outlet } from 'react-router-dom';

import { Layout } from 'antd';

import SideBar from '@/containers/SideBar';
import TopBar from '@/containers/TopBar';

const { Content } = Layout;

const DashboardLayout = () => {
  const title = 'Nhân viên';

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
