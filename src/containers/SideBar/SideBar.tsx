import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  faBox,
  faCar,
  faChevronRight,
  faDollar,
  faHome,
  faList,
  faTicket,
  faUser,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';

const { Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems: MenuItem[] = [
    {
      key: '/',
      label: 'Tổng quan',
      icon: <FontAwesomeIcon icon={faHome} />,
    },
    {
      key: '/employees',
      label: 'Nhân viên',
      icon: <FontAwesomeIcon icon={faUser} />,
    },
    {
      key: '/customers',
      label: 'Khách hàng',
      icon: <FontAwesomeIcon icon={faUsers} />,
    },
    {
      key: '/orders',
      label: 'Đơn hàng',
      icon: <FontAwesomeIcon icon={faBox} />,
    },
    {
      key: '/warehouses',
      label: 'Kho hàng',
      icon: <FontAwesomeIcon icon={faHome} />,
    },
    {
      key: '/shipments',
      label: 'Đơn vận',
      icon: <FontAwesomeIcon icon={faCar} />,
    },
    {
      key: 'finance',
      label: 'Tài chính',
      icon: <FontAwesomeIcon icon={faDollar} />,
      children: [
        { key: '/finance/expenses', label: 'Chi phí' },
        { key: '/finance/revenue', label: 'Doanh thu' },
        { key: '/finance/profit', label: 'Lợi nhuận' },
      ],
    },
    {
      key: '/promotions',
      label: 'Khuyến mại',
      icon: <FontAwesomeIcon icon={faTicket} />,
    },
    {
      key: 'categories',
      label: 'Danh mục',
      icon: <FontAwesomeIcon icon={faList} />,
      children: [
        { key: '/categories/products', label: 'Sản phẩm' },
        { key: '/categories/services', label: 'Dịch vụ' },
        { key: '/categories/suppliers', label: 'Nhà cung cấp' },
        { key: '/categories/customers', label: 'Khách hàng' },
      ],
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <Sider
      breakpoint="lg"
      onBreakpoint={(_) => {
        setCollapsed(true);
      }}
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <div className="relative flex h-12 w-full items-center justify-center bg-gray-200 transition-all duration-500">
        <h4 className="text-primary text-xl font-semibold">
          {collapsed ? 'T' : 'Thang Vu Ba'}
        </h4>
        <div className="absolute right-0 translate-x-1/2">
          <Button size="small" onClick={() => setCollapsed(!collapsed)}>
            <FontAwesomeIcon
              icon={faChevronRight}
              className={`text-primary transition-transform duration-500 ${
                collapsed ? '' : 'rotate-180'
              }`}
            />
          </Button>
        </div>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={handleMenuClick}
      />
    </Sider>
  );
};

export default SideBar;
